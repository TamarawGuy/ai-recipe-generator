# Frontend — AI Recipe Generator

React + TypeScript single-page application for AI-powered recipe generation, meal planning, pantry tracking, and shopping lists.

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** — build tool and dev server
- **Tailwind CSS 4** — utility-first styling (via `@tailwindcss/vite` plugin)
- **React Router 7** — client-side routing
- **Axios** — HTTP client with interceptors
- **Lucide React** — icon library
- **react-hot-toast** — toast notifications
- **date-fns** — date formatting and manipulation
- **@dnd-kit** — drag-and-drop for meal planner

## Getting Started

### Prerequisites

- Node.js v18+
- Backend server running (see `../backend/README.md`)

### Install & Run

```bash
npm install
npm run dev
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### Available Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start Vite dev server (port 5173)   |
| `npm run build`   | TypeScript check + production build |
| `npm run lint`    | Run ESLint                          |
| `npm run preview` | Preview production build locally    |

## Project Structure

```
src/
├── main.tsx                        # React root entry point
├── App.tsx                         # Router configuration
├── index.css                       # Tailwind imports & global styles
├── context/
│   └── AuthContext.tsx              # Auth state, login/register/logout
├── services/
│   └── api.ts                      # Axios instance with JWT interceptor
├── ui/
│   ├── InputField.tsx              # Reusable form input with icon
│   └── ProtectedRoute.tsx          # Route guard (redirects to /login)
└── pages/
    ├── login/                      # Login form
    ├── sign-up/                    # Registration form
    ├── dashboard/                  # Stats, recent recipes, upcoming meals
    │   └── components/
    │       ├── StatCard.tsx
    │       └── Header.tsx
    ├── recipe-generator/           # AI recipe generation form & results
    ├── my-recipes/                 # Recipe collection with search & filters
    │   └── components/
    │       └── RecipeCard.tsx
    ├── recipe-details/             # Full recipe view with servings adjuster
    ├── pantry/                     # Ingredient inventory management
    ├── meal-planner/               # Weekly calendar with meal slots
    ├── shopping-list/              # Categorized shopping list with check-off
    ├── settings-page/              # Profile, password, preferences, account deletion
    └── shared/
        ├── Navbar.tsx              # Sticky nav with user dropdown
        └── Logo.tsx                # Auth page branding
```

## Pages

| Page             | Route            | Description                                                                                           |
| ---------------- | ---------------- | ----------------------------------------------------------------------------------------------------- |
| Login            | `/login`         | Email/password authentication                                                                         |
| Sign Up          | `/signup`        | New user registration                                                                                 |
| Dashboard        | `/dashboard`     | Overview stats, recent recipes, upcoming meals                                                        |
| Recipe Generator | `/generate`      | AI-powered recipe creation with ingredient selection, dietary options, cuisine type, and cooking time |
| My Recipes       | `/recipes`       | Saved recipe collection with search, cuisine/difficulty filters                                       |
| Recipe Details   | `/recipes/:id`   | Full recipe with adjustable servings, ingredient checklist, nutrition info                            |
| Pantry           | `/pantry`        | Ingredient inventory with categories, expiry alerts, and low-stock indicators                         |
| Meal Planner     | `/meal-plan`     | 7-day calendar grid (breakfast/lunch/dinner) with week navigation                                     |
| Shopping List    | `/shopping-list` | Items grouped by category, check-off, add-to-pantry, auto-generate from meal plan                     |
| Settings         | `/settings`      | Profile editing, password change, dietary/cuisine preferences, account deletion                       |

## Authentication Flow

1. User logs in or registers via `/login` or `/signup`
2. JWT token and user object are stored in `localStorage`
3. `AuthContext` provides auth state to all components via `useAuth()` hook
4. Axios request interceptor attaches `Authorization: Bearer <token>` to all API calls
5. On 401 response, the interceptor clears auth state and redirects to `/login`
6. `ProtectedRoute` component guards all authenticated pages

## Styling

- **Tailwind CSS 4** configured via `@tailwindcss/vite` plugin (no separate config file)
- **Color scheme**: Emerald primary palette, gray neutrals
- **Font**: Inter (imported from Google Fonts)
- Custom CSS variables defined in `index.css` base layer
- Light theme only
