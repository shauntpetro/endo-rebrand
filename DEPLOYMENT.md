# Deployment guide

The production service is deployed on Railway from the GitHub `main` branch.
Every push to `main` starts a new build and deployment.

## Local production check

```bash
npm install
npm test
npm run lint
npx tsc --noEmit
npm run build
npm start
```

Verify the ten public routes, `/robots.txt`, `/sitemap.xml`, the legacy
`/peptide` redirect, all three form paths, and the noindex `/form-response`
recovery page before promoting a deployment.

## Railway variables

Configure these in the service **Variables** tab:

```text
NEXT_PUBLIC_SITE_URL=https://<approved-production-domain>
NEXT_PUBLIC_CONTACT_EMAIL=<approved-public-contact-mailbox>
RESEND_API_KEY=<verified-resend-key>
FORM_FROM_EMAIL=<mailbox-on-the-verified-sender-domain>
FORM_TO_EMAIL=<authorized-monitored-destination>

# Optional analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Optional error reporting
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=
```

All four form-delivery values are required. The application validates the
three mailbox variables, uses `FORM_FROM_EMAIL` for the verified Resend sender,
delivers every form to `FORM_TO_EMAIL`, and shows
`NEXT_PUBLIC_CONTACT_EMAIL` only as the public recovery inbox. Enter plain
mailbox addresses—never `Display Name <address>` values. Forms intentionally
fail closed if any delivery value is missing or invalid. Do not use a
placeholder or replacement domain that has not been approved and verified.

The application limiter is a bounded, process-local backstop shared by Contact,
Investor, and company-update submissions. Before scaling Railway beyond one
replica, add a trusted edge or distributed limiter so the five-requests-per-
minute policy is enforced across every process. Railway must overwrite
`X-Real-IP`; do not trust a client-supplied forwarding header at an untrusted
proxy boundary.

Browser submissions abort after 12 seconds and provider delivery aborts after
eight seconds. Logical retries use a privacy-safe provider idempotency key so a
lost response does not create duplicate internal email. Telemetry records only
the URL origin and path; query strings and fragments are removed before
PostHog or client Sentry capture.

The three forms are progressively enhanced. Hydrated clients submit JSON and
receive JSON; native browser submissions use
`application/x-www-form-urlencoded`, retain the same 32 KiB limit and security
checks, and receive a `303` to `/form-response`. Redirect URLs use fixed status
values and never contain submitted form fields. The response page is noindex
and applies a no-referrer policy.

## Domain cutover

1. Confirm the approved canonical host and authorized public inbox.
2. Add that host to Railway’s service domain settings.
3. Set `NEXT_PUBLIC_SITE_URL` to the exact HTTPS origin, without a trailing
   slash.
4. Point the required DNS records to Railway.
5. If replacing the established `www.endocyclictherapeutics.com` site, preserve
   the `www` host and verify the permanent `/peptide` → `/innovation` redirect.
6. Rebuild after the variable and domain changes.
7. Confirm that canonical tags, Open Graph URLs, JSON-LD, `robots.txt`, and
   `sitemap.xml` all use the approved host.

## Production smoke test

- Submit one valid Contact inquiry.
- Submit one Investor/data-room request.
- Submit one company-updates request.
- Confirm delivery at the authorized inbox and verify that no personal data is
  written to Railway logs.
- Confirm rejected responses include `Cache-Control: no-store`, rate-limited
  JSON responses include `Retry-After`, native URL-encoded submissions return a
  privacy-safe `303`, and unsupported content types return HTTP 415.
- Temporarily remove one form-delivery variable and confirm valid submissions
  fail closed with HTTP 503 and do not call the email provider; restore the
  variable before promotion.
- Check mobile navigation, keyboard focus, reduced-motion behavior, and the
  responsive Pipeline/portfolio views.
- Run Lighthouse against Home, Pipeline, Investors, Media, and Contact.

## Rollback

Use Railway’s deployment history to redeploy the last known-good build. If the
custom-domain cutover itself fails, restore the prior DNS records while the
application deployment remains available at its Railway service URL.
