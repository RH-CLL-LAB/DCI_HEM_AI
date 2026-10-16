# AI Safety and Governance Questions

## OpenAI accounts

- Which OpenAI account should we use: a personal account or a work account?
- Is it safe to use a personal OpenAI account for this work?

## Computing environment

- When should we use a cloud environment, and when should we use a local environment?
- If we run models locally, should they run inside Docker?
- Should we use a virtual server for local or remote agents?
- How would a virtual-server setup affect security and scalability?

## Burner laptop

- How should the burner laptop be configured?
- Which accounts are safe to access from the burner laptop, and which should not be used on it?
- Is it safe to install and use a password manager on the burner laptop?
- Is it safe to sign in to GitHub, Gmail, Spotify, or institutional email on the burner laptop?

## Mobile devices

- Is it safe to run AI agents or LLM applications on a phone that also has access to work email?

## Maintenance

- Should automated cache cleanup be scheduled?

## Additional safety questions

### Sensitive data

- Which types of data may be entered into an AI system?
- May the AI process patient-level, pseudonymized, confidential, or unpublished research data?
- Must data be anonymized or minimized before use?
- Where are prompts, uploaded files, outputs, logs, and temporary files stored?
- How long is the data retained, and how can it be deleted?

### Access and permissions

- Which files, applications, websites, and networks may the AI access?
- Should the AI operate with read-only access by default?
- Which actions always require human approval, such as sending emails, uploading files, changing permissions, or deleting data?
- How are connected applications and permissions reviewed and revoked?

### Credentials

- How should API keys, passwords, access tokens, and recovery codes be stored?
- Can the AI read environment variables, browser sessions, or password-manager data?
- Should agents use separate, limited accounts and short-lived credentials?
- What is the procedure for rotating or revoking exposed credentials?

### Untrusted content

- How should the AI handle instructions found inside emails, websites, PDFs, documents, or code repositories?
- What should happen if the AI detects a possible prompt-injection or phishing attempt?
- Are downloaded files and generated code reviewed before they are opened or executed?

### Verification and incident response

- Which AI-generated results require human verification?
- How should references, calculations, analyses, and code be validated?
- Are agent actions logged and auditable?
- What should be done if confidential information is accidentally disclosed?
- Is there a procedure for stopping agents, revoking access, restoring backups, and reporting incidents?
- Should agents be tested with mock data before they receive access to real systems?
