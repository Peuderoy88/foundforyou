/**
 * useFirestore Hook
 *
 * Custom React hook for common Firestore operations.
 * Provides loading, error, and data states.
 */

import { useState, useEffect, useCallback } from 'react'

interface UseFirestoreOptions {
  initialData?: any
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
}

interface UseFirestoreResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * Generic hook for fetching Firestore data
 */
export function useFirestore<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = [],
  options: UseFirestoreOptions = {}
): UseFirestoreResult<T> {
  const [data, setData] = useState<T | null>(options.initialData || null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFn()
      setData(result)
      options.onSuccess?.(result)
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)
      options.onError?.(error)
    } finally {
      setLoading(false)
    }
  }, [fetchFn, options])

  useEffect(() => {
    refetch()
  }, dependencies)

  return { data, loading, error, refetch }
}

/**
 * Hook for Firestore mutations (create, update, delete)
 */
interface UseMutationResult<T, R = void> {
  data: R | null
  loading: boolean
  error: Error | null
  mutate: (params: T) => Promise<R>
  reset: () => void
}

export function useFirestoreMutation<T, R = void>(
  mutateFn: (params: T) => Promise<R>,
  options: UseFirestoreOptions = {}
): UseMutationResult<T, R> {
  const [data, setData] = useState<R | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const mutate = useCallback(
    async (params: T) => {
      try {
        setLoading(true)
        setError(null)
        const result = await mutateFn(params)
        setData(result)
        options.onSuccess?.(result)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        options.onError?.(error)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [mutateFn, options]
  )

  const reset = useCallback(() => {
    setData(null)
    setLoading(false)
    setError(null)
  }, [])

  return { data, loading, error, mutate, reset }
}
