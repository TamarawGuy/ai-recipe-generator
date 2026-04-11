import { ChefHat } from 'lucide-react'

type LogoProps = {
    title: string
    description: string
}

const Logo = ({ title, description }: LogoProps) => {
    return (
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4">
                <ChefHat className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-2">{description}</p>
        </div>
    )
}

export default Logo
