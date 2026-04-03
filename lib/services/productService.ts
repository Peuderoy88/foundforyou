/**
 * Product Service
 *
 * Handles all Firestore queries related to products,
 * including CRUD operations, filtering, search, and pagination.
 */

import {
  db,
  getCurrentUserId,
} from '@/lib/firebase'
import { Product } from '@/types'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  WriteBatch,
  writeBatch,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore'

const PRODUCTS_COLLECTION = 'products'

/**
 * Get all products with filtering, sorting, and pagination
 */
export async function getProducts(
  options: {
    status?: string
    template?: string
    minPrice?: number
    maxPrice?: number
    style?: string
    tags?: string[]
    search?: string
    sortBy?: 'newest' | 'price-low' | 'price-high' | 'rating'
    limit?: number
    startAfterDoc?: QueryDocumentSnapshot<DocumentData>
  } = {}
): Promise<{ products: Product[]; nextDoc: QueryDocumentSnapshot<DocumentData> | null }> {
  const constraints: QueryConstraint[] = [
    where('visibility', '==', 'public'),
  ]

  if (options.status) {
    constraints.push(where('status', '==', options.status))
  }

  if (options.template) {
    constraints.push(where('template', '==', options.template))
  }

  if (options.style) {
    constraints.push(where('style', '==', options.style))
  }

  if (options.tags && options.tags.length > 0) {
    constraints.push(where('tags', 'array-contains-any', options.tags))
  }

  // Determine sort order
  let sortConstraint: QueryConstraint = orderBy('createdAt', 'desc')
  if (options.sortBy === 'price-low') {
    sortConstraint = orderBy('sellingPrice', 'asc')
  } else if (options.sortBy === 'price-high') {
    sortConstraint = orderBy('sellingPrice', 'desc')
  } else if (options.sortBy === 'rating') {
    sortConstraint = orderBy('ratings.avgRating', 'desc')
  }

  constraints.push(sortConstraint)

  // Pagination
  constraints.push(limit((options.limit || 24) + 1)) // +1 to detect if there are more

  if (options.startAfterDoc) {
    constraints.push(startAfter(options.startAfterDoc))
  }

  const q = query(collection(db, PRODUCTS_COLLECTION), ...constraints)
  const snapshot = await getDocs(q)

  const products: Product[] = []
  let nextDoc: QueryDocumentSnapshot<DocumentData> | null = null

  snapshot.forEach((docSnap, index) => {
    if (index < (options.limit || 24)) {
      products.push({ id: docSnap.id, ...docSnap.data() } as Product)
    } else {
      nextDoc = docSnap
    }
  })

  return { products, nextDoc }
}

/**
 * Get a single product by ID
 */
export async function getProductById(productId: string): Promise<Product | null> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return null
  }

  return { id: docSnap.id, ...docSnap.data() } as Product
}

/**
 * Get products by creator ID
 */
export async function getProductsByCreator(
  creatorId: string,
  options: { limit?: number; status?: string } = {}
): Promise<Product[]> {
  const constraints: QueryConstraint[] = [
    where('artistId', '==', creatorId),
    orderBy('createdAt', 'desc'),
  ]

  if (options.status) {
    constraints.push(where('status', '==', options.status))
  }

  constraints.push(limit(options.limit || 100))

  const q = query(collection(db, PRODUCTS_COLLECTION), ...constraints)
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product))
}

/**
 * Get trending products (most viewed, recent)
 */
export async function getTrendingProducts(days: number = 7): Promise<Product[]> {
  const dateThreshold = new Date()
  dateThreshold.setDate(dateThreshold.getDate() - days)

  const constraints: QueryConstraint[] = [
    where('visibility', '==', 'public'),
    where('status', '==', 'available'),
    where('createdAt', '>=', Timestamp.fromDate(dateThreshold)),
    orderBy('createdAt', 'desc'),
    orderBy('socialShare.shareCount', 'desc'),
    limit(20),
  ]

  const q = query(collection(db, PRODUCTS_COLLECTION), ...constraints)
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product))
}

/**
 * Create a new product
 */
export async function createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<string> {
  const userId = getCurrentUserId()
  if (!userId) {
    throw new Error('User not authenticated')
  }

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...product,
    artistId: userId,
    createdAt: Timestamp.now(),
  })

  return docRef.id
}

/**
 * Update a product
 */
export async function updateProduct(
  productId: string,
  updates: Partial<Product>
): Promise<void> {
  const userId = getCurrentUserId()
  if (!userId) {
    throw new Error('User not authenticated')
  }

  // Verify ownership
  const product = await getProductById(productId)
  if (!product || product.artistId !== userId) {
    throw new Error('Not authorized to update this product')
  }

  const docRef = doc(db, PRODUCTS_COLLECTION, productId)
  await updateDoc(docRef, updates)
}

/**
 * Delete a product
 */
export async function deleteProduct(productId: string): Promise<void> {
  const userId = getCurrentUserId()
  if (!userId) {
    throw new Error('User not authenticated')
  }

  // Verify ownership
  const product = await getProductById(productId)
  if (!product || product.artistId !== userId) {
    throw new Error('Not authorized to delete this product')
  }

  const docRef = doc(db, PRODUCTS_COLLECTION, productId)
  await deleteDoc(docRef)
}

/**
 * Batch update products (for admin)
 */
export async function batchUpdateProducts(
  updates: { productId: string; data: Partial<Product> }[]
): Promise<void> {
  const batch = writeBatch(db)

  updates.forEach(({ productId, data }) => {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId)
    batch.update(docRef, data)
  })

  await batch.commit()
}

/**
 * Increment product sold count
 */
export async function incrementProductSold(productId: string, quantity: number = 1): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId)
  const product = await getProductById(productId)

  if (!product) {
    throw new Error('Product not found')
  }

  const newSoldCount = product.sold + quantity
  const newStatus = newSoldCount >= product.limit ? 'sold-out' : product.status

  await updateDoc(docRef, {
    sold: newSoldCount,
    status: newStatus,
  })
}

/**
 * Get related products (same tags, template)
 */
export async function getRelatedProducts(
  productId: string,
  limit: number = 4
): Promise<Product[]> {
  const product = await getProductById(productId)
  if (!product) {
    return []
  }

  const constraints: QueryConstraint[] = [
    where('visibility', '==', 'public'),
    where('status', '==', 'available'),
    where('template', '==', product.template),
    orderBy('ratings.avgRating', 'desc'),
    limit(limit + 1),
  ]

  const q = query(collection(db, PRODUCTS_COLLECTION), ...constraints)
  const snapshot = await getDocs(q)

  return snapshot.docs
    .filter((doc) => doc.id !== productId)
    .slice(0, limit)
    .map((doc) => ({ id: doc.id, ...doc.data() } as Product))
}

/**
 * Search products by text (prompt, title, description)
 * Note: For production, use Algolia or Firebase Search extension
 */
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  const searchLower = searchTerm.toLowerCase()

  const constraints: QueryConstraint[] = [
    where('visibility', '==', 'public'),
    where('status', '==', 'available'),
    orderBy('createdAt', 'desc'),
    limit(50),
  ]

  const q = query(collection(db, PRODUCTS_COLLECTION), ...constraints)
  const snapshot = await getDocs(q)

  // Client-side filtering (TODO: implement server-side search)
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Product))
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.prompt.toLowerCase().includes(searchLower) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    )
}

/**
 * Get inventory status for a product
 */
export async function getInventoryStatus(productId: string): Promise<{
  limit: number
  sold: number
  remaining: number
  status: string
}> {
  const product = await getProductById(productId)
  if (!product) {
    throw new Error('Product not found')
  }

  return {
    limit: product.limit,
    sold: product.sold,
    remaining: product.limit - product.sold,
    status: product.status,
  }
}
