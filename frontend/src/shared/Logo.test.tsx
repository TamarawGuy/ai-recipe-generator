import { render, screen } from '@testing-library/react'
import Logo from './Logo'

describe('Logo', () => {
    it('renders with title and description props', () => {
        const title = 'My Recipe App'
        const description = 'AI-powered recipe generator'

        render(<Logo title={title} description={description} />)

        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        expect(screen.getByText(description)).toBeInTheDocument()
    })
})
