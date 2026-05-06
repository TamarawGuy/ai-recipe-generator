import { Search } from 'lucide-react'

type SearchFilterProps = {
    searchQuery: string
    setSearchQuery: (value: React.SetStateAction<string>) => void
}

const SearchFilter = ({ searchQuery, setSearchQuery }: SearchFilterProps) => {
    return (
        <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
        </div>
    )
}

export default SearchFilter
