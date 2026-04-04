/**
 * Authentication Service
 */
import { auth } from '@/lib/firebase'
import { initializeUserProfile } from '@/lib/services/userService'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'

export async function signUp(
  email: string,
  password: string,
  displayName: string
): Promise<FirebaseUser> {
  await setPersistence(auth, browserLocalPersistence)
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user
  await updateProfile(user, { displayName })
  await initializeUserProfile(user.uid, { email, name: displayName })
  return user
}

export async function signIn(email: string, password: string): Promise<FirebaseUser> {
  await setPersistence(auth, browserLocalPersistence)
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export async function logout(): Promise<void> {
  await signOut(auth)
}

export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
}

export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser
}

export function onAuthStateChanged(callback: (user: FirebaseUser | null) => void): () => void {
  return auth.onAuthStateChanged(callback)
}

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  if (password.length < 8) errors.push('Password must be at least 8 characters')
  if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter')
  if (!/[0-9]/.test(password)) errors.push('Password must contain at least one number')
  return { isValid: errors.length === 0, errors }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
