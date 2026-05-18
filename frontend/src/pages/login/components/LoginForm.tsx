import { useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Mail, Lock } from 'lucide-react'
import InputField from '../../../ui/InputField'
import { useAuth } from '../../../context/AuthContext'

const LoginForm = () => {
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
            toast.error(result.message || 'Invalid email or password')
        }

        setLoading(false)
    }

    return (
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
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {loading ? 'Signing In... ' : 'Sign In'}
            </button>
        </form>
    )
}

export default LoginForm
