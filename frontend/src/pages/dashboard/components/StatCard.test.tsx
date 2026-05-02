import { render, screen } from '@testing-library/react'
import StatCard from './StatCard'

describe('StatCard', () => {
    it('renders with icon, label, and value props', () => {
        const props = {
            icon: <svg data-testid="icon" />,
            label: 'Total Recipes',
            value: 100,
            color: 'emerald',
        }

        render(<StatCard {...props} />)

        expect(screen.getByTestId('icon')).toBeInTheDocument()
        expect(screen.getByText(props.label)).toBeInTheDocument()
        expect(screen.getByText(props.value.toString())).toBeInTheDocument()
    })

    it('renders zero values', () => {
        const props = {
            icon: <svg data-testid="icon" />,
            label: 'Total Recipes',
            value: 0,
            color: 'emerald',
        }

        render(<StatCard {...props} />)

        expect(screen.getByText(props.value.toString())).toBeInTheDocument()
    })
})
