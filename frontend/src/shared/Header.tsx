const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
    )
}

export default Header
