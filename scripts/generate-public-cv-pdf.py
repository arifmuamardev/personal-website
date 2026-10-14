#!/usr/bin/env python3
"""Generate a privacy-filtered public academic CV directly from site data.

Input: JSON exported by scripts/export-public-cv-data.mjs from the same
src/data/profile.ts and src/data/public-cv.ts displayed by the website.
Scholarly outputs are read from src/content/publications/*.md; unpublished
or unverified manuscript statuses are excluded from this PDF.
"""
import json
import os
import sys
from pathlib import Path
from html import escape
from urllib.parse import quote
import yaml
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, HRFlowable

INK = colors.HexColor("#192e35")
MUTED = colors.HexColor("#52686c")
ACCENT = colors.HexColor("#195d68")
BORDER = colors.HexColor("#dce5e4")
PAPER = colors.white

def register_fonts():
    candidates = [
        ("/usr/share/fonts/truetype/dejavu", "DejaVuSans.ttf", "DejaVuSans-Bold.ttf", "DejaVuSerif.ttf", "DejaVuSerif-Bold.ttf"),
        ("/usr/share/fonts/truetype/liberation2", "LiberationSans-Regular.ttf", "LiberationSans-Bold.ttf", "LiberationSerif-Regular.ttf", "LiberationSerif-Bold.ttf"),
    ]
    for directory, sn, sb, serif, serif_bold in candidates:
        files = [Path(directory) / f for f in [sn, sb, serif, serif_bold]]
        if all(f.exists() for f in files):
            for tag, filename in zip(("CvSans", "CvSansBold", "CvSerif", "CvSerifBold"), files):
                pdfmetrics.registerFont(TTFont(tag, str(filename)))
            pdfmetrics.registerFontFamily("CvSans", normal="CvSans", bold="CvSansBold")
            pdfmetrics.registerFontFamily("CvSerif", normal="CvSerif", bold="CvSerifBold")
            return "CvSans", "CvSansBold", "CvSerifBold"
    return "Helvetica", "Helvetica-Bold", "Times-Bold"

sans, bold, serif = register_fonts()

STYLES = {
    "name": ParagraphStyle("name", fontName=serif, fontSize=21.5, leading=25, textColor=INK, spaceAfter=5),
    "role": ParagraphStyle("role", fontName=sans, fontSize=10.1, leading=14.8, textColor=MUTED, spaceAfter=8),
    "intro": ParagraphStyle("intro", fontName=sans, fontSize=9, leading=14, textColor=INK, spaceAfter=8),
    "section": ParagraphStyle("section", fontName=serif, fontSize=13, leading=17, textColor=INK, spaceBefore=12, spaceAfter=8),
    "title": ParagraphStyle("title", fontName=bold, fontSize=9.2, leading=13.5, textColor=INK, spaceAfter=1.5),
    "detail": ParagraphStyle("detail", fontName=sans, fontSize=8.3, leading=12.5, textColor=MUTED, spaceAfter=4),
    "compact": ParagraphStyle("compact", fontName=sans, fontSize=8.4, leading=12.5, textColor=INK, spaceAfter=6),
    "note": ParagraphStyle("note", fontName=sans, fontSize=7.7, leading=11.8, textColor=MUTED, spaceAfter=6),
    "bib": ParagraphStyle("bib", fontName=sans, fontSize=8.25, leading=12.5, textColor=INK, leftIndent=11, firstLineIndent=-11, spaceAfter=7),
}
def clean(text):
    return escape(str(text), quote=False).replace("\n", " ")

def add_section(story, name):
    story.extend([
        Paragraph(clean(name), STYLES["section"]),
        HRFlowable(width="100%", thickness=.5, color=BORDER, spaceAfter=8),
    ])

