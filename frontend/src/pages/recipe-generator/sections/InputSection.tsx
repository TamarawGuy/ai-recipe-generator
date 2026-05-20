import Ingredients from '../components/Ingredients'
import Preferences from '../components/Preferences'
import GenerateButton from '../components/GenerateButton'

type InputSectionProps = {
    ingredients: string[]
    setIngredients: (value: React.SetStateAction<string[]>) => void
    cuisineType: string
    setCuisineType: React.Dispatch<React.SetStateAction<string>>
    dietaryRestrictions: string[]
    setDietaryRestrictions: (value: React.SetStateAction<string[]>) => void
    servings: number
    setServings: React.Dispatch<React.SetStateAction<number>>
    usePantry: boolean
    setUsePantry: React.Dispatch<React.SetStateAction<boolean>>
    cookingTime: string
    setCookingTime: React.Dispatch<React.SetStateAction<string>>
    generating: boolean
    handleGenerate: () => Promise<void>
}

const InputSection = ({
    ingredients,
    setIngredients,
    cuisineType,
    setCuisineType,
    dietaryRestrictions,
    setDietaryRestrictions,
    servings,
    setServings,
    usePantry,
    setUsePantry,
    cookingTime,
    setCookingTime,
    generating,
    handleGenerate,
}: InputSectionProps) => {
    return (
        <div className="space-y-6">
            {/* Ingredients */}
            <Ingredients
                ingredients={ingredients}
                setIngredients={setIngredients}
                usePantry={usePantry}
                setUsePantry={setUsePantry}
            />

            {/* Preferences */}
            <Preferences
                cuisineType={cuisineType}
                setCuisineType={setCuisineType}
                dietaryRestrictions={dietaryRestrictions}
                setDietaryRestrictions={setDietaryRestrictions}
                servings={servings}
                setServings={setServings}
                cookingTime={cookingTime}
                setCookingTime={setCookingTime}
            />

            {/* Generate Button */}
            <GenerateButton
                generating={generating}
                handleGenerate={handleGenerate}
            />
        </div>
    )
}

export default InputSection
