# Software Portfolio Evidence and Specialization Experiments

> **Status:** Planning companion to [Research and Software Career Strategy (2026–2028)](research-software-career-roadmap-2026-2028.md)  
> **Updated:** 18 October 2026  
> **Visibility:** This planning document is in a **public repository draft branch**. It contains no member records, account information, secrets, financial data, or private client material.

## Purpose

Convert the research-versus-software discussion into a practical evidence-building plan without starting an unsustainable second career during the doctorate.

The initial objective is **three credible software case studies** and **one small geospatial technical experiment**, not a software house, a new SaaS business, or a fixed commitment to WebGIS.

## Current evidence inventory (repository-level only)

The observations below are based on repository files and documentation as of 18 October 2026. They are **not** independent production audits, end-to-end tests, or proof of real-world outcomes. Any public portfolio publication must respect permission, privacy and third-party ownership.

| Project | Evidence visible from existing work | Software competency it may demonstrate | Public portfolio gate |
| --- | --- | --- | --- |
| Personal website | Astro-based site with build, link/content and quality checks | Static architecture, content modeling, deployment, SEO discipline | Verify live behavior and usability; appropriate as support rather than primary flagship |
| PPI Ishikawa | Organizational portal architecture; member onboarding, role and verification workflow, RLS/privacy and event features documented; a real-user acceptance gate remains | Full-stack organizational information systems, authorization, workflow design | Obtain permission for public case-study claims/screenshots; use synthetic examples; verify genuine end-to-end authorization and mobile behavior |
| BeritaDosen website | Content-platform modernization, archive migration reports, testing and release-oriented documentation | CMS migration, content architecture, URL preservation and testing | Confirm current production state independently; obtain publication permission; do not disclose private source/code or content-rights information |
| ICCRAIDS 2027 website | Public-content/staging architecture, database-backed read-only API and release checklist | Database integration, staging workflows, release governance | Confirm organization approval, least-privilege access, and production-readiness facts before making reliability claims |
| Financial dashboard | Known existing finance app, but not evaluated in this pass | Potential CRUD, reports, auth, and data visualization case study | **Never use real financial data in a demo**; audit repo/app with an authorized synthetic dataset before listing |
| Pilketos | Public source exists, but owner previously decided to hide it from the personal website | Potential election/workflow app | **Keep hidden** unless the owner explicitly changes that decision |

**Key distinction:** A repository README or deployment checklist provides evidence of design intent and documented tests, not independent confirmation that security, accessibility and production uptime meet a particular standard.

## Selected portfolio structure

Create **three distinct types of evidence** before expanding:

### Case study A — Content / migration platform

Candidate: a permission-cleared BeritaDosen case study, otherwise the personal website. Demonstrate:
- Legacy requirements and information architecture.
- Content/URL migration strategy.
- Automated quality gates and testing.
- Screenshots, responsive behavior and documented tradeoffs.
- What remains unverified, not just successes.

### Case study B — Authenticated information system

Candidate: a permission-cleared, **synthetic-data** demonstration of PPI Ishikawa workflows or a separate minimal derivative built from scratch. Demonstrate:
- Roles and access boundaries.
- Signup/onboarding or approval state machine.
- Database entities and controlled access.
- Negative/security test cases.
- Actual task completion from an end-user perspective.

**Do not** expose member data or present a protected administrative screen as a public demonstration.

### Case study C — Geospatial engineering prototype

Candidate: **GeoOps Lite**, a deliberately tiny technical slice:
- Import a small, correctly licensed polygon/point dataset for one region.
- Display vector/map features with useful filters.
- Store location records with coordinates/spatial geometry in PostgreSQL/PostGIS.
- Demonstrate one real spatial query (e.g., points within a user-defined area) and a tabular view of results.
- Provide a short architecture note, repeatable setup instructions, and one or two tested data operations.

**Not in the first prototype:** ML, satellite imagery pipelines, field-photo uploads, mobile offline mode, billing, ERP, IoT hardware, or a production-grade multi-tenant platform.

At this stage the prototype tests **technical fit and personal motivation**, not product-market fit.

## What specialization do these projects actually prove?

A coherent portfolio message would be:

> **I build reliable data-backed information systems, including content platforms, operational workflows, and spatial applications.**

This is more defensible today than asserting specialist expertise in enterprise ERP or established WebGIS deployments.

WordPress remains an existing professional competence. Odoo remains an exploration option, not a current production specialization. Full GIS specialization is earned by demonstrating correct geospatial data handling **and** identifying a credible paying-user problem.

## PhD-safe execution sequence

