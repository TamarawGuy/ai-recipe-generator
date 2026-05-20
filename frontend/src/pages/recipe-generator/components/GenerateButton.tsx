import { Sparkles } from 'lucide-react'

type GenerateButtonProps = {
    generating: boolean
    handleGenerate: () => Promise<void>
}

const GenerateButton = ({
    generating,
    handleGenerate,
}: GenerateButtonProps) => {
    return (
        <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
            {generating ? (
                <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating Recipe...
                </>
            ) : (
                <>
                    <Sparkles className="w-5 h-5" />
                    Generate Recipe
                </>
            )}
        </button>
    )
}

export default GenerateButton
