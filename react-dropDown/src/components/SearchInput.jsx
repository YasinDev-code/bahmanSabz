export default function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="mt-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Filter options"
      />
    </div>
  )
}
