# ClipperHub Demo

A lightweight proof-of-concept for a controlled iGaming clipping/distribution marketplace.

## Demo roles

- **Clipper** — browse campaigns, claim briefs, submit public clip URLs, track approval and demo earnings.
- **Brand** — view campaign performance, create a campaign brief, inspect submissions and creators.
- **Admin** — review submissions, enter verified views, approve/reject clips and see compliance checks.

## Run locally

No build step is required. Open `index.html` in a browser.

The demo stores changes in browser `localStorage`. It does not connect to a database, payment provider or social-network API.

## Production path

A production MVP should replace browser storage with Supabase/Postgres, add authentication and role-based access, campaign asset storage, moderation/audit logs, verified analytics imports, payout ledgers and jurisdiction-specific compliance controls.

## Open-source references

The workflow was informed by public creator/influencer marketplace projects, especially:

- `syntax-syndicate/influencer-platform-saas` — MIT-licensed Next.js marketplace architecture with brand, influencer, deliverable and admin flows.
- `PeterAdedokun1/8x-creator-app` — public creator campaign demo that illustrates a lightweight campaign → submission → approval flow. Its repository did not expose a LICENSE file when reviewed, so no code from it was copied into this demo.

This repository's demo implementation was written separately as a dependency-free prototype.

## Compliance scope

The prototype is intended for lawful campaigns by licensed operators in eligible jurisdictions. It intentionally does not implement bot engagement, account farming, automated spam posting, age/geo circumvention or guaranteed-win claims.
