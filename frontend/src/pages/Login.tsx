import { useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { ChefHat, Mail, Lock } from 'lucide-react'
import InputField from './components/InputField'

const Logo = () => {
    return (
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4">
                <ChefHat className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">
                Sign in to continue to AI Recipe Generator
            </p>
        </div>
    )
}

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        const result = await login(email, password)
        if (result.success) {
            toast.success('Welcome Back!')
            navigate('/dashboard')
        } else {
            toast.error(result.message)
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Logo />

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        icon={<Mail className="w-5 h-5" />}
                    />

                    <InputField
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        icon={<Lock className="w-5 h-5" />}
                    />

                    <div className="flex items-center justify-end">
                        <Link
                            to="/reset-password"
                            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
