import { useMemo, useState } from 'react'
import AdvancedSelect from './components/AdvancedSelect.jsx'
import { smallGroupedData, generateLargeGroupedData } from './data/examples.js'

export default function App() {
  const [controlled, setControlled] = useState([])
  const largeData = useMemo(() => generateLargeGroupedData(1200), [])

  return (
    <div className="min-h-full bg-gray-50 py-10">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Advanced Select / Dropdown Demo</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-medium text-gray-800 mb-3">Small Dataset (Uncontrolled)</h2>
            <AdvancedSelect
              options={smallGroupedData}
              defaultValue={[smallGroupedData[0].items[0]]}
              multiple
              virtualized={false}
              placeholder="Choose fruits and vegetables"
            />
          </section>

          <section>
            <h2 className="text-lg font-medium text-gray-800 mb-3">Large Dataset (Controlled + Virtualized)</h2>
            <AdvancedSelect
              options={largeData}
              value={controlled}
              onChange={setControlled}
              multiple
              virtualized
              placeholder="Select many items"
            />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {controlled.length ? controlled.map((i) => i.label).join(', ') : 'None'}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
