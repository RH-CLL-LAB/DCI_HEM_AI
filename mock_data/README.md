# DALY-CARE Mock Data

[`mock_data.zip`](./mock_data.zip) is a small mock version of the DALY-CARE data structure. It is intended for development, demonstrations, and pipeline testing.

The archive contains 71 Parquet files:

| Folder | Files | Contents |
|---|---:|---|
| `core/current/` | 5 | Curated patient, diagnosis, death-date, and data-availability tables |
| `import/SDS/2000-01-01/` | 41 | Raw Danish national health-register style data after import |
| `import/SP/2000-01-01/` | 22 | Raw Sundhedsplatformen electronic health record style data after import |
| `import/SUNDK/2000-01-01/` | 3 | Raw CLL, multiple myeloma, and lymphoma quality-registry style data after import |

The dated folders represent the snapshot layout used by the mock package; `2000-01-01` should not be interpreted as clinical coverage.

## Core tables

- `all_patients.parquet` — consolidated patient records
- `all_dalycare_diagnoses.parquet` — DALY-CARE diagnoses
- `all_diagnoses_icd10.parquet` — consolidated ICD-10 diagnoses
- `all_death_dates.parquet` — death-date information
- `patient_data_overview.parquet` — available data by patient

## How to use the data

The `core/current/` folder contains curated tables produced from the source data. Use these for analysis-ready examples.

The source-specific `import/` folders contain the raw data after import, before curation and harmonization. Use these tables to test data processing, cleaning, harmonization, and linkage workflows.

The archive is approximately 188 KB compressed and 668 KB uncompressed.

## Important limitations

- The files are mock data and must not be used for clinical or epidemiological conclusions.
- The archive does not include a complete data dictionary.
- Confirm how the data were generated and de-identified before sharing them outside an approved environment.
- Table names and structures may differ from production DALY-CARE data.

For background, see the [DALY-CARE methods summary](../methods/daly-care-data-resource-methods.md).
