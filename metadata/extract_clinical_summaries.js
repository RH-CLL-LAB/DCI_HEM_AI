#!/usr/bin/env node

/**
 * Extract aggregate clinical metadata from the DALY-CARE atlas HTML.
 *
 * Usage:
 *   node metadata/extract_clinical_summaries.js
 *   node metadata/extract_clinical_summaries.js input.html output.md
 *
 * The script has no third-party dependencies. It reads the JSON object assigned
 * to `const DATA` in the HTML and writes summary-level Markdown. It never reads
 * patient-level data.
 */

const fs = require("fs");
const path = require("path");

const scriptDir = __dirname;
const inputPath = path.resolve(
  process.argv[2] || path.join(scriptDir, "DALYCARE_atlas_AOT_V31.html"),
);
const outputPath = path.resolve(
  process.argv[3] || path.join(scriptDir, "clinical_summaries.md"),
);

function extractJsonAssignment(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Could not find ${marker.trim()}`);

  const start = source.indexOf("{", markerIndex + marker.length);
  if (start < 0) throw new Error(`Could not find JSON object after ${marker.trim()}`);

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];

    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }

    if (char === '"') inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) return JSON.parse(source.slice(start, i + 1));
    }
  }

  throw new Error(`Unterminated JSON object after ${marker.trim()}`);
}

function formatNumber(value) {
  if (value === null || value === undefined) return "Not reported";
  return Number(value).toLocaleString("en-US");
}

function formatMillions(value) {
  return `${(Number(value) / 1_000_000).toFixed(1)}M`;
}

function escapeCell(value) {
  return String(value ?? "").replaceAll("|", "\\|").replaceAll("\n", " ");
}

function table(headers, rows, rightAligned = []) {
  const alignment = headers.map((_, index) =>
    rightAligned.includes(index) ? "---:" : "---",
  );
  return [
    `| ${headers.map(escapeCell).join(" | ")} |`,
    `|${alignment.join("|")}|`,
    ...rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`),
    "",
  ].join("\n");
}

function required(items, predicate, label) {
  const item = items.find(predicate);
  if (!item) throw new Error(`Required metadata not found: ${label}`);
  return item;
}

function optionalMatch(source, regex, fallback) {
  const match = source.match(regex);
  return match ? match[1] : fallback;
}

const html = fs.readFileSync(inputPath, "utf8");
const data = extractJsonAssignment(html, "const DATA = ");

const loaded = (name) =>
  required(data.loadedDatasets, (item) => item.name === name, name);
const resolved = (name) =>
  required(data.part4_resolved, (item) => item.name === name, name);

const patient = loaded("patient");
const vitals = loaded("SP_VitaleVaerdier");
const socialDataset = loaded("SP_Social_Hx");
const adt = resolved("SP_ADT_Haendelser");
const notes = resolved("SP_Journalnotater_del1");
const notesMetadata = resolved("SP_Journalnotater_del2");
const spImaging = resolved("SP_BilleddiagnostikeUndersoegelser_Del1");

const domainCounts = Object.create(null);
for (const item of data.resourceCatalog) {
  domainCounts[item.domain] = (domainCounts[item.domain] || 0) + 1;
}

const publishedCohort = optionalMatch(
  html,
  /covers <strong>([\d,]+)<\/strong> unique lymphoid-lineage cancer patients/,
  "65,774",
);
const profiledRows = optionalMatch(html, /· ([\d.]+M\+) rows profiled/, "618M+");
const databaseTables = optionalMatch(html, /· ([\d,]+) PostgreSQL tables/, "164");
const resolvedDatasets = optionalMatch(html, /PostgreSQL tables · ([\d,]+) resolved/, "63");

const lines = [];
const add = (...items) => lines.push(...items);

