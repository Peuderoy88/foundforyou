'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
} from 'firebase/auth'
import { auth } from '@/src/lib/firebase'
import { createUserDocument, getUserDocument, updateUserDocument } from '@/src/lib/services/firebaseService'

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

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is logged in - fetch from Firestore
          const userData = await getUserDocument(firebaseUser.uid)
          if (userData) {
            setUser(userData as User)
          } else {
            // Fallback if Firestore doc doesn't exist
            const newUser: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              role: 'user',
              badges: [],
              createdAt: new Date(firebaseUser.metadata?.creationTime || 0),
              isAdmin: false,
            }
            setUser(newUser)
          }
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error('Error fetching user data:', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setError(null)
      setLoading(true)

      const { user: authUser } = await createUserWithEmailAndPassword(auth, email, password)

      // Update display name
      await updateFirebaseProfile(authUser, { displayName: name })

      // Create user document in Firestore
      const newUser: User = {
        id: authUser.uid,
        email,
        name,
        role: 'user',
        badges: [],
        createdAt: new Date(),
        isAdmin: false,
      }

      await createUserDocument(authUser.uid, newUser)
      setUser(newUser)
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

      const { user: authUser } = await signInWithEmailAndPassword(auth, email, password)

      // Fetch user document from Firestore
      const userData = await getUserDocument(authUser.uid)
      if (userData) {
        setUser(userData as User)
      }
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

      await firebaseSignOut(auth)
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

      // TODO: Implement Firebase Google Auth with GoogleAuthProvider
      // For now, throw error
      throw new Error('Google authentication not yet implemented')
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

      await sendPasswordResetEmail(auth, email)
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

      // Update Firestore document
      await updateUserDocument(user.id, updates)
      setUser(updatedUser)
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
