import { useEffect } from 'react'
import { cn } from '@/lib/cn'
import type { ExercisePicker as Picker } from '../../hooks/useExercisePicker'
import { useAnimationExercisePicker } from '../../hooks/useAnimationExercisePicker'
import { PickerCta } from './PickerCta'
import { PickerFilters } from './PickerFilters'
import { PickerHeader } from './PickerHeader'
import { PickerList } from './PickerList'
import { PickerSearch } from './PickerSearch'

/** Full-screen "Add exercises" sheet over the session. Always rendered; mounts only while open or leaving. */
export function ExercisePicker({ picker }: { picker: Picker }) {
  const { open, close } = picker
  const { mounted, rootRef } = useAnimationExercisePicker(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  if (!mounted) return null

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      className={cn('absolute inset-0 z-[16] flex flex-col bg-surf', !open && 'pointer-events-none')}
    >
      <PickerHeader hasSelection={picker.selected.length > 0} onClose={close} onClear={picker.clearSelection} />
      <PickerSearch value={picker.query} onChange={picker.setQuery} />
      <PickerFilters
        group={picker.group}
        equipment={picker.equipment}
        onGroup={picker.setGroup}
        onEquipment={picker.setEquipment}
      />
      <PickerList picker={picker} />
      <PickerCta count={picker.selected.length} onConfirm={picker.confirm} />
    </div>
  )
}
