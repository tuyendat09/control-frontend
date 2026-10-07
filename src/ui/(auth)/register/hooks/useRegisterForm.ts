import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router'

export function useRegisterForm() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ name: '', email: '', password: '' })

  const setField = (field: keyof typeof values) => (e: ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Auth backend isn't wired yet (data is local-first) — creating an account goes straight to Today.
    navigate('/')
  }

  return { values, setField, onSubmit }
}
