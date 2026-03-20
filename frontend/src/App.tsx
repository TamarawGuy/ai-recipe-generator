import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'

// Pages
import Login from './pages/login/Login'
import SignUp from './pages/sign-up/SignUp'
import Dashboard from './pages/dashboard/Dashboard'
import RecipeDetails from './pages/recipe-details/RecipeDetails'
import MyRecipes from './pages/my-recipes/MyRecipes'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/recipes" element={<MyRecipes />} />
                    <Route path="/recipes/:id" element={<RecipeDetails />} />

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
