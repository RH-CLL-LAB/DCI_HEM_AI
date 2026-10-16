# DALY-CARE Clinical Metadata Summaries

This file extracts aggregate clinical metadata from [`DALYCARE_atlas_AOT_V31.html`](./DALYCARE_atlas_AOT_V31.html). It was generated with [`extract_clinical_summaries.js`](./extract_clinical_summaries.js). It contains dataset-level summaries only, not patient-level records. Counts have not been independently verified against the source database.

## Atlas scope

| Item | Atlas summary |
|---|---:|
| Catalogued datasets | 64 |
| Profiled or resolved datasets | 63 |
| Database tables | 164 |
| Profiled rows | 618M+ |
| Patients in the atlas patient table | 75,572 |
| Patients in the published 2025 cohort | 65,774 |

The atlas explains that the patient table is larger than the published cohort because it also contains precursor states, including MBL and MGUS, and broader administrative registrations.

### Datasets by domain

| Domain | Datasets |
|---|---:|
| Core | 3 |
| Clinical quality registries (RKKP) | 3 |
| Danish Health Data Authority (SDS) | 22 |
| Sundhedsplatformen EHR (SP) | 22 |
| Laboratory and curated datasets | 14 |

## Clinical-domain overview

| Domain | Main source | Summary |
|---|---|---|
| Vital signs | `SP_VitaleVaerdier` | 64.1M longitudinal physiological measurements |
| Social history | `SP_Social_Hx` | 368,831 smoking and alcohol-history entries |
| Admissions and transfers | `SP_ADT_Haendelser` | 9.8M admission, discharge, transfer, and ambulatory events |
| Medical notes | `SP_Journalnotater_del1/2` | Free-text notes plus note metadata from the current and legacy EHR |
| Medical imaging | SDS procedures, DaMyDa, and SP imaging | Procedure codes, disease-specific modalities, imaging orders, and report text |
| Microbiology | PERSIMUNE and SP blood-culture tables | Analyses, cultures, microscopy, resistance testing, specimens, and susceptibility results |

## Vital signs

`SP_VitaleVaerdier` contains 64,124,202 measurements. The most frequent descriptors in the embedded profile are:

| Descriptor | Rows | Patients | Coverage |
|---|---:|---:|---|
| Puls | 9,831,949 | 26,393 | 2012-01-09 to 2025-11-17 |
| SpO2 | 7,216,742 | 25,912 | 2016-05-19 to 2025-11-17 |
| Resp | 6,532,782 | 12,540 | 2016-05-23 to 2025-11-17 |
| BT (Diastolisk) | 6,377,031 | 26,413 | 2012-01-09 to 2025-11-17 |
| BT (Systolisk) | 6,377,031 | 26,413 | 2012-01-09 to 2025-11-17 |
| Resp.frekvens | 5,087,727 | 25,455 | 2016-05-19 to 2025-11-17 |
| Saturation | 5,005,058 | 19,890 | 2016-05-19 to 2024-01-23 |
| EWS total | 4,347,916 | 24,510 | 2016-05-19 to 2025-11-16 |

### Anthropometrics

| Measure | Rows | Patients | Median | P05-P95 | Observed range |
|---|---:|---:|---|---|---|
| Weight | 1,010,519 | 25,996 | 76 kg | 51-109 kg | 0-600 kg |
| Height | 419,110 | 25,580 | 172 cm | 155-188 cm | 5-263 cm |

The extreme observed ranges indicate that plausibility filtering is required before analysis.

## Social history

`SP_Social_Hx` contains 368,831 entries. The atlas reports scan-based categorical summaries rather than exact whole-table totals.

### Smoking status

| Category | Scanned records |
|---|---:|
| Er holdt op | 43,895 |
| Aldrig | 33,979 |
| Ja | 17,675 |
| Ikke spurgt | 3,998 |
| Passiv | 453 |

Pack-year information was non-missing in 117,355 records, corresponding to 31.82% of the social-history data.

### Alcohol status

| Category | Scanned records |
|---|---:|
| Ja | 53,100 |
| Nej | 22,904 |
| Ikke aktuelt | 8,504 |
| Aldrig | 3,956 |
| Ikke spurgt | 1,431 |
| Udskyd | 181 |

## Admissions, discharges, and transfers

The resolved `SP_ADT_Haendelser` profile contains 9,819,261 events for 28,464 patients from 2016–2025.

