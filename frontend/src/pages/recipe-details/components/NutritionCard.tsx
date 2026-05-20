const NutritionCard = ({
    label,
    value,
    unit,
}: {
    label: string
    value: number
    unit: string
}) => (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
        <div className="text-2xl font-bold text-gray-900">
            {value}
            {unit}
        </div>
        <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
)

export default NutritionCard
