import { useState, useMemo } from 'react'

import Loading from '../../shared/Loading'
import Navbar from '../../shared/Navbar'
import Header from '../../shared/Header'

import PantryItemCard from './components/PantryItemCard'
import ExpiringSoonItems from './components/ExpiringSoonItems'
import AddPantryItemButton from './components/AddPantryItemButton'
import SearchAndFilter from './components/SearchAndFilter'

import { usePantryItems } from './hooks/usePantryItems'

const Pantry = () => {
    const { items, loading, deletePantryItem, refetch } = usePantryItems()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const expiringItems = useMemo(() => {
        const startOfToday = new Date()
        startOfToday.setHours(0, 0, 0, 0)

        const endOfWindow = new Date(startOfToday)
        endOfWindow.setDate(endOfWindow.getDate() + 7)
        endOfWindow.setHours(23, 59, 59, 999)

        return items.filter((item) => {
            if (!item.expiry_date) return false
            const expiry = new Date(item.expiry_date)
            return expiry >= startOfToday && expiry <= endOfWindow
        })
    }, [items])

    const filteredItems = useMemo(() => {
        let filtered = items

        if (searchQuery) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(
                (item) => item.category === selectedCategory,
            )
        }

        return filtered
    }, [items, searchQuery, selectedCategory])

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <Header
                        title="Pantry"
                        subtitle="Manage your ingredients and track expiry dates"
                    />
                    <AddPantryItemButton onSuccess={refetch} />
                </div>

                {/* Expiring Soon Alert */}
                <ExpiringSoonItems expiringItems={expiringItems} />

                {/* Search and Filter */}
                <SearchAndFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                {/* Items Grid */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredItems.map((item) => (
                            <PantryItemCard
                                key={item.id}
                                item={item}
                                onDelete={deletePantryItem}
                                isExpiring={expiringItems.some(
                                    (exp) => exp.id === item.id,
                                )}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                        <p className="text-gray-500">No items found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Pantry