**First 2 weeks — portfolio evidence, not new development**
- Choose two existing projects for potential publication.
- Make an honest capability list: verified, documented-but-unverified, missing.
- Identify ownership/permissions and safe screenshots.
- Draft concise case studies without revealing private details.

**Next 4 weeks — one GIS technical spike**
- Build a minimal map + spatial database + one query, with a repeatable repository.
- Record time spent, obstacles, test results and maintainability.
- Stop if it requires materially more time than the available capacity.

**Following 4–6 weeks — market discovery (not sales promises)**
- Contact 6–12 potential users across at least two segments such as field operations, land/assets, environmental consulting or agricultural operations.
- Ask about a *recent real workflow*, its frequency, impact and current workaround. Avoid pitching features first.
- Record whether the respondent is a user, buyer, influencer or unrelated observer.
- Inspect substitutes: QGIS, spreadsheets, Odoo/ERP, simple mobile forms, incumbent GIS/asset platforms.
- Seek a pilot only after repeated pain is supported by independent accounts and a budget decision-maker is identified.

The 6–12 interviews are a **small discovery sample**. They cannot estimate national demand. Maintain a clear interview log, opposing evidence and a record of why leads were accepted or rejected.

### Stop/go decision

After discovery, score five criteria **with evidence**:
1. **Recurring pain** — Is there a costly or frequent workflow failure?
2. **Reachable buyer** — Can the buyer or budget owner be identified and contacted?
3. **Defensible solution** — Does GIS solve something that a spreadsheet or simple CRUD app cannot?
4. **Support risk** — Can deployment and post-launch obligations fit within doctoral limits?
5. **Portfolio/research synergy** — Do the reusable engineering capabilities justify the investment even without sales?

Decision outcomes:
- **GO as geospatial specialty:** repeated pain, reachable buyer, plausible pilot and support capacity.
- **GO as portfolio only:** technically useful, but buyer demand unproven.
- **PIVOT to general operational systems:** buyer pain exists, but maps add little value.
- **STOP/PARK:** weak evidence, excessive support burden or doctoral deadline conflicts.

Do not change scoring thresholds to justify a preferred result after seeing the data.

## Evidence protocol for each published case study

Each published project should distinguish:

- **Implemented:** can be seen in source and reproducibly run.
- **Tested:** supported by named tests and dated output.
- **Live:** independently verified on the public deployment.
- **Used:** supported by consented feedback or appropriately aggregated metrics.
- **Business impact:** supported by real before/after evidence, **never invented**.

Suggested case-study headings: *Problem → Users and constraints → My contribution → Architecture → Reliability/security decisions → Demo and evidence → Limitations → Next steps.*

If a feature exists only in a prototype or behind a feature gate, label it accordingly. Do not conflate working CI with a complete security audit.

## Engineering and AI-assisted development rules

- Use coding agents for implementation acceleration, **not as the source of truth** for correctness.
- Document requirements and role permissions before writing code.
- Include validation at API/database boundaries and authorization at the server/database layer.
- Test unhappy paths: denied access, incorrect inputs, concurrent changes, missing data, expired credentials, and failure to reach dependencies.
- Run dependency/security checks and verify no secrets or personal data are committed.
- Produce deployment and rollback notes proportionate to risk.
- Review licensing for basemaps, geographic data and third-party packages.
- Maintain a simple time log so that the portfolio plan is compatible with doctoral milestones.

## Open decisions to revisit

| Decision | Default for now | Change only with |
| --- | --- | --- |
| Professional positioning | Full-stack information systems, geospatial candidate | Completed working demo plus demand evidence |
| Backend foundation | Laravel/PostgreSQL for workflow-heavy systems | Concrete requirements making another architecture simpler |
| Frontend | Astro for content, modest JS/React as needed | Proven UX requirements for heavier frontend |
| GIS tooling | PostGIS + QGIS; Leaflet/MapLibre chosen by mapping complexity | Prototype observations |
| Near-term commercial skills | Maintain WordPress capability | Verified alternative with lower acquisition/support burden |
| Portfolio publication | Permission-cleared case studies only | Explicit owner authorization |
| Research overlap | Independent research decision process | Real research question and valid scientific evaluation |
| Schedule | Flexible capacity; doctoral milestones first | Supervisor-approved room in workload |

## Immediate next action

**Do not build GeoOps yet.** First, create two one-page case-study drafts from existing, permission-cleared projects, with explicit *verified vs. unverified* labels. Then use the GIS technical spike to test whether geospatial engineering deserves a larger share of development time.

This sequence gives useful portfolio progress even if GIS later fails commercial validation.
