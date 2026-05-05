type WeekNavigationProps = {
    onPrev: () => void
    onThisWeek: () => void
    onNext: () => void
}

const WeekNavigation = ({
    onPrev,
    onThisWeek,
    onNext,
}: WeekNavigationProps) => {
    return (
        <div
            role="group"
            aria-label="Week navigation"
            className="flex items-center gap-3"
        >
            <button
                onClick={onPrev}
                className="
                    px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-1 font-medium transition-colors"
            >
                Previous Week
            </button>
            <button
                onClick={onThisWeek}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-1 text-white rounded-lg font-medium transition-colors"
            >
                This Week
            </button>
            <button
                onClick={onNext}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-1 font-medium transition-colors"
            >
                Next Week
            </button>
        </div>
    )
}

export default WeekNavigation
