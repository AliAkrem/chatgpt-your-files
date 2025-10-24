// components/providers/auth-provider.tsx
'use client'

import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/lib/stores/auth-store'
import { User } from '@supabase/supabase-js'

export function AuthProvider({ 
  children,
  initialUser 
}: { 
  children: React.ReactNode
  initialUser: User | null
}) {
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      useAuthStore.getState().initialize(initialUser)
    }
  }, [initialUser])

  return <>{children}</>
}