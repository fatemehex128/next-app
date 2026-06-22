'use client'

import { useState, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchMulti } from '@/app/services/endpoints'
import type { ApiResponse, SearchItem } from '@/app/services/types'

// تعریف تایپ‌های مورد نیاز برای hook
interface UseSearchOptions {
  debounceMs?: number  // مدت تاخیر جستجو (میلی‌ثانیه)
  page?: number        // شماره صفحه نتایج
}

export function useSearch(options?: UseSearchOptions) {
  // متغیر state برای query موجودی (typing کردن)
  const [query, setQuery] = useState('')

  // متغیر state برای query تاخیر‌شده (برای API call)
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // تنظیمات مقادیر پیش‌فرض
  const debounceMs = options?.debounceMs ?? 500
  const page = options?.page ?? 1

  // تابع جستجو با debouncing
  const search = useCallback(
    (newQuery: string) => {
      // 1️⃣ بروزرسانی فوری state برای UI سریع‌تر
      setQuery(newQuery)

      // 2️⃣ تاخیر هوشمند برای API call
      const timeout = setTimeout(() => {
        // تنها بعد از debounceMs میلی‌ثانیه، query تاخیر‌شده را بروزرسانی کنیں
        setDebouncedQuery(newQuery)
      }, debounceMs)

      // 3️⃣ اگر کاربر دوباره تایپ کند، timeout قبلی را لغو کنید
      return () => clearTimeout(timeout)
    },
    [debounceMs]
  )

  // تابع برای پاک کردن نتایج
  const clearResults = useCallback(() => {
    setQuery('')
    setDebouncedQuery('')
  }, [])

  // TanStack Query برای مدیریت API call
  const {
    data: results = null,
    isLoading: loading,
    error,
    refetch,
  } = useQuery<SearchItem[] | null>({
    // 🔑 کلید Query - هر تغییر در این کلید، refetch می‌کند
    queryKey: ['search', debouncedQuery, page],

    // تابع برای fetch کردن داده‌ها
    queryFn: async () => {
      // اگر query خالی بود، null برگردانید
      if (!debouncedQuery.trim()) {
        return null
      }

      // فراخوانی endpoint برای جستجو
      const response: ApiResponse<SearchItem> = await searchMulti(
        debouncedQuery,
        page
      )

      // برگرداندن نتایج
      return response.results ?? []
    },

    // ⏸️ فقط زمانی fetch کن که query موجود باشد (خالی نیست)
    enabled: !!debouncedQuery.trim(),
  })

  // برگرداندن تمام چیزهای لازم برای component
  return {
    results,              // نتایج جستجو
    loading,              // آیا در حال بارگذاری؟
    error: error?.message ?? null,  // پیغام خطا اگر هست
    search,               // تابع برای شروع جستجو
    clearResults,         // تابع برای پاک کردن
    refetch,              // تابع برای دوباره درخواست
  }
}
