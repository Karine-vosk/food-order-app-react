# food-order-app-react

A React food order app with a Vite frontend and Express backend (or Vercel serverless API).

## Local development

**Start everything (backend + frontend) with one command:**

```bash
npm install
npm start
```

- **Frontend:** http://localhost:5173  
- **Backend API:** http://localhost:3000  

The Vite dev server proxies `/api` requests to the backend, so no `.env` is required.

**Other scripts:**

| Command | Description |
|---------|-------------|
| `npm start` | Start backend and frontend together |
| `npm run dev` | Frontend only (run backend separately with `npm run start:backend`) |
| `npm run start:backend` | Backend only |
| `npm run build` | Build for production |

## Deploy to Vercel

1. Push your code to GitHub (or connect another Git provider).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New** → **Project** and import this repository.
4. Vercel will use the root `package.json` and `vercel.json`. Click **Deploy**.
5. Your app will be live at `https://<your-project>.vercel.app`.

**Note:** Orders submitted on Vercel are stored in memory only and are lost when the serverless function restarts. For persistent orders, add a database (e.g. Vercel Postgres or Vercel KV).
