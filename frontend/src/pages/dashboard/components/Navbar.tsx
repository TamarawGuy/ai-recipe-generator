import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import {
    ChefHat,
    Home,
    UtensilsCrossed,
    Calendar,
    ShoppingCart,
    LogOut,
} from 'lucide-react'

type NavLinkProps = {
    to: string
    label: string
    icon: React.ReactNode
}

const NavLink = ({ to, label, icon }: NavLinkProps) => {
    return (
        <Link
            to={to}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
        >
            {icon}
            <span>{label}</span>
        </Link>
    )
}

const navConfig = [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/pantry', label: 'Pantry', icon: UtensilsCrossed },
    { to: '/generate', label: 'Generate', icon: ChefHat },
    { to: '/recipes', label: 'Recipes', icon: UtensilsCrossed },
    { to: '/meal-plan', label: 'Meal Plan', icon: Calendar },
    { to: '/shopping-list', label: 'Shopping', icon: ShoppingCart },
]

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg-px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Nav Links */}
                    {navConfig.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            label={label}
                            icon={<Icon className="w-4 h-4" />}
                        />
                    ))}

                    {/* User Menu */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
