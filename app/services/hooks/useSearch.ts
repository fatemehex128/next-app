'use client'

import { useState, useEffect, useCallback } from 'react'
import { searchMulti } from '@/app/services/endpoints'
import type { ApiResponse, SearchItem } from '@/app/services/types'

interface UseSearchOptions {
  debounceMs?: number
  page?: number
}

interface UseSearchReturn {
  results: SearchItem[] | null
  loading: boolean
  error: string | null
  search: (query: string) => void
  clearResults: () => void
}

export function useSearch(options?: UseSearchOptions): UseSearchReturn {
  const [results, setResults] = useState<SearchItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const debounceMs = options?.debounceMs ?? 500
  const page = options?.page ?? 1

  useEffect(() => {
    if (!query.trim()) {
      setResults(null)
      return
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true)
        setError(null)
        const response: ApiResponse<SearchItem> = await searchMulti(query, page)
        setResults(response.results ?? [])
      } catch (err: any) {
        setError(err?.message ?? 'Failed to search')
        setResults(null)
      } finally {
        setLoading(false)
      }
    }, debounceMs)

    return () => clearTimeout(timeout)
  }, [query, page, debounceMs])

  const search = useCallback((newQuery: string) => {
    setQuery(newQuery)
  }, [])

  const clearResults = useCallback(() => {
    setQuery('')
    setResults(null)
    setError(null)
  }, [])

  return { results, loading, error, search, clearResults }
}
