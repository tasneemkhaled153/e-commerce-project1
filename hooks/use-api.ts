"use client"

import { useState, useEffect } from "react"

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(apiCall: () => Promise<T>, dependencies: any[] = []): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))
        const result = await apiCall()

        if (isMounted) {
          setState({ data: result, loading: false, error: null })
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : "An error occurred",
          })
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, dependencies)

  return state
}

export function useAsyncAction<T extends any[], R>(action: (...args: T) => Promise<R>) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = async (...args: T): Promise<R | null> => {
    try {
      setLoading(true)
      setError(null)
      const result = await action(...args)
      return result
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
      return null
    } finally {
      setLoading(false)
    }
  }

  return { execute, loading, error }
}
