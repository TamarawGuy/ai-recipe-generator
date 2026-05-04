import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import Login from './Login'

vi.mock(import('../../context/AuthContext'), () => ({
    useAuth: vi.fn(),
}))

vi.mock(import('react-router-dom'), async (importOriginal) => {
    const actual = await importOriginal()
    return {
        ...actual,
        useNavigate: vi.fn(),
    }
})

vi.mock(
    import('react-hot-toast'),
    () =>
        ({
            default: {
                success: vi.fn(),
                error: vi.fn(),
            },
        }) as unknown as typeof import('react-hot-toast'),
)

const setupAuth = (loginImpl = vi.fn()) => {
    vi.mocked(useAuth).mockReturnValue({
        user: null,
        loading: false,
        isAuthenticated: false,
        login: loginImpl,
        register: vi.fn(),
        logout: vi.fn(),
    })
}

describe('Login page', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        setupAuth()
        vi.mocked(useNavigate).mockReturnValue(vi.fn())
    })
    it('should show component with email, password and sign-in button', () => {
        render(<Login />, { wrapper: MemoryRouter })

        expect(screen.getByLabelText('Email')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Sign In' }),
        ).toBeInTheDocument()
    })

    it('should login successfully', async () => {
        const login = vi.fn().mockResolvedValue({ success: true })
        const navigate = vi.fn()

        setupAuth(login)
        vi.mocked(useNavigate).mockReturnValue(navigate)

        const user = userEvent.setup()
        render(<Login />, { wrapper: MemoryRouter })

        const emailInput = screen.getByLabelText('Email')
        const passwordInput = screen.getByLabelText('Password')
        const signInButton = screen.getByRole('button', { name: 'Sign In' })

        await user.type(emailInput, 'a@b.com')
        await user.type(passwordInput, 'secret123')
        await user.click(signInButton)

        await waitFor(() => {
            expect(navigate).toHaveBeenCalledWith('/dashboard')
        })

        expect(login).toHaveBeenCalledWith('a@b.com', 'secret123')
        expect(toast.success).toHaveBeenCalledWith('Welcome Back!')
    })

    it('should NOT login and shows error toast', async () => {
        const login = vi
            .fn()
            .mockReturnValue({ success: false, message: 'Invalid creds' })
        const navigate = vi.fn()

        setupAuth(login)
        vi.mocked(useNavigate).mockReturnValue(navigate)

        const user = userEvent.setup()
        render(<Login />, { wrapper: MemoryRouter })

        const emailInput = screen.getByLabelText('Email')
        const passwordInput = screen.getByLabelText('Password')
        const signInButton = screen.getByRole('button', { name: 'Sign In' })

        await user.type(emailInput, 'a@b.com')
        await user.type(passwordInput, 'secret123')
        await user.click(signInButton)

        await waitFor(() =>
            expect(toast.error).toHaveBeenCalledWith('Invalid creds'),
        )
        expect(login).toHaveBeenCalledWith('a@b.com', 'secret123')
        expect(navigate).not.toHaveBeenCalled()
        expect(toast.success).not.toHaveBeenCalled()
    })
})
