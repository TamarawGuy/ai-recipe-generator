import { screen, render } from '@testing-library/react'
import Loading from './Loading'

vi.mock(import('./Navbar'), () => ({
    default: () => <div data-testid="navbar" />,
}))

describe('Loading', () => {
    it('shows a loading status', () => {
        render(<Loading />)
        expect(
            screen.getByRole('status', { name: 'Loading' }),
        ).toBeInTheDocument()
    })

    it('renders the Navbar', () => {
        render(<Loading />)
        expect(screen.getByTestId('navbar')).toBeInTheDocument()
    })
})
