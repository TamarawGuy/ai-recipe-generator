import { useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import Logo from './components/Logo'
import InputField from './components/InputField'

const SignUp = () => {
    const { register } = useAuth()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const res = await register(name, email, password)

        if (res.success) {
            toast.success('Account created successfully!')
            navigate('/dashboard')
        } else {
            toast.error(res.message)
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Logo
                    title="Create Account"
                    description="Start your culinary journey with AI Recipe Generator"
                />

                {/* Sign Up Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <InputField
                            id="name"
                            label="Full Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            icon={<User className="w-5 h-5" />}
                        />

                        {/* Email */}
                        <InputField
                            id="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            icon={<Mail className="w-5 h-5" />}
                        />

                        {/* Password */}
                        <InputField
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            icon={<Lock className="w-5 h-5" />}
                        />

                        {/* Submit Button */}
                        <button
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
