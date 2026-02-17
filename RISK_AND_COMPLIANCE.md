# RISK_AND_COMPLIANCE

## Core disclaimer language

Learneum Credits are educational incentives and **not guaranteed income**, salary, or investment return.

## Minors and age gating

- ask age band during onboarding.
- if under threshold age, default privacy-safe mode:
  - no public profile discoverability,
  - limited community exposure,
  - sensitive tracking disabled by default.

## Privacy and data minimization

- collect only required onboarding and learning telemetry.
- provide interest/profile controls in app.
- make data export/deletion workflows available.

## Regulatory awareness

- COPPA: parental notice/consent path for children as required.
- FERPA: education record safeguards for school deployments.
- GDPR/UK GDPR: legal basis, rights handling, DPA records, retention limits.

## Security controls

- JWT auth with expiration and rotation roadmap.
- validation + rate limiting + audit logs.
- no private keys in plaintext (future real-wallet phase).

## Abuse prevention

- anti-spam limits on posts/comments.
- watch-event anti-fraud checks for duplicate completion loops.
- moderation queue for community content and mentor channels.
