"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createClientComponentClient } from "@/lib/supabase/client"
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js"

// Hook para consultas otimizadas ao Supabase
export function useSupabaseQuery<T>(key: string[], queryFn: () => PostgrestFilterBuilder<any, any, T[]>, options = {}) {
  const supabase = createClientComponentClient()

  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data, error } = await queryFn()

      if (error) {
        throw error
      }

      return data
    },
    ...options,
  })
}

// Hook para mutações otimizadas ao Supabase
export function useSupabaseMutation<T>(
  table: string,
  options: {
    onSuccess?: (data: T) => void
    invalidateQueries?: string[][]
  } = {},
) {
  const supabase = createClientComponentClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (variables: { type: "insert" | "update" | "delete"; data: any; match?: Record<string, any> }) => {
      const { type, data, match } = variables

      let query

      if (type === "insert") {
        query = supabase.from(table).insert(data).select().single()
      } else if (type === "update") {
        query = supabase.from(table).update(data)

        if (match) {
          Object.entries(match).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }

        query = query.select().single()
      } else if (type === "delete") {
        query = supabase.from(table).delete()

        if (match) {
          Object.entries(match).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }

        query = query.select().single()
      }

      const { data: result, error } = await query

      if (error) {
        throw error
      }

      return result
    },
    onSuccess: (data) => {
      // Invalidar queries relacionadas
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key })
        })
      }

      if (options.onSuccess) {
        options.onSuccess(data as T)
      }
    },
  })
}
