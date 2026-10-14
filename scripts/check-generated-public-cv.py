#!/usr/bin/env python3
"""Regression gates for generated, privacy-filtered PDF CV."""
import re
import sys
from pathlib import Path
from pypdf import PdfReader

filename = Path(sys.argv[1] if len(sys.argv) > 1 else "public/files/arif-muamar-cv.pdf")
reader = PdfReader(str(filename))
body = "\n".join((page.extract_text() or "") for page in reader.pages)
checks = {
    "nonempty searchable CV": len(body) > 5500,
    "reasonable page count": 3 <= len(reader.pages) <= 25,
    "name and degrees": "Arif Mu" in body and "Master of Computer Science" in body,
    "grant/research sections": "Funded Research Experience" in body,
    "books and intellectual property": "Books and Book Chapters" in body and "Intellectual Property and Creative Works" in body,
    "journal/conference publications": "Published Journal and Conference Work" in body,
    "verified DIMA publication": "Optimalisasi Pembelajaran melalui Workshop" in body,
    "verified IJAIM 2026 publication": "Dynamic Knowledge Intelligence for Human AI Collaborative" in body,
    "verified JMM 2026 publication": "Transnational Academic-Community Partnerships" in body,
    "ICCRAIDS 2026 paper": "A Systematic Review of Plant Bioelectrical Potential" in body,
    "data-mining award": "Indoneris National IT Competition" in body,
    "academic memberships": "Japanese Society for Artificial Intelligence" in body,
    "academic snapshot disclosure": "August 2026" in body,
    "no direct contact phone labels": not re.search(r"(WhatsApp:|Japan:\s*\+81|Mobile:|Phone:|Telephone:)", body, re.I),
    "no union name": not re.search(r"(Serikat Pekerja Kampus|LAKPESDAM|PCINU)", body, re.I),
    "no membership IDs": not re.search(r"Membership (?:No\.?|ID)\s*[:#]", body, re.I),
    "no stale scholar counters": not re.search(r"(223 citations|h-index\s*9|i10-index\s*9)", body, re.I),
    "no unpublished manuscript status": not re.search(r"(Submitted / under review|Forthcoming Conference Presentations|planned conference presentation)", body, re.I),
}
errors = [name for name, passed in checks.items() if not passed]
if errors:
    print(f"Generated CV PDF audit FAILED ({len(reader.pages)} pages; {filename.stat().st_size} bytes):")
    for error in errors:
        print(" - " + error)
    sys.exit(1)
print(f"Generated CV PDF PASS: {len(reader.pages)} pages, {filename.stat().st_size} bytes, searchable text and privacy verified.")
