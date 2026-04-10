import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from 'react'
import axios from 'axios'
import api from '../services/api'
import type { User } from '../types.d'

type AuthContextProps = {
    user: User | null
    loading: boolean
    login: (
        email: string,
        password: string,
    ) => Promise<{ success: boolean; message?: string }>
    register: (
        name: string,
        email: string,
        password: string,
    ) => Promise<{ success: boolean; message?: string }>
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextProps | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // check if token exists
        const token = localStorage.getItem('token')
        const savedUser = localStorage.getItem('user')

        if (token && savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const resp = await api.post('/auth/login', { email, password })
            const { user, token } = resp.data.data

            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)

            return { success: true }
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message
                : undefined
            return {
                success: false,
                message: message || 'Login failed',
            }
        }
    }

    const register = async (name: string, email: string, password: string) => {
        try {
            const resp = await api.post('/auth/signup', {
                name,
                email,
                password,
            })
            const { user, token } = resp.data.data

            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)

            return { success: true }
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message
                : undefined
            return {
                success: false,
                message: message || 'Registration failed',
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