| Event type | Events |
|---|---:|
| Udskrivning (discharge) | 2,623,546 |
| Flyt Ud (transfer out) | 2,089,459 |
| Ambulant hospitalspatient | 2,080,026 |
| Flyt Ind (transfer in) | 2,039,678 |
| Indlæggelse (admission) | 612,178 |
| Patientopdatering | 203,057 |

### Admission characteristics

| Classification | Events |
|---|---:|
| Planlagt (planned) | 5,081,832 |
| Akut (acute) | 4,644,866 |
| Ambulant patient | 5,593,643 |
| Indlagt patient (inpatient) | 4,207,164 |

The atlas also contains 17,820 ICU stays. ADT events can be linked temporally to treatment plans, administered medication, vital signs, and medical notes using the shared patient identifier.

## Medical notes

The resolved profile for `SP_Journalnotater_del1` contains 12,311,961 note rows for 29,892 patients, with coverage from 2004–2025. The average note length is 997 characters and the recorded maximum is 60,464 characters.

The separate `SP_Journalnotater_del2` metadata table contains 16,987,499 rows with coverage from 2016-05 to 2025-08.

| Frequent note type | Notes |
|---|---:|
| Kontinuationsnotater | 3,288,244 |
| Historisk Kontinuationsnotat | 2,010,820 |
| Tilføjelsesnotat | 716,740 |
| Amb.notat til prakt. læge | 618,442 |
| Historisk Notat Ukendt | 575,938 |
| Telefonnotat | 529,907 |

The HTML's static card reports 11.4M+ notes for 22,708 patients, while the newer embedded resolved profile reports 12.3M rows for 29,892 patients. The difference should be reconciled before either figure is used in formal reporting.

Free-text notes require controlled access and NLP processing. The atlas notes that cross-hospital generalizability remains under investigation.

## Medical imaging

The atlas describes three complementary imaging layers: nationwide UX-SKS procedure codes in SDS, disease-specific imaging fields in DaMyDa, and SP imaging-order metadata and report text from eastern Denmark.

| Source | Coverage summary |
|---|---|
| Published DALY-CARE paper | 3.3M radiological examinations (Brieghel et al. 2025) |
| SDS `t_sksube` | 40,459,037 procedure rows and 761 distinct codes |
| SP imaging metadata | 358,459 rows for 24,846 patients |

### Frequent nationwide imaging and radiotherapy codes

| Code | Description | Records |
|---|---|---:|
| APAA4 | CT (unspecified) | 513,086 |
| UXZ11 | MR-scanning (MRI) | 362,134 |
| UXZ10 | CT-scanning | 297,771 |
| UXRC00 | Chest X-ray | 233,499 |
| UXCC00 | CT thorax | 174,057 |
| BWGC1 | Radiotherapy fraction | 156,873 |
| BWGC4A | Electron beam therapy | 136,377 |
| UXCD00 | CT abdomen | 89,765 |

### DaMyDa imaging modalities

| Modality | Records |
|---|---:|
| CT | 5,823 |
| MRI | 3,284 |
| PET/CT | 1,418 |
| Other | 384 |
| DEXA | 268 |
| Scintigraphy | 128 |

These data describe imaging events and metadata, not stored image pixels. The SP report-text table requires separate handling and access controls.

## Microbiology and infection data

| Dataset group | Rows |
|---|---:|
| PERSIMUNE microbiology analyses | 3,596,374 |
| PERSIMUNE cultures | 1,336,940 |
| PERSIMUNE resistance results | 813,817 |
| PERSIMUNE microscopy | 128,028 |
| SP blood-culture workflow | 4,102,066 |

The PERSIMUNE data cover virology/PCR analyses, cultures, microscopy, susceptibility testing, specimen material, organism domain, result class, and contributing hospital or laboratory. The SP blood-culture tables cover specimens, identified organisms, clinical context, and antibiotic sensitivities.

Common sample materials include swabs, blood, stool, airway secretions, EDTA blood, sputum, and bronchoalveolar lavage. Culture data are dominated by blood and urine cultures. Susceptibility results include standard susceptible, intermediate, and resistant classifications, alongside legacy numeric values that require harmonization.

## Interpretation notes

- These are aggregate atlas summaries, not a data dictionary or source-of-truth extract.
- Some categorical frequencies were generated from scans of up to 100,000 rows and are not full-table totals.
- Counts may differ between the static HTML display and newer metadata objects embedded in the same file.
- Coverage varies by calendar period, region, and source system.
- Missing or unresolved tables in the atlas should not automatically be interpreted as unavailable in every DALY-CARE environment.
- Free-text notes, pathology reports, and imaging reports require specific access and governance controls.
- Patient identifiers and row-level clinical data are intentionally not included in this summary.

