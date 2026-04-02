import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './ui/ProtectedRoute'

// Pages
import Login from './pages/login/Login'
import SignUp from './pages/sign-up/SignUp'
import Dashboard from './pages/dashboard/Dashboard'
import RecipeDetails from './pages/recipe-details/RecipeDetails'
import MyRecipes from './pages/my-recipes/MyRecipes'
import Settings from './pages/settings-page/Settings'
import MealPlanner from './pages/meal-planner/MealPlanner'
import Pantry from './pages/pantry/Pantry'
import RecipeGenerator from './pages/recipe-generator/RecipeGenerator'
import ShoppingList from './pages/shopping-list/ShoppingList'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recipes"
                        element={
                            <ProtectedRoute>
                                <MyRecipes />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recipes/:id"
                        element={
                            <ProtectedRoute>
                                <RecipeDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/generate"
                        element={
                            <ProtectedRoute>
                                <RecipeGenerator />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/meal-plan"
                        element={
                            <ProtectedRoute>
                                <MealPlanner />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/pantry"
                        element={
                            <ProtectedRoute>
                                <Pantry />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/shopping-list"
                        element={
                            <ProtectedRoute>
                                <ShoppingList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />

                    {/* Default redirect */}
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />
                </Routes>
            </Router>

            {/* Toast */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#fff',
                        color: '#111827',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
        </AuthProvider>
    )
}

export default App
