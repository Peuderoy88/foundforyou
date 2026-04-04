import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  WriteBatch,
  writeBatch,
} from 'firebase/firestore'
import { firestore } from '@/src/lib/firebase'

// ============================================
// USER OPERATIONS
// ============================================

export const createUserDocument = async (userId: string, userData: any) => {
  try {
    await setDoc(doc(firestore, 'users', userId), {
      ...userData,
      createdAt: new Date(),
    })
  } catch (error) {
    console.error('Error creating user document:', error)
    throw error
  }
}

export const getUserDocument = async (userId: string) => {
  try {
    const docRef = doc(firestore, 'users', userId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
  } catch (error) {
    console.error('Error getting user document:', error)
    throw error
  }
}

export const updateUserDocument = async (userId: string, updates: any) => {
  try {
    await updateDoc(doc(firestore, 'users', userId), updates)
  } catch (error) {
    console.error('Error updating user document:', error)
    throw error
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const q = query(collection(firestore, 'users'), where('email', '==', email))
    const querySnapshot = await getDocs(q)
    return querySnapshot.empty ? null : { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() }
  } catch (error) {
    console.error('Error getting user by email:', error)
    throw error
  }
}

// ============================================
// PRODUCT OPERATIONS
// ============================================

export const getProducts = async (constraints: QueryConstraint[] = []) => {
  try {
    const q = query(collection(firestore, 'products'), ...constraints)
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting products:', error)
    throw error
  }
}

export const getProductById = async (productId: string) => {
  try {
    const docRef = doc(firestore, 'products', productId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
  } catch (error) {
    console.error('Error getting product:', error)
    throw error
  }
}

export const createProduct = async (productData: any) => {
  try {
    const docRef = await addDoc(collection(firestore, 'products'), {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

export const updateProduct = async (productId: string, updates: any) => {
  try {
    await updateDoc(doc(firestore, 'products', productId), {
      ...updates,
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

export const deleteProduct = async (productId: string) => {
  try {
    await deleteDoc(doc(firestore, 'products', productId))
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

// ============================================
// ORDER OPERATIONS
// ============================================

export const createOrder = async (orderData: any) => {
  try {
    const docRef = await addDoc(collection(firestore, 'orders'), {
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

export const getOrderById = async (orderId: string) => {
  try {
    const docRef = doc(firestore, 'orders', orderId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
  } catch (error) {
    console.error('Error getting order:', error)
    throw error
  }
}

export const getUserOrders = async (userId: string) => {
  try {
    const q = query(
      collection(firestore, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting user orders:', error)
    throw error
  }
}

export const updateOrder = async (orderId: string, updates: any) => {
  try {
    await updateDoc(doc(firestore, 'orders', orderId), {
      ...updates,
      updatedAt: new Date(),
    })
  } catch (error) {
    console.error('Error updating order:', error)
    throw error
  }
}

export const getAllOrders = async (constraints: QueryConstraint[] = []) => {
  try {
    const q = query(
      collection(firestore, 'orders'),
      orderBy('createdAt', 'desc'),
      ...constraints,
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting all orders:', error)
    throw error
  }
}

// ============================================
// REVIEW OPERATIONS
// ============================================

export const getProductReviews = async (productId: string) => {
  try {
    const q = query(
      collection(firestore, 'reviews'),
      where('productId', '==', productId),
      orderBy('createdAt', 'desc'),
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting product reviews:', error)
    throw error
  }
}

export const createReview = async (reviewData: any) => {
  try {
    const docRef = await addDoc(collection(firestore, 'reviews'), {
      ...reviewData,
      createdAt: new Date(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating review:', error)
    throw error
  }
}

// ============================================
// AI GENERATION OPERATIONS
// ============================================

export const createAIGeneration = async (genData: any) => {
  try {
    const docRef = await addDoc(collection(firestore, 'aiGenerations'), {
      ...genData,
      createdAt: new Date(),
      status: 'pending',
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating AI generation:', error)
    throw error
  }
}

export const getAIGeneration = async (genId: string) => {
  try {
    const docRef = doc(firestore, 'aiGenerations', genId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null
  } catch (error) {
    console.error('Error getting AI generation:', error)
    throw error
  }
}

export const updateAIGeneration = async (genId: string, updates: any) => {
  try {
    await updateDoc(doc(firestore, 'aiGenerations', genId), updates)
  } catch (error) {
    console.error('Error updating AI generation:', error)
    throw error
  }
}

export const getUserAIGenerations = async (userId: string) => {
  try {
    const q = query(
      collection(firestore, 'aiGenerations'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error getting user AI generations:', error)
    throw error
  }
}

// ============================================
// BATCH OPERATIONS
// ============================================

export const executeBatch = async (callback: (batch: WriteBatch) => void) => {
  try {
    const batch = writeBatch(firestore)
    callback(batch)
    await batch.commit()
  } catch (error) {
    console.error('Error executing batch:', error)
    throw error
  }
}
