/**
 * Order Service
 *
 * Handles all Firestore queries related to orders,
 * including creation, status updates, and retrieval.
 */

import {
  db,
  getCurrentUserId,
} from '@/lib/firebase'
import { Order } from '@/types'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  writeBatch,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore'

const ORDERS_COLLECTION = 'orders'

/**
 * Create a new order
 */
export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<string> {
  const userId = getCurrentUserId()
  if (!userId) {
    throw new Error('User not authenticated')
  }

  if (orderData.userId !== userId) {
    throw new Error('Cannot create order for another user')
  }

  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
    ...orderData,
    createdAt: Timestamp.now(),
  })

  return docRef.id
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  const docRef = doc(db, ORDERS_COLLECTION, orderId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return null
  }

  return { id: docSnap.id, ...docSnap.data() } as Order
}

/**
 * Get all orders for current user
 */
export async function getUserOrders(
  options: {
    limit?: number
    status?: string
  } = {}
): Promise<Order[]> {
  const userId = getCurrentUserId()
  if (!userId) {
    throw new Error('User not authenticated')
  }

  const constraints: QueryConstraint[] = [
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  ]

  if (options.status) {
    constraints.push(where('status', '==', options.status))
  }

  constraints.push(limit(options.limit || 50))

  const q = query(collection(db, ORDERS_COLLECTION), ...constraints)
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order))
}

/**
 * Get all orders (admin only - check permissions elsewhere)
 */
export async function getAllOrders(
  options: {
    limit?: number
    status?: string
    startDate?: Date
    endDate?: Date
  } = {}
): Promise<Order[]> {
  const constraints: QueryConstraint[] = [
    orderBy('createdAt', 'desc'),
  ]

  if (options.status) {
    constraints.push(where('status', '==', options.status))
  }

  if (options.startDate) {
    constraints.push(where('createdAt', '>=', Timestamp.fromDate(options.startDate)))
  }

  if (options.endDate) {
    constraints.push(where('createdAt', '<=', Timestamp.fromDate(options.endDate)))
  }

  constraints.push(limit(options.limit || 100))

  const q = query(collection(db, ORDERS_COLLECTION), ...constraints)
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order))
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: string,
  additionalUpdates?: Partial<Order>
): Promise<void> {
  const docRef = doc(db, ORDERS_COLLECTION, orderId)

  const updates: any = {
    status,
    [`timeline.${getStatusTimestampField(status)}`]: Timestamp.now(),
  }

  if (additionalUpdates) {
    Object.assign(updates, additionalUpdates)
  }

  await updateDoc(docRef, updates)
}

/**
 * Get status timestamp field name
 */
function getStatusTimestampField(status: string): string {
  const statusFields: { [key: string]: string } = {
    'pending': 'createdAt',
    'processing': 'processingAt',
    'shipped': 'shippedAt',
    'delivered': 'deliveredAt',
    'refunded': 'refundedAt',
  }
  return statusFields[status] || 'updatedAt'
}

/**
 * Add tracking number to order
 */
export async function addTrackingNumber(orderId: string, trackingNumber: string): Promise<void> {
  const docRef = doc(db, ORDERS_COLLECTION, orderId)
  await updateDoc(docRef, {
    trackingNumber,
    status: 'shipped',
    'timeline.shippedAt': Timestamp.now(),
  })
}

/**
 * Process refund
 */
export async function processRefund(
  orderId: string,
  reason: string,
  refundAmount: number
): Promise<void> {
  const docRef = doc(db, ORDERS_COLLECTION, orderId)
  await updateDoc(docRef, {
    status: 'refunded',
    refundReason: reason,
    'timeline.refundedAt': Timestamp.now(),
  })
}

/**
 * Get orders for a specific product (for creators)
 */
export async function getOrdersForProduct(
  productId: string,
  options: { limit?: number } = {}
): Promise<Order[]> {
  const constraints: QueryConstraint[] = [
    orderBy('createdAt', 'desc'),
    limit(options.limit || 100),
  ]

  const q = query(collection(db, ORDERS_COLLECTION), ...constraints)
  const snapshot = await getDocs(q)

  // Client-side filtering for now (TODO: better approach)
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Order))
    .filter((order) => order.items.some((item) => item.productId === productId))
}

/**
 * Get order statistics (admin)
 */
export async function getOrderStatistics(
  options: {
    startDate?: Date
    endDate?: Date
  } = {}
): Promise<{
  totalOrders: number
  totalRevenue: number
  avgOrderValue: number
  completedOrders: number
  refundedOrders: number
}> {
  const orders = await getAllOrders({
    startDate: options.startDate,
    endDate: options.endDate,
  })

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const completedOrders = orders.filter((o) => o.status === 'delivered').length
  const refundedOrders = orders.filter((o) => o.status === 'refunded').length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  return {
    totalOrders,
    totalRevenue,
    avgOrderValue,
    completedOrders,
    refundedOrders,
  }
}

/**
 * Batch update order status (for bulk operations)
 */
export async function batchUpdateOrderStatus(
  orderIds: string[],
  status: string
): Promise<void> {
  const batch = writeBatch(db)

  orderIds.forEach((orderId) => {
    const docRef = doc(db, ORDERS_COLLECTION, orderId)
    batch.update(docRef, {
      status,
      [`timeline.${getStatusTimestampField(status)}`]: Timestamp.now(),
    })
  })

  await batch.commit()
}

/**
 * Check if order contains product
 */
export async function orderContainsProduct(orderId: string, productId: string): Promise<boolean> {
  const order = await getOrderById(orderId)
  if (!order) {
    return false
  }

  return order.items.some((item) => item.productId === productId)
}

/**
 * Get total spent by user
 */
export async function getTotalUserSpent(userId: string): Promise<number> {
  const constraints: QueryConstraint[] = [
    where('userId', '==', userId),
    where('status', '==', 'delivered'),
  ]

  const q = query(collection(db, ORDERS_COLLECTION), ...constraints)
  const snapshot = await getDocs(q)

  return snapshot.docs.reduce((total, doc) => {
    const order = doc.data() as Order
    return total + order.total
  }, 0)
}
