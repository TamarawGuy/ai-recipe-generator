import Logo from '../../shared/Logo'
import SignUpForm from './components/SignUpForm'

const SignUp = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Logo
                    title="Create Account"
                    description="Start your culinary journey with AI Recipe Generator"
                />

                {/* Sign Up Form */}
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignUp
