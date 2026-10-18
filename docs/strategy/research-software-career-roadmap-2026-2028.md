# Research and Software Career Strategy (2026–2028)

> **Status:** Working strategy / decision log, not a final specialization decision  
> **Last updated:** 18 October 2026  
> **Scope:** Public-safe summary of ideas. No private compensation, confidential collaborator, or institutional agreement details.

## Executive decision

Develop two complementary but distinct professional tracks:

1. **Research:** produce defensible scientific knowledge, methods, publications, datasets, and collaborations.
2. **Software engineering:** deliver reliable websites, web applications, and information systems that solve identifiable operational problems.

A third category, **bridge projects**, is possible when both scientific and user-value questions are independently valid. Do not assume that a polished application constitutes a scientific contribution, or that a publishable result constitutes a marketable product.

**Current working industry positioning:** *Full-stack information-systems developer exploring a specialization in geospatial and data-driven applications.*

This positioning remains a **hypothesis to test**, not a permanent brand commitment. Existing WordPress experience remains an asset for near-term professional opportunities.

## Constraints and priorities

- Doctoral research and graduation milestones take precedence over independent software work.
- Maintain professional commitments to the home university.
- Pursue external engagements only when compatible with applicable employment, scholarship, immigration, conflict-of-interest, confidentiality, and intellectual-property obligations.
- Avoid ongoing operational duties, emergency support contracts, and indefinite maintenance during the doctorate.
- AI-assisted development can accelerate delivery, but human responsibility remains for requirements, security, authorization, testing, accessibility, deployment, and maintainability.
- Build a small number of production-quality case studies rather than many unfinished demo applications.
- Treat independent software work as distinct from any partner-led lecturer training or publishing activity; document boundaries before undertaking potentially overlapping work.

A trial capacity of **2–4 hours per week for portfolio development** is a planning ceiling, not a recurring obligation. Pause it around experiments, manuscripts, supervisor commitments, and dissertation milestones.

## Research vs. software vs. bridge: classification

| Dimension | Research track | Software/business track | Bridge project |
| --- | --- | --- | --- |
| Entry question | What is the unresolved scientific problem? | What painful user problem is worth solving? | Are both questions independently meaningful? |
| Core outcome | Valid scientific claim or reusable research artifact | Working, secure, useful software | Separate scientific and product outcomes |
| Evidence | Literature gap, controls, baselines, statistics, reproducibility | Discovery interviews, task success, operational metrics, willingness to pay | Both sets of evidence |
| Output | Paper, method, dataset, protocol, research code | Website, app, service, documentation, deployment | Research artifact + software system, scoped independently |
| Failure mode | Engineering without novelty | Novelty without customer value | Trying to satisfy two audiences with an incoherent scope |

**Classification rule:** Before starting a project, write down (a) the scientific claim, if any, and (b) the user problem and buyer, if any. If neither is clear, defer the project.

**Do not redirect the dissertation** based on commercial ideas. Research topics require problem-first literature review, methodologically meaningful gaps, and supervisors' guidance. A commercial project needs evidence of practical demand, not necessarily research novelty.

### Examples

- Plant bioelectrical signal learning and rigorous ML validation → **research**.
- Geospatial ML method tested against proper baselines → **research**.
- Geographic asset inventory, inspections, and maintenance workflow → **software**.
- Research-grade environmental modeling paired with a separate field-operations app → **possible bridge**, only if each outcome is explicitly evaluated.
- WordPress modernization or a database-backed administrative portal → **software**.
- ERP implementation → **software**, with high domain and post-launch support requirements.

## Candidate software specializations

The comparison below is a **qualitative prioritization**, not a measured ranking or earnings forecast. Claims about local buyer budgets, competition, and conversion need direct validation.

