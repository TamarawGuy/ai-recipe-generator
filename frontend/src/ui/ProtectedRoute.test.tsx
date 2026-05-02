import { render, screen } from '@testing-library/react'
import ProtectedRoute from './ProtectedRoute'
import { useAuth } from '../context/AuthContext'

vi.mock(import('../context/AuthContext'), () => ({ useAuth: vi.fn() }))

vi.mock(import('react-router-dom'), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        Navigate: ({ to }: { to: string }) => (
            <div data-testid="navigate" data-to={to} />
        ),
    } as unknown as typeof actual
})

const mockAuth = (overrides: Partial<ReturnType<typeof useAuth>>) => {
    vi.mocked(useAuth).mockReturnValue({
        user: null,
        loading: false,
        isAuthenticated: false,
        login: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
        ...overrides,
    })
}

describe('ProtectedRoute', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('shows a loading state while authenticating', () => {
        mockAuth({ loading: true })

        render(
            <ProtectedRoute>
                <div>secret</div>
            </ProtectedRoute>,
        )

        expect(screen.queryByText('secret')).not.toBeInTheDocument()
    })

    it('redirects to /login when not authenticated', () => {
        mockAuth({ isAuthenticated: false, loading: false })

        render(
            <ProtectedRoute>
                <div>secret</div>
            </ProtectedRoute>,
        )

        const navigate = screen.getByTestId('navigate')
        expect(navigate).toBeInTheDocument()
        expect(navigate).toHaveAttribute('data-to', '/login')
        expect(screen.queryByText('secret')).not.toBeInTheDocument()
    })

    it('renders children when authenticated', () => {
        mockAuth({ loading: false, isAuthenticated: true })

        render(
            <ProtectedRoute>
                <div>secret</div>
            </ProtectedRoute>,
        )

        expect(screen.getByText('secret')).toBeInTheDocument()
        expect(screen.queryByTestId('navigate')).not.toBeInTheDocument()
    })
})
