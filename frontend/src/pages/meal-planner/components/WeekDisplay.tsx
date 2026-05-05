import { format, addDays } from 'date-fns'

const WeekDisplay = ({ weekStart }: { weekStart: Date }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="text-center">
                <p className="text-sm text-gray-600">Week of</p>
                <p className="text-lg font-semibold text-gray-900">
                    {format(weekStart, 'MMMM d')} -{' '}
                    {format(addDays(weekStart, 6), 'MMMM d, yyyy')}
                </p>
            </div>
        </div>
    )
}

export default WeekDisplay
