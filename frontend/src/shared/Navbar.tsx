import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
    ChefHat,
    Home,
    UtensilsCrossed,
    Calendar,
    ShoppingCart,
    LogOut,
    Settings,
    ChevronDown,
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const handleLogout = () => {
        logout()
        navigate('/login')
        setIsDropdownOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

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
                        <Link
                            to="/settings"
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Settings className="w-5 h-5" />
                        </Link>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700"
                            >
                                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="hidden sm:inline font-medium">
                                    {user?.name || 'User'}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate' : ''}`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border">
                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                                                {user?.name
                                                    ?.charAt(0)
                                                    .toUpperCase() || 'U'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">
                                                    {user?.name || 'User'}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user?.email ||
                                                        'user@example.com'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logout button */}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
