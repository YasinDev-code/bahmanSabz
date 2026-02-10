export default function ToActionBar({ onSelectAll, onClearAll, disabledCount = 0 }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onSelectAll}
        className="rounded-md bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Select all"
        title={disabledCount ? `${disabledCount} disabled` : undefined}
      >
        Select All
      </button>
      <button
        type="button"
        onClick={onClearAll}
        className="rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
        aria-label="Clear all"
      >
        Clear All
      </button>
    </div>
  )
}
