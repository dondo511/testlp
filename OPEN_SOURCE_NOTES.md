# Open-source implementation notes

## Recommended production base

For a full rebuild, the closest permissively licensed public architecture reviewed was:

`syntax-syndicate/influencer-platform-saas`

Useful pieces to adapt:
- campaign CRUD and budgets
- creator/influencer role
- deliverable submission/review workflow
- admin controls
- payment ledger concepts
- analytics/dashboard structure

Before production use, independently audit dependencies and current license terms.

## Demo architecture

The current prototype is intentionally static:
- HTML/CSS/JavaScript
- localStorage state
- fictional brands and campaign data
- manual simulated view verification
- no secrets
- no backend
- no real money movement

This makes the business workflow easy to test before committing to infrastructure.
