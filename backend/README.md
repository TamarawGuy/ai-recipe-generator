# Backend — AI Recipe Generator

Node.js REST API powering the AI Recipe Generator. Handles authentication, recipe generation via Google Gemini AI, and all CRUD operations for recipes, pantry, meal plans, and shopping lists.

## Tech Stack

- **Node.js** (ES Modules)
- **Express 5** — HTTP framework
- **PostgreSQL** via `pg` — raw SQL with connection pooling
- **JWT** (`jsonwebtoken`) — token-based authentication
- **bcryptjs** — password hashing
- **Google Generative AI** (`@google/genai`) — Gemini 2.5 Flash for recipe generation

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL database (or a [Neon](https://neon.tech) account)
- [Google AI Studio](https://aistudio.google.com) API key

### Install & Run

```bash
npm install
node migrate.js   # Initialize database schema
npm run dev        # Start with auto-reload (nodemon)
```

### Environment Variables

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
NODE_ENV=development
```

### Available Scripts

| Command           | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start with nodemon (auto-reload on changes) |
| `npm start`       | Production start (`node server.js`)         |
| `node migrate.js` | Run database schema migration               |

## Project Structure

```
backend/
├── server.js               # Express app setup, middleware, route mounting
├── migrate.js              # Database migration runner
├── config/
│   ├── db.js               # PostgreSQL pool connection (SSL-enabled)
│   └── schema.sql          # Full database schema (8 tables)
├── middleware/
│   └── auth.js             # JWT verification middleware
├── routes/
│   ├── auth.js             # /api/auth — signup, login, me
│   ├── user.js             # /api/users — profile, preferences, password
│   ├── recipes.js          # /api/recipes — CRUD, AI generation
│   ├── pantry.js           # /api/pantry — CRUD, stats, expiring
│   ├── mealPlans.js        # /api/meal-plans — weekly, upcoming, CRUD
│   └── shoppingList.js     # /api/shopping-list — CRUD, generate, pantry sync
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── recipeController.js
│   ├── pantryController.js
│   ├── mealPlanController.js
│   └── shoppingListController.js
├── models/
│   ├── User.js             # User CRUD, password hashing/verification
│   ├── UserPreferences.js  # Upsert preferences (dietary, allergies, cuisines)
│   ├── Recipe.js           # Recipe CRUD with ingredients & nutrition (transactional)
│   ├── PantryItem.js       # Pantry CRUD with dynamic filtering
│   ├── MealPlan.js         # Meal plan CRUD with upsert behavior
│   └── ShoppingList.js     # Shopping list with meal plan generation & pantry sync
└── utils/
    └── gemini.js           # Gemini AI: generateRecipe, generatePantrySuggestions, generateCookingTips
```

## API Endpoints

All endpoints except auth return `{ success, message, data }`. Protected routes require `Authorization: Bearer <token>` header.

### Auth (`/api/auth`)

| Method | Endpoint          | Auth | Description                                |
| ------ | ----------------- | ---- | ------------------------------------------ |
| POST   | `/signup`         | No   | Register user (returns JWT, 30-day expiry) |
| POST   | `/login`          | No   | Login (returns JWT)                        |
| POST   | `/reset-password` | No   | Password reset (placeholder)               |
| GET    | `/me`             | Yes  | Get current user                           |

### Users (`/api/users`)

| Method | Endpoint           | Description                                                       |
| ------ | ------------------ | ----------------------------------------------------------------- |
| GET    | `/profile`         | Get profile + preferences                                         |
| PUT    | `/profile`         | Update name/email                                                 |
| PUT    | `/preferences`     | Update dietary restrictions, allergies, cuisines, servings, units |
| PUT    | `/change-password` | Change password (requires current password)                       |
| DELETE | `/account`         | Delete account (cascades all data)                                |

### Recipes (`/api/recipes`)

| Method | Endpoint       | Description                                                                                                        |
| ------ | -------------- | ------------------------------------------------------------------------------------------------------------------ |
| POST   | `/generate`    | AI recipe generation (ingredients, dietary, cuisine, servings, time)                                               |
| GET    | `/suggestions` | AI suggestions based on pantry items (prioritizes expiring)                                                        |
| GET    | `/`            | List recipes (filters: search, cuisine_type, difficulty, dietary_tag, max_cook_time; supports sort, limit, offset) |
| GET    | `/recent`      | Recent recipes (query: `?limit=N`)                                                                                 |
| GET    | `/stats`       | Recipe statistics (total, cuisine count, avg cook time)                                                            |
| GET    | `/:id`         | Recipe with ingredients and nutrition                                                                              |
| POST   | `/`            | Save recipe (transactional: recipe + ingredients + nutrition)                                                      |
| PUT    | `/:id`         | Update recipe metadata                                                                                             |
| DELETE | `/:id`         | Delete recipe (cascades ingredients + nutrition)                                                                   |

### Pantry (`/api/pantry`)

| Method | Endpoint         | Description                                                            |
| ------ | ---------------- | ---------------------------------------------------------------------- |
| GET    | `/`              | List items (filters: category, is_running_low, search)                 |
| GET    | `/stats`         | Stats (total, categories, running low, expiring soon)                  |
| GET    | `/expiring-soon` | Items expiring within N days (query: `?days=7`)                        |
| POST   | `/`              | Add item (name, quantity, unit, category, expiry_date, is_running_low) |
| PUT    | `/:id`           | Update item                                                            |
| DELETE | `/:id`           | Delete item                                                            |

### Meal Plans (`/api/meal-plans`)

| Method | Endpoint    | Description                                   |
| ------ | ----------- | --------------------------------------------- |
| POST   | `/`         | Add meal (upserts if date+type exists)        |
| GET    | `/weekly`   | Weekly plan (query: `?start_date=YYYY-MM-DD`) |
| GET    | `/upcoming` | Upcoming meals (query: `?limit=N`)            |
| GET    | `/stats`    | Stats (total planned, meals this week)        |
| DELETE | `/:id`      | Remove meal from plan                         |

### Shopping List (`/api/shopping-list`)

| Method | Endpoint         | Description                                                |
| ------ | ---------------- | ---------------------------------------------------------- |
| GET    | `/`              | Get list (query: `?grouped=true` for category grouping)    |
| POST   | `/generate`      | Auto-generate from meal plan (subtracts pantry quantities) |
| POST   | `/`              | Add manual item                                            |
| PUT    | `/:id`           | Update item                                                |
| PUT    | `/:id/toggle`    | Toggle checked status                                      |
| DELETE | `/:id`           | Delete item                                                |
| DELETE | `/clear/checked` | Clear all checked items                                    |
| DELETE | `/clear/all`     | Clear entire list                                          |
| POST   | `/add-to-pantry` | Move checked items to pantry (transactional)               |

## Database

### Schema Overview

8 tables with UUID primary keys, cascading deletes, and auto-updating timestamps:

| Table                 | Purpose                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| `users`               | User accounts (email, password_hash, name)                                  |
| `user_preferences`    | Dietary restrictions, allergies, cuisines, servings, units (1:1 with users) |
| `pantry_items`        | Ingredient inventory with category, quantity, expiry date                   |
| `recipes`             | Saved recipes with instructions (JSONB), dietary_tags (array)               |
| `recipe_ingredients`  | Recipe ingredient list (many-to-one with recipes)                           |
| `recipe_nutrition`    | Calories, protein, carbs, fats, fiber (1:1 with recipes)                    |
| `meal_plans`          | Scheduled meals (unique per user+date+meal_type)                            |
| `shopping_list_items` | Shopping items with checked status and meal plan origin flag                |

### Key Design Decisions

- **Raw SQL** over ORM — all queries use parameterized SQL via `pg` pool
- **Transactions** for multi-table writes (recipe creation, shopping list generation, add-to-pantry)
- **UPSERT** for meal plans (`ON CONFLICT ... DO UPDATE`) and user preferences
- **Dynamic query building** for filtered endpoints (pantry, recipes) with parameterized inputs
- **`json_agg`** for grouped shopping list responses

### Running Migrations

```bash
node migrate.js
```

This executes `config/schema.sql` against the configured database. Uses `CREATE TABLE IF NOT EXISTS` so it's safe to run multiple times.

## AI Integration

The `utils/gemini.js` module wraps Google Gemini 2.5 Flash:

| Function                                                | Description                                                                                                                                                                      |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateRecipe(options)`                               | Full recipe generation from ingredients, dietary restrictions, cuisine, servings, and cooking time. Returns structured JSON with ingredients, instructions, nutrition, and tips. |
| `generatePantrySuggestions(pantryItems, expiringItems)` | Returns 3 recipe ideas based on available pantry items, prioritizing ingredients expiring soon.                                                                                  |
| `generateCookingTips(recipe)`                           | Returns 3-5 cooking tips for a specific recipe.                                                                                                                                  |

All functions return parsed JSON. Responses are cleaned of markdown code block wrappers before parsing.
