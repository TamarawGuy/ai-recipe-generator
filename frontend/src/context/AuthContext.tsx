import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from 'react'
import { dummyUser, type DummyUser } from '../../data/dummyData'

type AuthContextProps = {
    user: DummyUser | null
    loading: boolean
    login: (email: string, password: string) => Promise<{ success: boolean }>
    register: (
        name: string,
        email: string,
        password: string,
    ) => Promise<{ success: boolean }>
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
    const [user, setUser] = useState<DummyUser | null>(null)
    const [loading, setLoading] = useState(false)

    const login = async (email: string, password: string) => {
        setUser(dummyUser)
        return { success: true }
    }

    const register = async (name: string, email: string, password: string) => {
        setUser(dummyUser)
        return { success: true }
    }

    const logout = () => {
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

    useEffect(() => {
        setUser(dummyUser)
    }, [])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
