/**
 * User Service
 *
 * Handles Firestore queries related to user profiles,
 * preferences, and account management.
 */

import {
  db,
  getCurrentUserId,
} from '@/lib/firebase'
import { User } from '@/types'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore'

const USERS_COLLECTION = 'users'

/**
 * Create or initialize user profile
 */
export async function initializeUserProfile(
  userId: string,
  userData: {
    email: string
    name: string
  }
): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, userId)

  await setDoc(docRef, {
    email: userData.email,
    name: userData.name,
    avatar: null,
    createdAt: Timestamp.now(),
    totalSpent: 0,
    totalCreations: 0,
    totalOrders: 0,
    badges: [],
    roles: ['user'],
    status: 'active',
    socialLinks: {},
    preferences: {
      newsletter: true,
      notifications: true,
      privateProfile: false,
      darkMode: false,
    },
    emailVerified: false,
    twoFactorEnabled: false,
  })
}

/**
 * Get user profile by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  const docRef = doc(db, USERS_COLLECTION, userId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return null
  }

  return { id: docSnap.id, ...docSnap.data() } as User
}

/**
 * Get current user profile
 */
export async function getCurrentUserProfile(): Promise<User | null> {
  const userId = getCurrentUserId()
  if (!userId) {
    return null
  }

  return getUserById(userId)
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<User>
): Promise<void> {
  const currentUserId = getCurrentUserId()
  if (!currentUserId || currentUserId !== userId) {
    throw new Error('Not authorized to update this profile')
  }

  const docRef = doc(db, USERS_COLLECTION, userId)
  await updateDoc(docRef, updates)
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  userId: string,
  preferences: {
    newsletter?: boolean
    notifications?: boolean
    privateProfile?: boolean
    darkMode?: boolean
  }
): Promise<void> {
  const currentUserId = getCurrentUserId()
  if (!currentUserId || currentUserId !== userId) {
    throw new Error('Not authorized to update preferences')
  }

  const docRef = doc(db, USERS_COLLECTION, userId)
  const user = await getUserById(userId)

  if (!user) {
    throw new Error('User not found')
  }

  await updateDoc(docRef, {
    preferences: {
      ...user.preferences,
      ...preferences,
    },
  })
}

/**
 * Update social links
 */
export async function updateSocialLinks(
  userId: string,
  socialLinks: {
    instagram?: string
    tiktok?: string
    twitter?: string
  }
): Promise<void> {
  const currentUserId = getCurrentUserId()
  if (!currentUserId || currentUserId !== userId) {
    throw new Error('Not authorized to update social links')
  }

  const docRef = doc(db, USERS_COLLECTION, userId)
  await updateDoc(docRef, {
    socialLinks,
  })
}

/**
 * Add badge to user
 */
export async function addBadgeToUser(userId: string, badgeId: string): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, userId)
  const user = await getUserById(userId)

  if (!user) {
    throw new Error('User not found')
  }

  if (user.badges.includes(badgeId)) {
    return // Badge already exists
  }

  await updateDoc(docRef, {
    badges: [...user.badges, badgeId],
  })
}

/**
 * Increment user stats
 */
export async function incrementUserStats(
  userId: string,
  stats: {
    totalSpent?: number
    totalCreations?: number
    totalOrders?: number
  }
): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, userId)
  const user = await getUserById(userId)

  if (!user) {
    throw new Error('User not found')
  }

  const updates: any = {}

  if (stats.totalSpent !== undefined) {
    updates.totalSpent = user.totalSpent + stats.totalSpent
  }

  if (stats.totalCreations !== undefined) {
    updates.totalCreations = user.totalCreations + stats.totalCreations
  }

  if (stats.totalOrders !== undefined) {
    updates.totalOrders = user.totalOrders + stats.totalOrders
  }

  await updateDoc(docRef, updates)
}

/**
 * Get top creators
 */
export async function getTopCreators(
  options: {
    limit?: number
    sortBy?: 'totalCreations' | 'totalSpent'
  } = {}
): Promise<User[]> {
  const sortField = options.sortBy || 'totalCreations'

  const constraints = [
    where('status', '==', 'active'),
    where('privateProfile', '==', false),
    orderBy(sortField, 'desc'),
    limit(options.limit || 10),
  ]

  const q = query(collection(db, USERS_COLLECTION), ...constraints)
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User))
}

/**
 * Get user by email (for admin)
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const q = query(
    collection(db, USERS_COLLECTION),
    where('email', '==', email)
  )

  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() } as User
}

/**
 * Check if user email exists
 */
export async function userEmailExists(email: string): Promise<boolean> {
  const user = await getUserByEmail(email)
  return user !== null
}

/**
 * Ban user (admin)
 */
export async function banUser(userId: string, reason?: string): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, userId)
  await updateDoc(docRef, {
    status: 'banned',
  })
}

/**
 * Unban user (admin)
 */
export async function unbanUser(userId: string): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, userId)
  await updateDoc(docRef, {
    status: 'active',
  })
}

/**
 * Get user statistics
 */
export async function getUserStatistics(): Promise<{
  totalUsers: number
  activeUsers: number
  bannedUsers: number
  averageSpent: number
}> {
  const q = query(collection(db, USERS_COLLECTION))
  const snapshot = await getDocs(q)

  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User))

  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === 'active').length
  const bannedUsers = users.filter((u) => u.status === 'banned').length
  const averageSpent = users.length > 0
    ? users.reduce((sum, u) => sum + u.totalSpent, 0) / users.length
    : 0

  return {
    totalUsers,
    activeUsers,
    bannedUsers,
    averageSpent,
  }
}

/**
 * Delete user profile (account closure - GDPR)
 */
export async function deleteUserProfile(userId: string): Promise<void> {
  const currentUserId = getCurrentUserId()
  if (!currentUserId || currentUserId !== userId) {
    throw new Error('Not authorized to delete this profile')
  }

  // Note: This only deletes Firestore data
  // Firebase Auth deletion should be done separately in auth service
  const docRef = doc(db, USERS_COLLECTION, userId)
  await updateDoc(docRef, {
    status: 'deleted',
    // Don't actually delete, just mark as deleted for GDPR compliance
  })
}
