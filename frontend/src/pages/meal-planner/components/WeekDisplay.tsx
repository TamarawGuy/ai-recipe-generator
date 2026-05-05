import { format, addDays } from 'date-fns'

const WeekDisplay = ({ weekStart }: { weekStart: Date }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="text-center">
                <p className="text-sm text-gray-600">Week of</p>
                <h2 className="text-lg font-semibold text-gray-900">
                    <time dateTime={format(weekStart, 'yyyy-MM-dd')}>
                        {format(weekStart, 'MMMM d')}
                    </time>{' '}
                    -{' '}
                    <time
                        dateTime={format(addDays(weekStart, 6), 'yyyy-MM-dd')}
                    >
                        {format(addDays(weekStart, 6), 'MMMM d, yyyy')}
                    </time>
                </h2>
            </div>
        </div>
    )
}

export default WeekDisplay
