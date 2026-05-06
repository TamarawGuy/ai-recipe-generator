import React from 'react'

const DIFFICULTIES = ['All', 'easy', 'medium', 'hard']

type DifficultyFilterProps = {
    selectedDifficulty: string
    setSelectedDifficulty: (value: React.SetStateAction<string>) => void
}

const DifficultyFilter = ({
    selectedDifficulty,
    setSelectedDifficulty,
}: DifficultyFilterProps) => {
    return (
        <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        >
            {DIFFICULTIES.map((diff) => (
                <option key={diff} value={diff}>
                    {diff === 'All'
                        ? 'All Difficulties'
                        : diff.charAt(0).toUpperCase() + diff.slice(1)}
                </option>
            ))}
        </select>
    )
}

export default DifficultyFilter
