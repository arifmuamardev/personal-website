# Public website content and consistency audit — 16 October 2026

## Scope and method

Examined the templates for Home, About, Education, Experience, Teaching, Academic Service, Recognition, Research, Projects, Publications (index and detail), Writing (index and posts), Contact, Privacy, and the global layout/structured profile. Reviewed the 43 curated publication front-matter records and five migrated blog posts for obvious dates, categories, identifiers and inconsistent terminology. Compared the relevant doctoral program name with Kanazawa University's official Graduate School documentation; compared historical academic details with the owner's earlier CV available via Drive. No private document or personal identifier was uploaded to the public repo.

**A repository metadata audit is not a publisher-by-publisher validation of all 43 papers.** Source dates and author records still require independent reconciliation for remaining exceptions.

## Editorial rules applied

1. **One identity:** PhD student at Kanazawa University (started October 2025); Graduate School of Natural Science and Technology, Division of Electrical, Information and Communication Engineering. The doctoral degree is explicitly **in progress**, never awarded.
2. **One research focus:** Plant bioelectric potentials (BEP), acquisition and preprocessing, time-series machine learning and reproducible evaluation. Experimental/edge directions are described as research interests rather than validated or deployed capabilities.
3. **No GPA on the website:** Removed GPA details from the current shared education source and added a generated-page check. Previously published files/search caches/Git history are not retroactively erased.
4. **Each fact has a home:** Education for degrees and research topics, Experience for appointments/funded participation, Research for current scientific questions, Projects for scoped work and outputs, Publications for bibliographic records, Academic Service for roles, Recognition for awards.
5. **Dated roles stay qualified:** Roles from the 14 August 2026 curated CV are not asserted to have independent current-appointment verification.
6. **Historical writing remains historical:** A dated contextual note is attached to the March 2025 article mentioning master’s studies, without rewriting its original first-person narrative.
7. **One set of navigation labels:** “Writing” is used consistently as the human-facing label while the existing `/blog/` URL remains unchanged for compatibility.
8. **Privacy accuracy:** No claim is made that infrastructure providers never process IP addresses or technical access logs.

## Implemented changes by public page

| Page | Improvement |
| --- | --- |
| Home | Shared BEP focus; removed the repetitive interests/projects block; added links to academic-background sections |
| About | Consistent doctoral school/division and shared BEP research statement |
| Education | No GPA; degree status, institutions, study period, thesis/research topic separately labeled |
| Experience | Existing qualified historical appointments and funded research retained; no claim of new awards |
| Teaching | Existing subject areas/competencies preserved without unverified courses |
| Academic Service | Role classifications, dated records and publication links retained |
| Recognition | Scholarships and awards remain separated; co-creator qualifications preserved |
| Research | Unified study description; clarified current and prospective methods; removed repeated 2024 funding records, linking to Experience instead; removed duplicated institutions/status sidebar |
| Research Projects | Doctoral role consistently labeled “PhD Student”; associated research publication links retained |
| Publications | IEEE-inspired type/citation display and dated Google Scholar statistics retained; no DOI or year rewritten without source verification |
| Writing | “Writing” label aligned in header and section; added historical master’s-to-PhD context to the 24 March 2025 article |
| Contact | Doctoral school/division added via canonical profile data |
| Privacy | Updated wording concerning static hosting and technical request logs |
| Structured profile | Shared institutional and BEP research data; no awarded-PhD inference |

## Known bibliography nuance, not silently rewritten

- The **Zachman Framework** article (DOI `10.25077/TEKNOSI.v10i3.2024.201-215`) belongs to an issue labeled **2024**, but the publisher/research record reports online publication in **January 2025**. The website currently uses 2025; retain this unless a unified explicit policy (online first vs issue date) is agreed. Official publisher: https://teknosi.fti.unand.ac.id/index.php/teknosi/article/view/2853
- The **Warung Kopi Berbasis Masjid** article's publisher itself currently displays `bagiPengelola` without a space. Do not silently correct an official title in citations without editorial/source confirmation. Publisher: https://ejournal.uinsaizu.ac.id/index.php/sjp/article/view/15749
- The **Smart Agricultural Technology** scoping review has a December 2026 issue label. This is not automatically a false publication status if the article is available online before the issue month; verify publisher online date when reconciling bibliography.

## Unresolved, requiring owner/institution/publisher evidence

- Precise end/current status of the university quality-assurance appointment while on doctoral study leave.
- Journal editorial and peer-review appointment durations and whether memberships listed in August 2026 remain current.
- Comprehensive publisher-backed reconciliation of every article title/year/authorship; avoid automatic DOI guessing.
- Whether additional teaching modules or formal syllabi should be released (not included here).
- Legacy cached pages and historical public CV PDF content cannot be removed from Git history/search indices by a normal website build.

## Validation gates

- Source audit, academic profile consistency/grade exclusion, theme checks, bibliography formatter, link checks, generated route check, HTML/SEO quality gates, production build dry-run.
- Old combined CV and public PDF remain retired. Pilketos remains retired. No hosting/DNS or other application changes.
