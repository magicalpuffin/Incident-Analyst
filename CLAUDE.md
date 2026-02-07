# Incident Analyst (K8s Inspector Agent)

AI-powered chatbot for Kubernetes infrastructure log analysis and troubleshooting.

## Architecture

- **Frontend**: Next.js 14.1.0 (`frontend/`) — UI for submitting logs and viewing AI analysis
- **Backend**: FastAPI (`backend/`) — REST API connecting to AI services for log analysis
- **Communication**: Frontend connects to backend exclusively via REST API (no server actions, no tRPC)
- **AI**: Pattern-based analysis + You.com Search API for web-enhanced context

All frontend data fetching and mutations must go through the FastAPI backend at `http://localhost:8000`. Use `fetch` or a lightweight HTTP client in the frontend — do not use Next.js server actions or API routes as a proxy.

## Tech Stack

### Frontend
- Next.js 14, React 18, TypeScript
- Tailwind CSS v4 with `@tailwindcss/postcss` (use `@import "tailwindcss"` in globals.css, no tailwind.config.ts)
- shadcn/ui components
- Package manager: **pnpm**

### Backend
- FastAPI with Pydantic models
- Python dependency management: **uv** (pyproject.toml)
- File-based incident storage (incidents.json)
- You.com Search API integration (llm.py)

## Running Locally

```bash
# Backend
cd backend && uvicorn main:app --reload --port 8000

# Frontend
cd frontend && pnpm dev
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:8000`.

## Key Backend Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/incident` | Submit logs for AI analysis |
| POST | `/action` | Record a fix and re-evaluate |
| POST | `/resolve` | Mark incident as resolved |
| GET | `/incidents` | List all incidents |
| GET | `/incidents/{id}` | Get specific incident |
| DELETE | `/incidents/{id}` | Delete incident |

## Primary Feature

The core workflow is: user submits logs → AI analyzes for root causes → suggests fixes → user applies fix → AI re-evaluates. The system remembers past incidents to improve future analysis.

## MVP Scope

- Log submission and AI-powered troubleshooting (core feature)
- Incident history and similar incident matching
- Web-enhanced analysis via You.com Search API
- Connecting to live Kubernetes infrastructure is a stretch goal, not required for MVP

## Frontend Guidelines

- Use shadcn/ui components — install via `pnpm dlx shadcn@latest add <component>`
- Dark mode by default
- Keep UI minimalist
- All data fetching calls the FastAPI backend REST API (`http://localhost:8000`) — keep API helpers in `lib/api.ts`
- Do not use Next.js API routes (`app/api/`) or server actions — the backend is FastAPI
- shadcn components using `Slot.Root` from radix-ui need `React.ElementType` annotation to fix type errors with React 18.2 types

## Backend Guidelines

- All request/response models defined as Pydantic classes in `main.py`
- Incident memory managed in `memory.py` (file-based JSON storage)
- LLM/search logic in `llm.py`
- Keep API keys in environment variables, never hardcode in committed code
