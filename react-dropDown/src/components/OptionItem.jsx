import { Listbox } from '@headlessui/react'
import classNames from 'classnames'

export default function OptionItem({ option, selected }) {
  return (
    <Listbox.Option
      value={option}
      disabled={option.disabled}
      className={({ active, disabled }) =>
        classNames(
          'cursor-default select-none px-3 py-2 text-sm',
          active && !disabled ? 'bg-blue-50' : '',
          disabled ? 'text-gray-300' : 'text-gray-800',
          'flex items-center justify-between',
        )
      }
    >
      <span className={classNames('truncate', option.disabled ? 'line-through' : '')}>{option.label}</span>
      {selected && (
        <svg
          className="h-4 w-4 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </Listbox.Option>
  )
}
