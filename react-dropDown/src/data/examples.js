export const smallGroupedData = [
  {
    label: 'Fruits',
    items: [
      { id: 'apple', label: 'Apple' },
      { id: 'banana', label: 'Banana' },
      { id: 'orange', label: 'Orange', disabled: true },
      { id: 'grape', label: 'Grape' },
      { id: 'peach', label: 'Peach' },
      { id: 'plum', label: 'Plum' },
      { id: 'watermelon', label: 'Watermelon' },
    ],
  },
  {
    label: 'Vegetables',
    items: [
      { id: 'carrot', label: 'Carrot' },
      { id: 'lettuce', label: 'Lettuce' },
      { id: 'spinach', label: 'Spinach' },
      { id: 'tomato', label: 'Tomato' },
      { id: 'cucumber', label: 'Cucumber' },
      { id: 'onion', label: 'Onion' },
      { id: 'potato', label: 'Potato' },
    ],
  },
]

export function generateLargeGroupedData(count = 1000) {
  const items = []
  for (let i = 0; i < count; i++) {
    items.push({ id: `item-${i}`, label: `Item ${i}` })
  }
  // Group into buckets of 100
  const groups = []
  for (let g = 0; g < items.length; g += 100) {
    const slice = items.slice(g, g + 100)
    groups.push({ label: `Group ${g / 100 + 1}`, items: slice })
  }
  return groups
}
