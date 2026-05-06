import { useState, type SubmitEvent } from 'react'
import toast from 'react-hot-toast'
import { X } from 'lucide-react'

import api from '../../../services/api'

import { CATEGORIES } from '../../../constants/pantry'

type AddPantryItemModalProps = {
    onClose: () => void
    onSuccess: () => void
}

const AddPantryItemModal = ({
    onClose,
    onSuccess,
}: AddPantryItemModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        unit: 'pieces',
        category: 'Other',
        expiry_date: '',
        is_running_low: false,
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault()

        try {
            await api.post('/pantry', {
                ...formData,
                quantity: parseFloat(formData.quantity),
                expiry_date: formData.expiry_date || null,
            })

            toast.success('Item added to pantry')
            onSuccess()
            onClose()
        } catch (err) {
            console.error('Failed to add item: ', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        Add Pantry Item
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.quantity}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        quantity: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Unit
                            </label>
                            <select
                                value={formData.unit}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        unit: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                            >
                                <option value="pieces">Pieces</option>
                                <option value="kg">Kilograms</option>
                                <option value="g">Grams</option>
                                <option value="l">Liters</option>
                                <option value="ml">Milliliters</option>
                                <option value="cups">Cups</option>
                                <option value="tbsp">Tablespoons</option>
                                <option value="tsp">Teaspoons</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    category: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date (Optional)
                        </label>
                        <input
                            type="date"
                            value={formData.expiry_date}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    expiry_date: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="running-low"
                            checked={formData.is_running_low}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    is_running_low: e.target.checked,
                                })
                            }
                            className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <label
                            htmlFor="running-low"
                            className="text-sm text-gray-700"
                        >
                            Mark as running low
                        </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Add Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPantryItemModal
