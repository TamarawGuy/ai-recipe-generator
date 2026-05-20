import { useState, type SubmitEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { User, Mail, Lock } from 'lucide-react'

import InputField from '../../../ui/InputField'

import { useAuth } from '../../../context/AuthContext'

const validatePassword = (password: string): string | undefined => {
    if (password.length < 6) {
        return 'Password must be at least 6 characters'
    }
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain an uppercase letter'
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        return 'Password must contain a special character'
    }
    return undefined
}

const SignUpForm = () => {
    const { register } = useAuth()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<{ password?: string }>({})
    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const passwordError = validatePassword(password)
        if (passwordError) {
            setErrors({ password: passwordError })
            return
        }
        setErrors({})

        setLoading(true)

        const res = await register(name, email, password)

        if (res.success) {
            toast.success('Account created successfully!')
            navigate('/dashboard')
        } else {
            toast.error(res.message || 'Failed to create account')
        }

        setLoading(false)
    }

    return (
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
                    error={errors.password}
                />

                {/* Submit Button */}
                <button
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 cursor-pointer"
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
    )
}

export default SignUpForm
