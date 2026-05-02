import { ShoppingCart } from 'lucide-react'

const EmptyShoppingList = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Your shopping list is empty</p>
            {children}
        </div>
    )
}

export default EmptyShoppingList
