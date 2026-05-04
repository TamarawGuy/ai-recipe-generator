import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header component', () => {
    it('should appear on screen with title and subtitle', () => {
        render(<Header />)
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })
})
