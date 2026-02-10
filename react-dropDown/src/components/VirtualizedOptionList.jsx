import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import OptionItem from './OptionItem.jsx'

export default function VirtualizedOptionList({ rows, isSelected, height = 320, itemSize = 40 }) {
  const parentRef = useRef(null)
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemSize,
    overscan: 8,
  })

  const items = virtualizer.getVirtualItems()

  return (
    <div ref={parentRef} className="overflow-auto" style={{ height }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative', width: '100%' }}>
        {items.map((vi) => {
          const row = rows[vi.index]
          const top = vi.start

          return (
            <div
              key={vi.key}
              style={{
                position: 'absolute',
                top,
                left: 0,
                right: 0,
                height: vi.size,
              }}
            >
              {row.type === 'header' ? (
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 sticky top-0" aria-hidden="true">
                  {row.label}
                </div>
              ) : (
                <OptionItem option={row.option} selected={isSelected(row.option)} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
