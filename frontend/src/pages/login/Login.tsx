import { Link } from 'react-router-dom'
import Logo from '../../shared/Logo'
import LoginForm from './components/LoginForm'

const SignUpLink = () => {
    return (
        <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link
                to="/signup"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
                Sign Up
            </Link>
        </p>
    )
}

const Login = () => {
    return (
        <main className="min-h-screen bg-linear-to-br from-emerald-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Logo
                    title="Welcome Back!"
                    description="Sign in to continue to AI Recipe Generator"
                />

                {/* Login Form */}
                <LoginForm />

                {/* Sign Up Link */}
                <SignUpLink />
            </div>
        </main>
    )
}

export default Login
