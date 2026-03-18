type StatCardProps = {
    icon: React.ReactNode
    label: string
    value: number
    color: string
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-4">
                <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}-100 text-${color}-600`}
                >
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-gray-600">{label}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    )
}

export default StatCard
