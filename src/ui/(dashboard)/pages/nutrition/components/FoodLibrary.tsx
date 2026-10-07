import { useFoodLibrary } from '../hooks/useFoodLibrary'
import { CategoryChips } from './CategoryChips'
import { FoodTable } from './FoodTable'
import { LibraryNote } from './LibraryNote'
import { LibraryTarget } from './LibraryTarget'
import { LibrarySearchBar } from './LibrarySearchBar'

export function FoodLibrary({ onDone }: { onDone: () => void }) {
  const { query, setQuery, filter, setFilter, foods, addFood, target } = useFoodLibrary()

  return (
    <div className="mt-4 px-5">
      {target && <LibraryTarget meal={target.meal} date={target.date} onDone={onDone} />}
      <LibrarySearchBar query={query} onQueryChange={setQuery} />
      <CategoryChips value={filter} onChange={setFilter} />
      <FoodTable foods={foods} onAdd={addFood} />
      <LibraryNote />
    </div>
  )
}