| Niche | Personal advantage | Opportunity hypothesis | Principal risk | Provisional role |
| --- | --- | --- | --- | --- |
| WordPress modernization / migration | Years of direct experience; existing deployed work | Organizations need performance, redesign, migration, content/SEO, security fixes | Price competition and support expectations | Near-term monetization lane |
| Operational dashboards and workflow automation | Data analysis, QA processes, full-stack projects | Organizations manage fragmented records and repetitive workflows | Commodity dashboards; vague scope | Broad engineering core |
| **WebGIS / geospatial information systems** | Environmental data research; GIS/ML interests | Field assets, agriculture, infrastructure, inspections, spatial decisions | Specialized buyers; procurement and GIS-data complexity | Leading differentiation hypothesis |
| Odoo / ERP configuration and integration | Information-systems mindset and database knowledge | Businesses pay for standardized operational processes | Deep finance/inventory process knowledge and ongoing support | Explore later; not primary during PhD |
| IoT monitoring platforms | Sensor/data experience | Monitoring assets, environmental variables, facilities | Hardware support, field reliability, integration costs | Adjacent niche / possible bridge |
| Event operations software | Conference and organizational systems experience | Registrations, reviews, certificates, attendance, reporting | Low-cost competitors and event-time support burden | Portfolio / bounded implementation |
| General custom websites | Existing portfolio and delivery skills | Wide customer base | Hard to differentiate | Supporting capability, not positioning |

### Evidence standard

Evidence such as national digital-payment adoption, government geospatial infrastructure, vendor marketing prices, and an ERP-partner directory shows that a **category exists**, not that an independent developer can reliably win profitable work.

Before treating a niche as validated, establish:
1. A concrete target customer segment and decision-maker.
2. Repeatedly observed workflow failure or cost.
3. Current workaround and competing solutions.
4. Budget owner, procurement path, and price sensitivity.
5. Implementation and post-launch effort.
6. At least one meaningful commercial commitment, preferably a paid pilot.

Do not recycle unsourced market totals or vendor list prices as guaranteed revenue.

## Technology strategy

Prioritize transferable software-engineering fundamentals over a long list of frameworks:

- Relational schema design, PostgreSQL, migrations, indexing, backups.
- Authentication, role-based authorization, audit trails, data protection.
- APIs, validation, tests, CI, observability, deployment.
- Responsive design, accessibility, performance, usable operations workflows.
- Git-based change management, security review, clear documentation.

**Pragmatic application stack to evaluate**
- **Content-first sites:** WordPress when CMS/editorial workflows matter; Astro for static/content-heavy sites.
- **Workflow-heavy information systems:** Laravel/PHP + PostgreSQL; evaluate Filament/Livewire for efficient CRUD/admin interfaces.
- **Complex interactive applications:** TypeScript + React where warranted by UX needs.
- **Geospatial:** PostgreSQL + PostGIS, QGIS for data preparation, Leaflet for simpler maps, MapLibre for advanced interactive maps.
- **Research/analysis:** Python and relevant scientific libraries, separate from production app code where useful.
- **Deployment:** select hosting based on runtime, data sensitivity, operational burden, and total ownership cost. Do not assume one free-tier platform suits all products.

**Decision rule:** Prefer the simplest maintainable architecture that satisfies actual requirements. Do not force React, Odoo, Python, or Laravel into every project.

## Initial flagship project hypothesis

**GeoOps — Spatial Asset and Field Inspection Management (working title)**

**Target workflow:** an organization maintains geographically distributed locations/assets. Authorized staff record inspections, status, photos, actions, and follow-ups; managers review progress using a map and operational dashboard.

**MVP candidate:**
- User roles and secure authentication.
- Spatial asset/location registry.
- Mobile-friendly inspection records and status workflow.
- Map and filtered table views.
- Search, basic reporting and export.
- Audit/event history, seed data, and clear demo disclaimers.

Do **not** begin with ML, IoT integration, complex remote sensing, or disaster-prediction features. Those increase scope without proving the core workflow has demand.

Use synthetic data or appropriately licensed public data. Do not present experimental risk models as official warnings. Do not expose sensitive coordinates or client records in demos.

