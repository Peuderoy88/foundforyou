import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'creator' | 'admin'
  avatar?: string
  badges?: string[]
  createdAt: Date
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('currentUser')
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
        }
      } catch (err) {
        console.error('Failed to restore auth state:', err)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setError(null)
      setLoading(true)

      // TODO: Replace with Firebase Auth
      // const { user: authUser } = await auth.createUserWithEmailAndPassword(email, password)

      // For now, create mock user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'user',
        badges: [],
        createdAt: new Date(),
        isAdmin: false,
      }

      // Store in localStorage
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      setUser(newUser)

      // TODO: Create Firestore document
      // await createUserDocument(newUser)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign up'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      setLoading(true)

      // TODO: Replace with Firebase Auth
      // const { user: authUser } = await auth.signInWithEmailAndPassword(email, password)

      // For now, check localStorage for demo users
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'user',
        badges: email.includes('admin') ? ['admin'] : [],
        createdAt: new Date(),
        isAdmin: email.includes('admin'),
      }

      localStorage.setItem('currentUser', JSON.stringify(mockUser))
      setUser(mockUser)

      // TODO: Fetch user document from Firestore
      // const userDoc = await getUserDocument(authUser.uid)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      setLoading(true)

      // TODO: Replace with Firebase Auth
      // await auth.signOut()

      localStorage.removeItem('currentUser')
      setUser(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign out'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setError(null)
      setLoading(true)

      // TODO: Implement Firebase Google Auth
      // const { user: authUser } = await signInWithPopup(auth, googleProvider)

      const mockUser: User = {
        id: `user-${Date.now()}`,
        email: 'user@google.com',
        name: 'Google User',
        role: 'user',
        badges: [],
        createdAt: new Date(),
        isAdmin: false,
      }

      localStorage.setItem('currentUser', JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in with Google'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)
      setLoading(true)

      // TODO: Replace with Firebase Auth
      // await auth.sendPasswordResetEmail(email)

      console.log('Password reset email sent to:', email)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reset password'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    try {
      setError(null)
      setLoading(true)

      if (!user) throw new Error('No user logged in')

      const updatedUser = { ...user, ...updates }

      // Update localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      setUser(updatedUser)

      // TODO: Update Firestore document
      // await updateUserDocument(user.id, updates)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update profile'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    resetPassword,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
