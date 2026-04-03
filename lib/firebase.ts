/**
 * Firebase Configuration & Initialization
 *
 * This module initializes Firebase and provides utility functions
 * for Firestore queries and authentication.
 */

import { initializeApp, getApps } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore, initializeFirestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

// Firebase Configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase (only if not already initialized)
let app = initializeApp(firebaseConfig)
if (getApps().length > 1) {
  app = getApps()[0]
}

// Initialize Firestore with caching and persistence settings
let db: Firestore
try {
  db = getFirestore(app)
  // Note: Persistence is automatically enabled on web
} catch (error) {
  // Firestore might already be initialized
  db = getFirestore(app)
}

// Get Auth instance
const auth: Auth = getAuth(app)

// Get Storage instance
const storage: FirebaseStorage = getStorage(app)

/**
 * Export Firebase services for use throughout the app
 */
export { app, auth, db, storage }

/**
 * Helper function to check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null
}

/**
 * Helper function to get current user ID
 */
export const getCurrentUserId = (): string | null => {
  return auth.currentUser?.uid || null
}

/**
 * Helper function to get current user email
 */
export const getCurrentUserEmail = (): string | null => {
  return auth.currentUser?.email || null
}

/**
 * Helper function to get current user
 */
export const getCurrentUser = () => {
  return auth.currentUser
}
