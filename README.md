# CSAD Website

Public marketing site for the **Centre for Skills Acquisition and Development**, deployed at
`csad.fedpolyado.edu.ng`.

This is a standalone React + Vite single-page app with no backend — it does not talk to the
CSAD portal at all. Every "Log in" / "Student Login" / "Staff Login" action is a plain link out
to the portal (`csadportal.com`), where the actual login, onboarding, payments, exams etc. live.

## Develop

```bash
npm install
npm run dev
```

## Configure

`VITE_PORTAL_URL` controls where the login links point. Defaults to `https://csadportal.com`.
Set it in `.env` for local development (e.g. `http://localhost:8000` while testing against a
local copy of the portal).

## Build

```bash
npm run build
```

Outputs a static site to `dist/` — deployable to any static host (Nginx, Vercel, Netlify, S3 +
CloudFront, etc.) at `csad.fedpolyado.edu.ng`.
