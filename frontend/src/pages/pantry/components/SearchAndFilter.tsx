import { Search } from 'lucide-react'

import CategoryButton from './CategoryButton'

import { CATEGORIES } from '../../../constants/pantry'

type SearchAndFilterProps = {
    searchQuery: string
    setSearchQuery: (value: React.SetStateAction<string>) => void
    selectedCategory: string
    setSelectedCategory: (value: React.SetStateAction<string>) => void
}

const SearchAndFilter = ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
}: SearchAndFilterProps) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search ingredients..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                    <CategoryButton
                        label="All"
                        active={selectedCategory === 'All'}
                        onClick={() => setSelectedCategory('All')}
                    />
                    {CATEGORIES.map((category) => (
                        <CategoryButton
                            key={category}
                            label={category}
                            active={selectedCategory === category}
                            onClick={() => setSelectedCategory(category)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchAndFilter
