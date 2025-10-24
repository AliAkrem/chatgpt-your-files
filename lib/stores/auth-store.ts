// stores/auth-store.ts
import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  signOut: () => Promise<void>
  initialize: (initialUser?: User | null) => Promise<any>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user, isLoading: false }),

  signOut: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    set({ user: null })
  },

  initialize: async (initialUser) => {
    const supabase = createClient()

    // Set initial user immediately if provided
    if (initialUser !== undefined) {
      set({ user: initialUser, isLoading: false })
    } else {
      // Otherwise fetch it
      const { data: { user } } = await supabase.auth.getUser()
      set({ user, isLoading: false })
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      switch (_event) {
        case "SIGNED_IN":
          console.log("SIGN-IN DETECTED BY THE LISTNER");
          set({ user: session?.user, isLoading: false })
          break;
        case "SIGNED_OUT":
          console.log("SIGN-OUT DETECTED BY THE LISTNER");

          set({ user: null, isLoading: false })
          break;
        default:
          set({ user: session?.user ?? null, isLoading: false })

          break;
      }

    })

    return () => subscription.unsubscribe()
  }
}))