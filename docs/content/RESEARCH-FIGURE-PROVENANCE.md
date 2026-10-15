# Research figure provenance and publication rules — 16 October 2026

## What was released

The Research Projects page renders four lightweight, semantic, HTML/CSS **conceptual workflows** using `src/components/ResearchWorkflow.astro`.

- Bioelectric acquisition: signals, recording, signal quality, analysis.
- Bioelectric classification: sequences, preprocessing, models, evaluation.
- Malaria imaging: microscopy inputs, GAN-based augmentation, transfer learning, classification.
- Landslide modeling: spatial inputs, augmentation, RBF network, susceptibility mapping.

The stage labels are editorial summaries of the existing project descriptions and linked publications. The diagrams are **not real signals, quantitative visualizations, performance claims, laboratory photos, or scientific figures reproduced from the papers**. They must retain their explicit provenance caption.

## Why no recordings or equipment photos?

As audited on 16 October 2026, this repository contains only an approved profile photograph, social preview image, favicon and CV PDF; it does not contain rights-cleared lab/equipment imagery, BEP recordings or author-approved paper figure exports.

Do not fabricate voltage traces, electrode placements, confusion matrices, ROC curves, metrics, equipment images or third-party publisher figures to make the research page appear more complete.

## Adding an actual research figure later

Before adding a figure:

1. Obtain the owner's authorization to publish the exact file, including whether it is unpublished/private research.
2. Document origin (study, experiment, paper, figure number, creation date), rights/license and any collaborator approval.
3. Prefer high-resolution, de-identified originals; remove identifying metadata, patient data, participants, private lab identifiers and access credentials.
4. Caption quantitative plots with dataset, measured units, sampling, evaluation split and any relevant limitations; never substitute a simulated signal without an unmistakable synthetic-data label.
5. Export an optimized static image to `public/images/research/` with useful alternative text and a linked publication or method note.
6. Check image readability at mobile widths and in dark/light themes, then run the normal production QA pipeline.
7. Keep public figures and conceptual workflows visually distinct so readers cannot confuse them.

## Maintenance

Edit `src/components/ResearchWorkflow.astro` when method labels need correcting. Each project is keyed by its content collection ID, and the build quality script requires one transparent diagram per listed research project. Review workflow descriptions against new publications; methodological cartoons do not establish empirical novelty or proof of model performance.

Related code: `src/pages/projects.astro`, `scripts/check-site-quality.mjs`.
