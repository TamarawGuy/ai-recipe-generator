# AI Recipe Generator

A full-stack web application that uses AI to generate personalized recipes based on your ingredients, dietary preferences, and cuisine choices. Includes meal planning, pantry tracking, and smart shopping lists.

## Features

- **AI Recipe Generation** — Generate recipes using Google Gemini AI based on selected ingredients, dietary restrictions, cuisine type, and cooking time
- **Pantry Management** — Track your ingredients with quantities, categories, and expiry dates. Get alerts for items expiring soon
- **Meal Planner** — Plan your weekly meals with a calendar view. Drag and drop recipes into breakfast, lunch, and dinner slots
- **Smart Shopping Lists** — Auto-generate shopping lists from your meal plan, check off items as you shop, and add purchased items directly to your pantry
- **Recipe Collection** — Save, search, and filter your generated recipes by cuisine, difficulty, dietary tags, and cook time
- **User Preferences** — Set dietary restrictions, allergies, preferred cuisines, and default serving sizes to personalize recipe generation

## Tech Stack

**Frontend:**
- React 19, TypeScript, Vite 7
- Tailwind CSS 4
- React Router 7
- dnd-kit (drag-and-drop)

**Backend:**
- Node.js, Express 5
- PostgreSQL (Neon)
- JWT authentication
- Google Gemini AI (`gemini-2.5-flash`)

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database (or a [Neon](https://neon.tech) account)
- [Google AI Studio](https://aistudio.google.com) API key for Gemini

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/ai-recipe-generator.git
   cd ai-recipe-generator
   ```

2. **Backend setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in `backend/`:

   ```env
   PORT=5000
   DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
   JWT_SECRET=your-secret-key
   GEMINI_API_KEY=your-gemini-api-key
   NODE_ENV=development
   ```

   Run the database migration:

   ```bash
   node migrate.js
   ```

3. **Frontend setup**

   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file in `frontend/`:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the App

Start the backend and frontend in separate terminals:

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend API at `http://localhost:5000`.

## Project Structure

```
ai-recipe-generator/
├── backend/
│   ├── config/         # Database connection and schema
│   ├── controllers/    # Route handlers
│   ├── middleware/      # JWT auth middleware
│   ├── models/         # Database queries (raw SQL)
│   ├── routes/         # Express route definitions
│   ├── utils/          # Gemini AI integration
│   └── server.js       # App entry point
├── frontend/
│   └── src/
│       ├── components/ # Shared UI components
│       ├── context/    # React context (auth state)
│       ├── pages/      # Page components
│       └── services/   # Axios API client
```

## API Endpoints

| Group | Base Path | Description |
|-------|-----------|-------------|
| Auth | `/api/auth` | Sign up, log in, current user |
| Users | `/api/users` | Profile, preferences, password |
| Recipes | `/api/recipes` | CRUD, AI generation, suggestions |
| Pantry | `/api/pantry` | CRUD, stats, expiring items |
| Meal Plans | `/api/meal-plans` | Weekly view, CRUD |
| Shopping List | `/api/shopping-list` | CRUD, generate from plan, add to pantry |

All endpoints except auth require a valid JWT token.

## License

MIT
