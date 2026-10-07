import { useFoodLibrary } from '../hooks/useFoodLibrary'
import { CategoryChips } from './CategoryChips'
import { FoodTable } from './FoodTable'
import { LibraryNote } from './LibraryNote'
import { LibrarySearchBar } from './LibrarySearchBar'

export function FoodLibrary() {
  const { query, setQuery, filter, setFilter, foods, addFood } = useFoodLibrary()

  return (
    <div className="mt-4 px-5">
      <LibrarySearchBar query={query} onQueryChange={setQuery} />
      <CategoryChips value={filter} onChange={setFilter} />
      <FoodTable foods={foods} onAdd={addFood} />
      <LibraryNote />
    </div>
  )
}