## Portfolio architecture

Use the existing personal website as an umbrella, with clear separation:

- **Research:** questions, contribution, methods, experiments, publications, reproducibility.
- **Software:** problem, users, own role, architecture, tradeoffs, testing, security, deployment, demonstrated outcome.

Possible future routes: `/software/`, `/software/web-apps/`, `/software/information-systems/`, and project case studies. Only activate public routes once credible examples exist.

Existing areas worth reviewing for permissions and quality before showcasing:
- Organizational website/portal work.
- Content-platform migration and modernization.
- Conference website and public data integrations.
- Financial dashboard, using a **synthetic demonstration dataset**.
- Other private or paused projects should remain excluded unless explicitly approved.

Repository visibility, institutional ownership, source licenses, photos, private data, credentials, and project permissions must be checked before public case studies. A deployment or repository alone is not proof of production readiness.

## Validation experiment (small, PhD-safe)

Run **a 12-week exploration**, with time adjusted to doctoral deadlines:

1. **Weeks 1–4:** study essential geospatial stack; build a small map/data viewer; select an operational problem.
2. **Weeks 5–8:** add PostgreSQL/PostGIS, records, and workflow functionality; interview potential buyers.
3. **Weeks 9–12:** test authorization and behavior; finish documentation and a case study; seek evidence of a pilot.

Customer-discovery target: **10–12 carefully selected conversations** across more than one buyer type. This is a learning sample, not representative market research. Look for repeated, concrete pains and access to a budget owner. A verbal compliment is not purchase intent.

**Go/no-go gate:** Continue towards productization only if (a) users describe a recurring costly problem, (b) an identifiable decision-maker will engage seriously, and (c) estimated deployment/support burden fits doctoral constraints. Otherwise preserve the case study and revisit the niche later.

## 2026–2028 staging

**Late 2026 — foundation:** inventory and quality-audit existing work, prepare software case studies, learn geospatial fundamentals, make a tightly scoped prototype.

**2027 — validation:** use bounded portfolio experiments and customer discovery; take a small, legally permitted engagement only if time limits and scope are realistic. Keep research milestones independent.

**2028 — protect the dissertation:** reduce or pause commercial development during graduation-critical periods. Reassess productization, agency/solo practice, and specialization after the doctorate.

## Decision log: current status

| Topic | Provisional decision | Evidence still needed |
| --- | --- | --- |
| Generalist vs. specialist | Full-stack core, geospatial/data specialization candidate | Customer discovery and enjoyable execution |
| WordPress | Retain as a practical existing strength | Scope, client demand, margins and maintenance burden |
| Odoo | Explore conceptually; avoid major implementation commitment now | Process expertise, partner pathway, support feasibility |
| Research vs. software | Separate goals, evidence and case studies | Classify each new project before starting |
| Bridge projects | Optional, not mandatory | Independent scientific novelty and real user value |
| Product vs. service | Portfolio and limited services first; product only after demand | Real adoption and paid pilot |
| Workload | PhD first; strict capacity and pause gates | Actual hours from first experiments |
| Public portfolio | Selective verified cases, no confidential client material | Ownership and publishing permission |

## Questions for the next review

1. Which two or three existing software projects can be shown publicly with permission and reliable demo data?
2. Which industry segment has the clearest operational pain: agriculture/field services, asset management, logistics, or environmental consulting?
3. Does WebGIS provide a meaningful differentiator, or are buyers better served by standard dashboards and workflows?
4. Which tasks are worth selling as bounded services, and which inevitably create maintenance obligations?
5. Which research projects genuinely benefit from shared data/engineering tools without becoming commercial obligations?
6. What concrete result would justify committing to Odoo, or dropping WebGIS as the priority?

---

**Guiding principle:** *Research is selected for scientific contribution. Software is selected for demonstrated user value. Shared tools and experience are welcome; shared objectives are not required.*
