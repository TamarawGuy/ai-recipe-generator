# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack AI recipe generator with meal planning, pantry tracking, and shopping lists. Uses Gemini AI (gemini-2.5-flash) for recipe generation and pantry-based suggestions.

## Commands

### Frontend (`/frontend`)
- `npm run dev` — Start Vite dev server
- `npm run build` — TypeScript check + Vite build
- `npm run lint` — ESLint

### Backend (`/backend`)
- `npm run dev` — Start with nodemon (auto-reload)
- `npm start` — Production start (`node server.js`)
- `node migrate.js` — Run database migrations (`config/schema.sql`)

No test suite is configured for either package.

## Architecture

**Monorepo** with two independent packages (no workspace manager):
- `frontend/` — React 19 + TypeScript + Vite 7 + Tailwind CSS 4 + React Router 7
- `backend/` — Express 5 + PostgreSQL (Neon) via raw SQL (`pg` pool) + JWT auth

### Backend (Node.js, ES Modules)

MVC-style layout: `routes/` → `controllers/` → `models/` (raw SQL queries against `pg` pool). No ORM — all database access uses parameterized SQL in model files.

- `config/db.js` — pg Pool with SSL
- `config/schema.sql` — Full schema (8 tables, UUIDs, cascading deletes, triggers)
- `middleware/auth.js` — JWT verification middleware
- `utils/gemini.js` — Gemini AI integration (`generateRecipe`, `generatePantrySuggestions`, `generateCookingTips`)

All API routes are under `/api` and return `{ success, message, data }`. All routes except auth are protected by JWT middleware.

### Frontend (React + TypeScript)

- `src/context/AuthContext.tsx` — Auth state (user, token in localStorage)
- `src/services/api.ts` — Axios instance with JWT interceptor; 401s trigger auto-logout
- `src/components/ProtectedRoute.tsx` — Route guard
- Pages: Dashboard, RecipeGenerator, MyRecipes, RecipeDetails, MealPlanner, Pantry, ShoppingList, Settings

### Key API route groups
`/api/auth` (signup, login, me) · `/api/users` (profile, preferences, password) · `/api/recipes` (CRUD + AI generate/suggestions) · `/api/pantry` (CRUD + stats + expiring-soon) · `/api/meal-plans` (weekly, upcoming, CRUD) · `/api/shopping-list` (CRUD + generate from meal plan + add-to-pantry)

## Code Style

- **Backend**: Single quotes, no semicolons, 4-space indent (`.prettierrc`)
- **Frontend**: ESLint with typescript-eslint + react-hooks + react-refresh rules
