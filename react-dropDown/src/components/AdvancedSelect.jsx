import { useMemo, useState, useCallback, useRef } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import classNames from 'classnames'
import SelectButton from './SelectButton.jsx'
import SearchInput from './SearchInput.jsx'
import ActionBar from './ToActionBar.jsx'
import OptionItem from './OptionItem.jsx'
import VirtualizedOptionList from './VirtualizedOptionList.jsx'

/**
 * Advanced Select / Dropdown built on Headless UI Listbox.
 * - Multi-select, search, grouped options, Select All / Clear All
 * - Optional virtualization with @tanstack/react-virtual for large datasets
 *
 * Props:
 * - options: Array<{ label: string, items: Array<{ id: string|number, label: string, disabled?: boolean }> }>
 * - multiple?: boolean
 * - value?: Array<any> (controlled)
 * - defaultValue?: Array<any> (uncontrolled)
 * - onChange?: (next) => void
 * - placeholder?: string
 * - maxNamesInButton?: number
 * - virtualized?: boolean
 * - virtualHeight?: number
 * - itemSize?: number
 */
export default function AdvancedSelect({
  options = [],
  multiple = true,
  value,
  defaultValue = [],
  onChange,
  placeholder = 'Select...',
  maxNamesInButton = 3,
  virtualized = true,
  virtualHeight = 320,
  itemSize = 40,
}) {
  const isControlled = Array.isArray(value)
  const [internal, setInternal] = useState(defaultValue)
  const selected = isControlled ? value : internal

  const [query, setQuery] = useState('')

  const allItemsFlat = useMemo(() => {
    // Flatten to [{type:'header', label}, {type:'option', option, group}]
    const rows = []
    for (const group of options) {
      rows.push({ type: 'header', label: group.label })
      for (const item of group.items) {
        rows.push({ type: 'option', option: item, group: group.label })
      }
    }
    return rows
  }, [options])

  const filteredRows = useMemo(() => {
    if (!query) return allItemsFlat
    const q = query.toLowerCase()
    return allItemsFlat.filter((row) => {
      if (row.type === 'header') return true
      const label = row.option.label.toLowerCase()
      return label.includes(q)
    })
  }, [allItemsFlat, query])

  const selectableOptions = useMemo(
    () => filteredRows.filter((r) => r.type === 'option' && !r.option.disabled).map((r) => r.option),
    [filteredRows],
  )

  const setSelection = useCallback(
    (next) => {
      if (isControlled) onChange?.(next)
      else setInternal(next)
    },
    [isControlled, onChange],
  )

  const handleSelectAll = useCallback(() => {
    const map = new Map(selected.map((o) => [o.id, o]))
    for (const opt of selectableOptions) {
      map.set(opt.id, opt)
    }
    setSelection(Array.from(map.values()))
  }, [selected, selectableOptions, setSelection])

  const handleClearAll = useCallback(() => {
    setSelection([])
  }, [setSelection])

  const isSelected = useCallback(
    (item) => selected.some((s) => s.id === item.id),
    [selected],
  )

  const buttonLabel = useMemo(() => {
    if (!selected.length) return placeholder
    if (selected.length <= maxNamesInButton) {
      return selected.map((s) => s.label).join(', ')
    }
    return `${selected.length} items selected`
  }, [selected, placeholder, maxNamesInButton])

  const containerRef = useRef(null)

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={setSelection} multiple={multiple}>
        <div className="relative">
          <SelectButton label={buttonLabel} selected={selected} />

          <Transition
            as="div"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              ref={containerRef}
              className={classNames(
                'absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg',
              )}
            >
              <div className="p-2 border-b border-gray-100 bg-gray-50">
                <ActionBar onSelectAll={handleSelectAll} onClearAll={handleClearAll} disabledCount={filteredRows.filter(r => r.type === 'option' && r.option.disabled).length} />
                <SearchInput value={query} onChange={setQuery} placeholder="Search..." />
              </div>

              {virtualized ? (
                <VirtualizedOptionList
                  rows={filteredRows}
                  isSelected={isSelected}
                  height={virtualHeight}
                  itemSize={itemSize}
                />
              ) : (
                <div className="max-h-80 overflow-auto">
                  {filteredRows.map((row, i) =>
                    row.type === 'header' ? (
                      <div
                        key={`h-${row.label}-${i}`}
                        className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0"
                        aria-hidden="true"
                      >
                        {row.label}
                      </div>
                    ) : (
                      <OptionItem
                        key={row.option.id}
                        option={row.option}
                        selected={isSelected(row.option)}
                      />
                    ),
                  )}
                </div>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
