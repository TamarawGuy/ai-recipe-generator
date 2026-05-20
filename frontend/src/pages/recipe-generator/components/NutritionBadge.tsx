const NutritionBadge = ({
    label,
    value,
    unit,
}: {
    label: string
    value: number
    unit: string
}) => (
    <div className="text-center p-3 bg-gray-50 rounded-lg">
        <div className="text-lg font-bold text-gray-900">
            {value}
            {unit}
        </div>
        <div className="text-xs text-gray-600">{label}</div>
    </div>
)

export default NutritionBadge
