# DALY-CARE Data Resource - Methods

This is a concise methods summary based only on the 2025 DALY-CARE data-resource paper. The full-text paper is available in the [`publications/` folder](../publications/dalycare-data-resource-2025.pdf).

## Study population

DALY-CARE included all adult residents of Denmark registered with a lymphoid cancer or precursor diagnosis from 1 January 2002 onward. Patients were identified in national clinical quality registries, Danish Health Data Authority registers, and electronic health records using ICD-10 and SNOMED codes.

The data cutoff was 15 November 2023. The study population included 65,744 individuals. Because diagnoses were collected from both inpatient and disease-specific registers, the cohort contains a mixture of incident and prevalent cases.

## Data sources

DALY-CARE combined data from:

- national lymphoma, multiple myeloma, and chronic lymphocytic leukemia quality registries;
- nationwide registers covering diagnoses, prescriptions, hospital medication, procedures, pathology, laboratory results, cancer, and causes of death;
- 16 modules from the EPIC-based electronic health record system in eastern Denmark;
- microbiology, biochemistry, flow cytometry, IGHV, targeted sequencing, and FISH laboratory systems; and
- manually curated datasets from earlier clinical studies.

Electronic health records included treatment plans, administered and prescribed medication, admissions, diagnoses, test results, clinical notes, imaging, microbiology, vital signs, social history, intensive-care stays, transfers, and do-not-resuscitate orders.

## Variables and follow-up

The resource includes demographic and prognostic information, diagnoses, treatment, response, laboratory results, procedures, pathology, medical imaging, and survival. Data were harmonized using standard coding systems, including ICD-10, SKS, ATC, NPU, SNOMED, and SHAK.

Dates of last follow-up or death were assembled from the cause-of-death register, clinical quality registries, and electronic health records. Register and electronic health record data were updated annually, with additional electronic health record updates available on request.

## Biobank material

Available samples were identified in the CLL Biobank, Copenhagen Hospital Biobank, Danish Cancer Biobank, and PERSIMUNE Biobank. The paper reported 40,863 samples from 18,528 individuals. The DALY-CARE protocol permits molecular, functional, and omics analyses linked to clinical outcomes.

## Data infrastructure and processing

Data were stored in PostgreSQL within the ISO 27001-certified secure computing environment of the Danish National Genome Center. Each patient was assigned a pseudonymized identifier linked to the Danish Civil Registration System, enabling linkage across datasets.

The database was divided into two layers:

- **Import:** raw register, electronic health record, laboratory, and lookup-table data.
- **Core:** cleaned, harmonized, aggregated, and manually curated datasets.

Reproducible R and Python pipelines were used to load, clean, transform, and query the data, generate model-ready features, and define clinical outcomes. Earlier data extracts were logged to support reproducibility.

## Data coverage and access

Coverage was assessed across data sources, calendar time, and Danish regions because older data and data from outside eastern Denmark were less complete. Researchers must account for these differences when linking datasets or defining study populations.

Individual-level health data cannot be shared publicly. Approved collaborators may analyse the data under a data-processing agreement, and all analyses must be conducted in the secure DALY-CARE environment at the Danish National Genome Center.

## Ethics

The DALY-CARE protocol was approved by the Danish Health Data Authority and the National Ethics Committee (P-2020-561 and 1804410). The approvals cover retrospective and prospective collection of electronic health data and biobank samples for epidemiological, molecular, functional, and data-driven research.

## Full text and citation

Brieghel C et al. *The Danish Lymphoid Cancer Research (DALY-CARE) Data Resource: The Basis for Developing Data-Driven Hematology*. Clinical Epidemiology. 2025;17:131-145. https://doi.org/10.2147/CLEP.S479672
