import type { ChangeEvent, ReactNode } from 'react'

type InputFieldProps = {
    id: string
    label: string
    type?: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    icon?: ReactNode
}

const InputField = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    icon,
}: InputFieldProps) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label}
            </label>

            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400">
                        {icon}
                    </div>
                )}

                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    required
                />
            </div>
        </div>
    )
}

export default InputField
