import {
    CUISINES,
    DIETARY_OPTIONS,
    COOKING_TIMES,
} from '../../../constants/recipe-generator'

type PreferencesProps = {
    cuisineType: string
    setCuisineType: React.Dispatch<React.SetStateAction<string>>
    dietaryRestrictions: string[]
    setDietaryRestrictions: (value: React.SetStateAction<string[]>) => void
    servings: number
    setServings: React.Dispatch<React.SetStateAction<number>>
    cookingTime: string
    setCookingTime: React.Dispatch<React.SetStateAction<string>>
}

const Preferences = ({
    cuisineType,
    setCuisineType,
    dietaryRestrictions,
    setDietaryRestrictions,
    servings,
    setServings,
    cookingTime,
    setCookingTime,
}: PreferencesProps) => {
    const toggleDietary = (option: string) => {
        if (dietaryRestrictions.includes(option)) {
            setDietaryRestrictions(
                dietaryRestrictions.filter((d) => d !== option),
            )
        } else {
            setDietaryRestrictions([...dietaryRestrictions, option])
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>

            {/* Cuisine Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine Type
                </label>
                <select
                    value={cuisineType}
                    onChange={(e) => setCuisineType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                    {CUISINES.map((cuisine) => (
                        <option key={cuisine} value={cuisine}>
                            {cuisine}
                        </option>
                    ))}
                </select>
            </div>

            {/* Dietary Restrictions */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Restrictions
                </label>
                <div className="flex flex-wrap gap-2">
                    {DIETARY_OPTIONS.map((option) => (
                        <button
                            key={option}
                            onClick={() => toggleDietary(option)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                                dietaryRestrictions.includes(option)
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Servings */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servings: {servings}
                </label>
                <input
                    type="range"
                    min="1"
                    max="12"
                    value={servings}
                    onChange={(e) => setServings(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>12</span>
                </div>
            </div>

            {/* Cooking Time */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cooking Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {COOKING_TIMES.map((time) => (
                        <button
                            key={time.value}
                            onClick={() => setCookingTime(time.value)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                                cookingTime === time.value
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {time.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Preferences
