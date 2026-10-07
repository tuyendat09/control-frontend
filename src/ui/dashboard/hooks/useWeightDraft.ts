import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { clamp, round1 } from '@/lib/format'
import { useT } from '@/ui/shared/hooks/useT'
import { useToast } from '@/ui/shared/hooks/useToast'
import { useTracker } from '@/ui/shared/hooks/useTracker'
import { useWeightStats } from '@/ui/shared/hooks/useWeightStats'

const MIN_KG = 30
const MAX_KG = 200

/** Draft value for the weight sheet: stepper, jump chips, tap-to-type, save. */
export function useWeightDraft(onDone: () => void) {
  const t = useT()
  const { showToast } = useToast()
  const { saveWeight } = useTracker()
  const { weight } = useWeightStats()

  const [draft, setDraft] = useState(weight)
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(weight.toFixed(1))

  const nudge = (step: number) => setDraft((d) => round1(clamp(d + step, MIN_KG, MAX_KG)))

  const startEdit = () => {
    setText(draft.toFixed(1))
    setEditing(true)
  }

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

  const commit = () => {
    const parsed = parseFloat(text.replace(',', '.'))
    if (!Number.isNaN(parsed)) setDraft(round1(clamp(parsed, MIN_KG, MAX_KG)))
    setEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') e.currentTarget.blur()
  }

  const save = () => {
    saveWeight(draft)
    showToast(t(`Đã ghi ${draft.toFixed(1)} kg cho hôm nay`, `Logged ${draft.toFixed(1)} kg for today`))
    onDone()
  }

  return { draft, editing, text, nudge, startEdit, onTextChange, commit, onKeyDown, save }
}
