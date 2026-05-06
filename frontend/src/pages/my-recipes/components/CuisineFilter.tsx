const CUISINES = [
    'All',
    'Italian',
    'Mexican',
    'Indian',
    'Chinese',
    'Japanese',
    'Thai',
    'French',
    'Mediterranean',
    'American',
]

type CuisineFilterProps = {
    selectedCuisine: string
    setSelectedCuisine: (value: React.SetStateAction<string>) => void
}

const CuisineFilter = ({
    selectedCuisine,
    setSelectedCuisine,
}: CuisineFilterProps) => {
    return (
        <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        >
            {CUISINES.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                    {cuisine === 'All' ? 'All Cuisines' : cuisine}
                </option>
            ))}
        </select>
    )
}

export default CuisineFilter
