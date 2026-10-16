# DALY-CARE Genetic Cohort - Methods

This is a concise methods summary based only on the DALY-CARE Genetic Cohort Profile paper. The full-text paper is available in the [`publications/` folder](../publications/CLEP-607221-the-danish-lymphoid-cancer-research--daly-care---genetic-coh.pdf).

## Study population

The DALY-CARE Genetic Cohort is nested within the nationwide DALY-CARE data resource. Participants were included if they:

1. were adults living in Denmark;
2. were enrolled in DALY-CARE;
3. had at least one lymphoid cancer or precursor diagnosis from 1 January 2002 onward; and
4. had an available sample in a participating Danish biobank.

After genetic quality control, the cohort included 8,675 individuals.

## Data sources and linkage

Genetic data were linked to longitudinal clinical information from Danish national health registers, clinical quality registries, laboratory systems, pathology records, and hospital electronic health records. Linkage used a unique pseudonymized DALY-CARE identifier connected to the Danish Civil Registration System.

Patients are followed continuously through linked registers and electronic health records. Register and clinical data are updated at least annually.

## Biological samples and genotyping

Peripheral whole-blood samples came from four Danish biobanks: the CLL Biobank, Copenhagen Hospital Biobank, Danish Cancer Biobank, and PERSIMUNE Biobank. Samples were sent to deCODE Genetics for DNA extraction, genotyping, and imputation.

Common variants were imputed using the 1000 Genomes Phase 3 and HapMap reference data. Rare-variant imputation was supported by a reference panel of more than 6,000 Danish whole-genome sequences.

## Genetic quality control

Quality control was performed in PLINK 1.9 and 2.0. The main steps were:

- removal of variants and samples with high missingness;
- exclusion of samples with discordant genetic and reported sex;
- exclusion of variants with minor allele frequency below 1%;
- exclusion of variants deviating from Hardy-Weinberg equilibrium (p < 10^-5); and
- removal of heterozygosity outliers more than 3 standard deviations from the mean.

The final dataset contained 8,675 individuals and 11,565,053 variants.

Copy-number variants were called from SNP-array B-allele frequency and log R ratio data using PennCNV. Calls supported by fewer than 20 SNPs were excluded, and remaining calls underwent visual quality control.

## Relatedness and ancestry

Pairwise genetic relatedness was estimated from linkage-disequilibrium-pruned autosomal SNPs using identity-by-descent statistics in PLINK. Pairs with PI_HAT > 0.2 were classified using Z0, Z1, and Z2 sharing patterns.

Genetic ancestry was inferred by projecting participants onto principal-component space derived from UK Biobank and 1000 Genomes reference populations. Each participant was assigned to the nearest reference ancestry group when within the predefined distance threshold.

## Data management and ethics

Data are stored and analysed in the ISO 27001-certified secure computing environment of the Danish National Genome Center. Raw pseudonymized data are retained in an import layer, while harmonized data are maintained in a core layer using standardized clinical coding systems.

The cohort is covered by DALY-CARE approvals from the Capital Region Data Protection Agency and the National Ethics Committee (P-2020-561 and 1804410). Consent was waived for register data and retrospective biobank material; written consent was obtained for prospective sampling.

## Full text and citation

Dietz JBN et al. *The Danish Lymphoid Cancer Research (DALY-CARE): Genetic Cohort Profile*. Clinical Epidemiology. 2026;18. https://doi.org/10.2147/CLEP.S607221
