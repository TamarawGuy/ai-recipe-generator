type CategoryButtonProps = {
    label: string
    active: boolean
    onClick: () => void
}

const CategoryButton = ({ label, active, onClick }: CategoryButtonProps) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors cursor-pointer ${
            active
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
    >
        {label}
    </button>
)

export default CategoryButton