def add_entry(story, title, metadata="", detail=""):
    pieces = [Paragraph(clean(title), STYLES["title"])]
    if metadata:
        pieces.append(Paragraph(clean(metadata), STYLES["detail"]))
    if detail:
        pieces.append(Paragraph(clean(detail), STYLES["compact"]))
    pieces.append(Spacer(1, 3))
    story.append(KeepTogether(pieces))

def join_nonempty(*items):
    return " · ".join(str(x) for x in items if x)

def footer(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(.5)
    canvas.line(19*mm, 17*mm, width-19*mm, 17*mm)
    canvas.setFont(sans, 7.6)
    canvas.setFillColor(MUTED)
    canvas.drawString(19*mm, 12*mm, "Arif Mu'amar Wahid  |  Public academic CV  |  Source: Aug 2026")
    canvas.drawRightString(width-19*mm, 12*mm, f"Page {doc.page}")
    canvas.restoreState()

def load_publications():
    items = []
    for filename in sorted(Path("src/content/publications").glob("*.md")):
        raw = filename.read_text(encoding="utf-8")
        if not raw.startswith("---"):
            raise ValueError(f"Missing frontmatter: {filename}")
        fields = yaml.safe_load(raw.split("---", 2)[1])
        if not isinstance(fields, dict):
            raise ValueError(f"Unexpected publication metadata: {filename}")
        if fields.get("status") != "Published":
            continue
        if fields.get("type") in ("Book", "Book Chapter"):
            continue  # Already included in the curated Books section.
        items.append(fields)

    # One publication per canonical title. Fail instead of silently duplicating.
    titles = [str(item["title"]).casefold().strip() for item in items]
    if len(titles) != len(set(titles)):
        raise ValueError("Duplicate published titles in bibliography; reconcile content records first.")
    return sorted(items, key=lambda x: (-int(x.get("year", 0)), str(x["title"]).casefold()))

def build(data, output):
    profile = data["profile"]
    cv = data["publicCv"]
    filename = Path(output)
    filename.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(filename), pagesize=A4, leftMargin=19*mm, rightMargin=19*mm,
        topMargin=19*mm, bottomMargin=23*mm, title="Public Academic Curriculum Vitae",
        author=profile["name"], subject="Research, publications, education and academic experience",
        pageCompression=1, invariant=1,
    )
    story = []

    story.append(Paragraph(clean(profile["displayName"]) + ", M.Kom.", STYLES["name"]))
    story.append(Paragraph("Doctoral researcher in Computer Science  |  Lecturer in Informatics", STYLES["role"]))
    story.append(Paragraph(
        clean(profile["phd"]["institution"]) + ", Japan  |  "
        + clean(profile["lecturer"]["institution"]) + ", Indonesia", STYLES["intro"]))
    story.append(Paragraph(
        "Email: " + clean(profile["emails"]["primary"])
        + "  |  Scholar / ORCID / project links available at arifmuamar.com", STYLES["note"]))
    story.append(HRFlowable(width="100%", thickness=.7, color=ACCENT, spaceAfter=12))
    story.append(Paragraph(clean(profile["researchSummary"]), STYLES["intro"]))
    story.append(Paragraph(
        "Public edition generated from the academic CV dated 14 August 2026. "
        "Editorial service is dated to that source; present appointments may have changed. "
        "Personal phone numbers, membership identifiers and unpublished manuscripts are excluded.",
        STYLES["note"]))

    add_section(story, "Academic Appointments")
    for item in cv["appointments"]:
        add_entry(story, item["title"], join_nonempty(item["organization"], item["period"]), item["description"])

    add_section(story, "Education")
    for item in profile["education"]:
        add_entry(story, item["degree"], join_nonempty(item["institution"], item["period"]), item["detail"])

    add_section(story, "Research Interests")
    story.append(Paragraph(clean(" · ".join(profile["researchAreas"])), STYLES["compact"]))

    add_section(story, "Academic and Professional Experience")
    for item in profile["experience"]:
        add_entry(story, item["role"], join_nonempty(item["institution"], item["period"]), item["detail"])

    add_section(story, "Teaching and Research Competencies")
    story.append(Paragraph("<b>Teaching:</b> " + clean(", ".join(cv["teachingAreas"])), STYLES["compact"]))
    for item in cv["technicalCompetencies"]:
        add_entry(story, item["name"], "", item["description"])

    add_section(story, "Awards and Scholarships")
    for item in profile["awards"]:
        story.append(Paragraph("•  " + clean(item), STYLES["compact"]))

    add_section(story, "Professional Memberships")
    for item in cv["memberships"]:
        add_entry(story, item["organization"], join_nonempty(item["capacity"], "since " + item["since"]))

    add_section(story, "Selected Academic Leadership")
    for item in cv["academicLeadership"]:
        add_entry(story, item["title"], join_nonempty(item["organization"], item["period"]))

    add_section(story, "Editorial, Reviewing and Conference Service")
    story.append(Paragraph(
        "Appointments below are documented in the August 2026 CV; current status is not independently reconfirmed.",
        STYLES["note"]))
    for item in cv["scholarlyService"]:
        add_entry(story, item["title"], join_nonempty(item["organization"], item["period"]))

    add_section(story, "Research and Conference Presentations")
    for item in cv["presentations"]:
        add_entry(story, item["title"], join_nonempty(item["date"], item["kind"]), item["event"])

    add_section(story, "Funded Research Experience")
    story.append(Paragraph(
        "Project participation from the master CV; principal-investigator or awardee role is not inferred.",
        STYLES["note"]))
    for item in cv["fundedResearch"]:
        add_entry(story, item["title"], join_nonempty(item["sponsor"], item["year"]))

    add_section(story, "Books and Book Chapters")
    for item in cv["books"]:
        add_entry(story, item["title"], join_nonempty(item["year"], item["kind"]), join_nonempty(item["publisher"], "ISBN " + item["isbn"]))

    add_section(story, "Intellectual Property and Creative Works")
    for item in cv["intellectualProperty"]:
        add_entry(story, item["title"], join_nonempty(item["year"], item["kind"]))

    publications = load_publications()
    add_section(story, "Published Journal and Conference Work")
    story.append(Paragraph(
        f"{len(publications)} published research or community-engagement records from the website's verified publication collection. "
        "Books and chapters are listed above; unpublished submissions are omitted.",
        STYLES["note"]))
    for item in publications:
        title = clean(item["title"])
        authors = ", ".join(str(x) for x in item.get("authors", []))
        venue = str(item.get("venue", ""))
        year = str(item.get("year", ""))
        line = f"<b>{year}. {title}.</b> {clean(authors)}. <i>{clean(venue)}</i>."
        doi = item.get("doi")
        if doi:
            url = "https://doi.org/" + quote(str(doi), safe="/:._-()")
            line += f' <link href="{escape(url, quote=True)}" color="#195d68">DOI</link>'
        story.append(Paragraph(line, STYLES["bib"]))

    add_section(story, "Academic Profiles and Contact")
    for name, url in [
        ("Google Scholar", profile["profiles"]["scholar"]),
        ("ORCID", profile["profiles"]["orcid"]),
        ("ResearchGate", profile["profiles"]["researchGate"]),
        ("GitHub", profile["profiles"]["github"]),
    ]:
        story.append(Paragraph(f'<link href="{escape(url, quote=True)}" color="#195d68">{name}</link>', STYLES["compact"]))
    story.append(Paragraph("Contact: " + clean(profile["emails"]["primary"]), STYLES["compact"]))

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(f"Generated public CV: {filename} ({filename.stat().st_size} bytes; {len(publications)} journal/conference articles).")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("Usage: python scripts/generate-public-cv-pdf.py /tmp/public-cv.json public/files/arif-muamar-cv.pdf")
    build(json.loads(Path(sys.argv[1]).read_text(encoding="utf-8")), sys.argv[2])