add(
  "# DALY-CARE Clinical Metadata Summaries",
  "",
  "This file extracts aggregate clinical metadata from [`DALYCARE_atlas_AOT_V31.html`](./DALYCARE_atlas_AOT_V31.html). It was generated with [`extract_clinical_summaries.js`](./extract_clinical_summaries.js). It contains dataset-level summaries only, not patient-level records. Counts have not been independently verified against the source database.",
  "",
  "## Atlas scope",
  "",
  table(
    ["Item", "Atlas summary"],
    [
      ["Catalogued datasets", data.resourceCatalog.length],
      ["Profiled or resolved datasets", resolvedDatasets],
      ["Database tables", databaseTables],
      ["Profiled rows", profiledRows],
      ["Patients in the atlas patient table", formatNumber(patient.rows)],
      ["Patients in the published 2025 cohort", publishedCohort],
    ],
    [1],
  ),
  "The atlas explains that the patient table is larger than the published cohort because it also contains precursor states, including MBL and MGUS, and broader administrative registrations.",
  "",
  "### Datasets by domain",
  "",
  table(
    ["Domain", "Datasets"],
    [
      ["Core", domainCounts.Core],
      ["Clinical quality registries (RKKP)", domainCounts.RKKP],
      ["Danish Health Data Authority (SDS)", domainCounts.SDS],
      ["Sundhedsplatformen EHR (SP)", domainCounts.SP],
      ["Laboratory and curated datasets", domainCounts.Laboratory],
    ],
    [1],
  ),
  "## Clinical-domain overview",
  "",
  table(
    ["Domain", "Main source", "Summary"],
    [
      ["Vital signs", "`SP_VitaleVaerdier`", `${formatMillions(vitals.rows)} longitudinal physiological measurements`],
      ["Social history", "`SP_Social_Hx`", `${formatNumber(socialDataset.rows)} smoking and alcohol-history entries`],
      ["Admissions and transfers", "`SP_ADT_Haendelser`", `${formatMillions(adt.rows)} admission, discharge, transfer, and ambulatory events`],
      ["Medical notes", "`SP_Journalnotater_del1/2`", "Free-text notes plus note metadata from the current and legacy EHR"],
      ["Medical imaging", "SDS procedures, DaMyDa, and SP imaging", "Procedure codes, disease-specific modalities, imaging orders, and report text"],
      ["Microbiology", "PERSIMUNE and SP blood-culture tables", "Analyses, cultures, microscopy, resistance testing, specimens, and susceptibility results"],
    ],
  ),
  "## Vital signs",
  "",
  `\`SP_VitaleVaerdier\` contains ${formatNumber(vitals.rows)} measurements. The most frequent descriptors in the embedded profile are:`,
  "",
  table(
    ["Descriptor", "Rows", "Patients", "Coverage"],
    data.vitalDescriptors.slice(0, 8).map((item) => [
      item.name,
      formatNumber(item.rows),
      formatNumber(item.patients),
      `${item.from} to ${item.to}`,
    ]),
    [1, 2],
  ),
  "### Anthropometrics",
  "",
  table(
    ["Measure", "Rows", "Patients", "Median", "P05-P95", "Observed range"],
    ["weight", "height"].map((name) => {
      const item = required(data.vitalDomains, (entry) => entry.domain === name, name);
      const unit = name === "weight" ? "kg" : "cm";
      return [
        name[0].toUpperCase() + name.slice(1),
        formatNumber(item.rows),
        formatNumber(item.patients),
        `${item.median} ${unit}`,
        `${item.p05}-${item.p95} ${unit}`,
        `${item.min}-${item.max} ${unit}`,
      ];
    }),
    [1, 2],
  ),
  "The extreme observed ranges indicate that plausibility filtering is required before analysis.",
  "",
  "## Social history",
  "",
  `\`SP_Social_Hx\` contains ${formatNumber(socialDataset.rows)} entries. The atlas reports scan-based categorical summaries rather than exact whole-table totals.`,
  "",
  "### Smoking status",
  "",
  table(
    ["Category", "Scanned records"],
    data.social.smoking.map((item) => [item.label, formatNumber(item.n)]),
    [1],
  ),
  `Pack-year information was non-missing in ${formatNumber(data.social.pack_years_non_missing)} records, corresponding to ${data.social.pack_years_pct}% of the social-history data.`,
  "",
  "### Alcohol status",
  "",
  table(
    ["Category", "Scanned records"],
    data.social.drinking.map((item) => [item.label, formatNumber(item.n)]),
    [1],
  ),
  "## Admissions, discharges, and transfers",
  "",
  `The resolved \`SP_ADT_Haendelser\` profile contains ${formatNumber(adt.rows)} events for ${formatNumber(adt.patients)} patients from ${adt.date_range}.`,
  "",
  table(
    ["Event type", "Events"],
    adt.events.map((item) => [item.label, formatNumber(item.n)]),
    [1],
  ),
  "### Admission characteristics",
  "",
  table(
    ["Classification", "Events"],
    [...adt.admission_type, ...adt.patient_class].map((item) => [item.label, formatNumber(item.n)]),
    [1],
  ),
  `The atlas also contains ${formatNumber(loaded("SP_ITAOphold").rows)} ICU stays. ADT events can be linked temporally to treatment plans, administered medication, vital signs, and medical notes using the shared patient identifier.`,
  "",
  "## Medical notes",
  "",
  `The resolved profile for \`SP_Journalnotater_del1\` contains ${formatNumber(notes.rows)} note rows for ${formatNumber(notes.patients)} patients, with coverage from ${notes.date_range}. The average note length is ${formatNumber(notes.text_stats.avg_chars)} characters and the recorded maximum is ${formatNumber(notes.text_stats.max_chars)} characters.`,
  "",
  `The separate \`SP_Journalnotater_del2\` metadata table contains ${formatNumber(notesMetadata.rows)} rows with coverage from ${notesMetadata.date_range}.`,
  "",
  table(
    ["Frequent note type", "Notes"],
    notes.note_types.slice(0, 6).map((item) => [item.label, formatNumber(item.n)]),
    [1],
  ),
  "The HTML's static card reports 11.4M+ notes for 22,708 patients, while the newer embedded resolved profile reports 12.3M rows for 29,892 patients. The difference should be reconciled before either figure is used in formal reporting.",
  "",
  "Free-text notes require controlled access and NLP processing. The atlas notes that cross-hospital generalizability remains under investigation.",
  "",
  "## Medical imaging",
  "",
  "The atlas describes three complementary imaging layers: nationwide UX-SKS procedure codes in SDS, disease-specific imaging fields in DaMyDa, and SP imaging-order metadata and report text from eastern Denmark.",
  "",
  table(
    ["Source", "Coverage summary"],
    [
      ["Published DALY-CARE paper", data.imaging.paper_total],
      ["SDS `t_sksube`", `${formatNumber(data.imaging.sksube_total)} procedure rows and ${formatNumber(data.imaging.sksube_distinct_codes)} distinct codes`],
      ["SP imaging metadata", `${formatNumber(spImaging.rows)} rows for ${formatNumber(spImaging.patients)} patients`],
    ],
  ),
  "### Frequent nationwide imaging and radiotherapy codes",
  "",
  table(
    ["Code", "Description", "Records"],
    data.imaging.ux_top.slice(0, 8).map((item) => [item.code, item.name, formatNumber(item.n)]),
    [2],
  ),
  "### DaMyDa imaging modalities",
  "",
  table(
    ["Modality", "Records"],
    data.imaging.damyda_modalities.map((item) => [item.label, formatNumber(item.n)]),
    [1],
  ),
  "These data describe imaging events and metadata, not stored image pixels. The SP report-text table requires separate handling and access controls.",
  "",
  "## Microbiology and infection data",
  "",
);

