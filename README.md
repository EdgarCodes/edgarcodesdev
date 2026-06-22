# edgar-codes

Personal portfolio website built with Go + React.

## Stack

- **Backend** — Go, Gin, PostgreSQL (pgx)
- **Frontend** — React, TypeScript, Vite, Tailwind CSS
- **Docs** — Swagger (`/api/swagger`)

## Development

**Requirements:** Go, Node.js, PostgreSQL

```bash
# Backend
cd backend
DBCONNECTION="postgres://..." go run main.go

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
```

The backend proxies all non-API traffic to the Vite dev server at `localhost:5173`.

## Production (Docker)

```bash
docker build -t edgarcodesdev .
docker run --env-file .env -p 5000:5000 edgarcodesdev
```

**.env variables:**

| Variable      | Description                  |
|---------------|------------------------------|
| `DBCONNECTION`| PostgreSQL connection string |
| `PORT`        | Server port (default `5000`) |
| `APPSTAGE`    | `DEV` or `PROD`              |

## API

Base path: `/api`

| Method | Endpoint       | Description       |
|--------|----------------|-------------------|
| GET    | `/api/health`  | Health check      |
| ...    | `/api/posts`   | Blog post routes  |
| ...    | `/api/projects`| Project routes    |

Full docs available at `/api/swagger` when running.
