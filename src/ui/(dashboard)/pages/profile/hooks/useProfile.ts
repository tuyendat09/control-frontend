import { useNavigate } from 'react-router'
import { useT } from '@/ui/shared/hooks/useT'
import { useToast } from '@/ui/shared/hooks/useToast'
import { useTracker } from '@/ui/shared/hooks/useTracker'
import { useWeightStats } from '@/ui/shared/hooks/useWeightStats'

export function useProfile() {
  const t = useT()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { entries, weightEntries } = useTracker()
  const { weightLabel } = useWeightStats()

  /** Downloads everything stored locally as a JSON file. */
  const exportData = () => {
    const payload = { exportedAt: new Date().toISOString(), meals: entries, weight: weightEntries }
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'control-export.json'
    link.click()
    URL.revokeObjectURL(url)
    showToast(t('Đã xuất dữ liệu', 'Data exported'))
  }

  const signOut = () => navigate('/auth')

  return { weightLabel, exportData, signOut }
}
