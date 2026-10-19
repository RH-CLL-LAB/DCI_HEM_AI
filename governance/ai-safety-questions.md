# AI Safety and Governance Questions

## OpenAI accounts

- Which OpenAI account should we use: a personal account or a work account?
- Is it safe to use a personal OpenAI account for this work?

## Computing environment

- Can we run LLMs directly within NGC for DALY-CARE work, and what approvals and computing resources would be needed?
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

- Which DALY-CARE materials may we use with AI on a personal computer versus within NGC (e.g., mock data, aggregate summaries, unpublished results, or pseudonymized patient-level data)?
- What may be transferred from NGC to a personal computer or external AI service, and what anonymization, aggregation, or data minimization is required first?
- For AI tools used on a personal computer or within NGC, where are prompts, outputs, logs, and temporary files stored, can any data leave the environment, and how are retained copies deleted?

### Access and permissions

- Which project folders, tools, and network connections may AI agents access on a personal computer or within NGC, including any active remote sessions to NGC?
- Should agents start with read-only access, and which actions require human approval (e.g., changing analysis code, running jobs, transferring files, or deleting data)?

### Credentials

- How should we store NGC login credentials, GitHub tokens, and AI API keys so agents cannot read or expose them through files, environment variables, or active sessions?
- Where agent authentication is needed, which accounts and permissions are allowed, and how can their access be revoked?

### Untrusted content

- How should agents handle instructions embedded in DALY-CARE papers, metadata, repositories, or web pages that ask them to access files, run commands, or send data elsewhere?
- What review is required before running downloaded or AI-generated code on a personal computer or within NGC?

### Verification and incident response

- How should we test AI-generated analysis code with mock DALY-CARE data before using it with real data within NGC?
- Which checks are required for AI-generated cohort definitions, calculations, and research summaries before use, and how should code changes and analysis runs be recorded?
- If an agent exposes DALY-CARE data or makes an unauthorized change, who should we contact, and how do we stop the agent, revoke access, and recover affected files?