const microbiologyRows = [
  ["PERSIMUNE microbiology analyses", loaded("PERSIMUNE_microbiology_analysis").rows],
  ["PERSIMUNE cultures", loaded("PERSIMUNE_microbiology_culture").rows],
  ["PERSIMUNE resistance results", loaded("PERSIMUNE_microbiology_culture_resistance").rows],
  ["PERSIMUNE microscopy", loaded("PERSIMUNE_microbiology_microscopy").rows],
];
const bloodCultureRows = [1, 2, 3, 4].reduce(
  (sum, part) => sum + loaded(`SP_Bloddyrkning_del${part}`).rows,
  0,
);
microbiologyRows.push(["SP blood-culture workflow", bloodCultureRows]);

add(
  table(
    ["Dataset group", "Rows"],
    microbiologyRows.map(([name, rows]) => [name, formatNumber(rows)]),
    [1],
  ),
  "The PERSIMUNE data cover virology/PCR analyses, cultures, microscopy, susceptibility testing, specimen material, organism domain, result class, and contributing hospital or laboratory. The SP blood-culture tables cover specimens, identified organisms, clinical context, and antibiotic sensitivities.",
  "",
  "Common sample materials include swabs, blood, stool, airway secretions, EDTA blood, sputum, and bronchoalveolar lavage. Culture data are dominated by blood and urine cultures. Susceptibility results include standard susceptible, intermediate, and resistant classifications, alongside legacy numeric values that require harmonization.",
  "",
  "## Interpretation notes",
  "",
  "- These are aggregate atlas summaries, not a data dictionary or source-of-truth extract.",
  "- Some categorical frequencies were generated from scans of up to 100,000 rows and are not full-table totals.",
  "- Counts may differ between the static HTML display and newer metadata objects embedded in the same file.",
  "- Coverage varies by calendar period, region, and source system.",
  "- Missing or unresolved tables in the atlas should not automatically be interpreted as unavailable in every DALY-CARE environment.",
  "- Free-text notes, pathology reports, and imaging reports require specific access and governance controls.",
  "- Patient identifiers and row-level clinical data are intentionally not included in this summary.",
  "",
);

fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
console.log(`Wrote ${outputPath}`);
