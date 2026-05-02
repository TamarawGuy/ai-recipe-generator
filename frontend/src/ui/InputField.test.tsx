import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputField from './InputField'

describe('InputField', () => {
    it('wires the label to the input', () => {
        const props = {
            id: 'email',
            label: 'Email',
            value: '',
            onChange: () => {},
        }

        render(<InputField {...props} />)

        expect(screen.getByLabelText(props.label)).toBeInTheDocument()
    })

    it('calls onChange when the user types', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        const props = {
            id: 'email',
            label: 'Email',
            value: '',
            onChange,
        }

        render(<InputField {...props} />)

        const input = screen.getByLabelText(props.label)
        await user.type(input, 'a')

        expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('renders the icon when provided', () => {
        const props = {
            id: 'email',
            label: 'Email',
            value: '',
            onChange: () => {},
            icon: <svg data-testid="input-icon" />,
        }

        render(<InputField {...props} />)

        expect(screen.getByTestId('input-icon')).toBeInTheDocument()
    })

    it('does NOT render an icon when omitted', () => {
        const props = {
            id: 'email',
            label: 'Email',
            value: '',
            onChange: () => {},
        }

        render(<InputField {...props} />)

        expect(screen.queryByTestId('input-icon')).not.toBeInTheDocument()
    })
})
