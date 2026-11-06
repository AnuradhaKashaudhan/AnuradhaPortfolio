# Anuradha Kashaudhan – Developer Portfolio

A premium, full-stack developer portfolio showcasing AI/ML, Computer Vision, NLP, Generative AI, and full-stack projects.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS |
| Animations | Framer Motion |
| Routing | React Router v6 |
| Icons | Lucide React |
| Backend | Node.js + Express + TypeScript |
| Email | Nodemailer |

## Monorepo Structure

```
PortFolio/
├── client/          # React frontend (Vite + TypeScript + Tailwind)
├── server/          # Express backend (TypeScript)
├── package.json     # Root workspace config
└── README.md
```

## Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Install all dependencies
```bash
npm install
```

### Run the frontend (dev)
```bash
npm run dev
```

### Run the backend (dev)
```bash
npm run dev:server
```

### Run both (separate terminals)
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run dev:server
```

## Environment Variables

Copy `client/.env.example` and `server/.env.example` to `.env` in their respective folders and fill in the values. The contact endpoint uses `CLIENT_ORIGIN`, `SMTP_USER`, `SMTP_PASS`, `TO_EMAIL`, and `RECAPTCHA_SECRET_KEY`; no submitted messages are stored.

### Configure email

The default mail transport is Gmail. Enable 2-Step Verification on the Gmail account, create an **App Password** under Google Account → Security → App passwords, and put the generated 16-character value in `SMTP_PASS`. Set `SMTP_USER` to the Gmail address and `TO_EMAIL` to the inbox that should receive portfolio messages.

Alternatively, create a Resend account, generate an API key, set `RESEND_API_KEY`, and set `FROM_EMAIL` to a verified sender. Resend takes precedence over SMTP when configured. Never commit `.env` files or real credentials.

### Configure CAPTCHA

Create a Google reCAPTCHA v3 site and secret key, set `VITE_RECAPTCHA_SITE_KEY` in the client and `RECAPTCHA_SECRET_KEY` in the server. The server verifies the token before sending mail and rejects low-confidence scores. In production, the server refuses contact submissions when the secret is missing.

### Run backend tests

```bash
npm test --workspace=server
```

The tests cover invalid payloads, honeypot submissions, and the five-requests-per-15-minutes rate limit.

## Deployment

- Frontend: Vercel / Netlify
- Backend: Railway / Render

### Architecture

```text
Render Node web service (single origin)
   ├── Express + Helmet + rate limits
   │   ├── React + Vite production build and SPA routes
   │   ├── Nodemailer or Resend
   │   ├── Gemini portfolio assistant
   │   └── GitHub API (1-hour server cache)
```

### Advanced features

- Press `Ctrl/Cmd + K` to open the command palette.
- The assistant only receives the portfolio context defined by the server and refuses unrelated topics.
- GitHub activity is fetched server-side and cached for one hour.
- `/resume/general` shows `client/public/AnuradhaCVG.pdf`; `/resume/specialized` shows `client/public/AnuradhaCVS.pdf`. `/resume` remains an alias for the general resume.
- Replace the placeholder certificate and project artwork before production.
- Analytics are intentionally not enabled by default; Plausible/Vercel Analytics can be added without collecting personal data.

Deploy the monorepo as one Render Node web service with root directory `.`, build command `npm install --include=dev && npm run build:all`, and start command `npm start`. The Express server serves the production React build and API from the same origin. Set `NODE_ENV=production`; Render supplies `PORT`. Configure the email, CAPTCHA, Gemini, and GitHub variables from `server/.env.example` as needed. `VITE_API_URL` can remain empty for same-origin API calls.

## License

MIT © Anuradha Kashaudhan
