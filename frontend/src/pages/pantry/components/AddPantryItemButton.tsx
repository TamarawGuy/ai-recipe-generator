import { useState } from 'react'
import { Plus } from 'lucide-react'

import AddPantryItemModal from './AddPantryItemModal'

type AddPantryItemButtonProps = {
    onSuccess: () => void
}

const AddPantryItemButton = ({ onSuccess }: AddPantryItemButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
                <Plus className="w-5 h-5" />
                Add Item
            </button>
            {isOpen && (
                <AddPantryItemModal
                    onClose={() => setIsOpen(false)}
                    onSuccess={() => {
                        onSuccess()
                        setIsOpen(false)
                    }}
                />
            )}
        </>
    )
}

export default AddPantryItemButton
