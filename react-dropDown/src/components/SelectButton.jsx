import { Listbox } from '@headlessui/react'
import classNames from 'classnames'

export default function SelectButton({ label, selected }) {
  return (
    <Listbox.Button
      className={classNames(
        'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
      )}
      aria-label="Select items"
    >
      <div className="flex items-center justify-between">
        <span className={classNames('truncate', selected.length ? 'text-gray-900' : 'text-gray-500')}>
          {label}
        </span>
        <svg
          className="ml-2 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </Listbox.Button>
  )
}
