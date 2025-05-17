import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"
import { LRUCache } from "lru-cache"

// Cache LRU para armazenar resultados de consultas
const queryCache = new LRUCache<string, any>({
  max: 100, // Máximo de 100 itens no cache
  ttl: 1000 * 60 * 5, // 5 minutos de TTL
})

// Cliente Supabase com cache para o lado do cliente
export const createOptimizedClientComponentClient = () => {
  const client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  // Interceptar e cachear consultas SELECT
  const originalFrom = client.from.bind(client)

  client.from = (table: string) => {
    const builder = originalFrom(table)
    const originalSelect = builder.select.bind(builder)

    builder.select = (columns?: string) => {
      const selectBuilder = originalSelect(columns)
      const originalExecute = selectBuilder.then.bind(selectBuilder)

      selectBuilder.then = async function (
        onfulfilled?: ((value: any) => any) | undefined,
        onrejected?: ((reason: any) => any) | undefined,
      ) {
        // Gerar uma chave de cache baseada na consulta
        const cacheKey = `${table}:${columns || "*"}:${JSON.stringify(this.url.searchParams.toString())}`

        // Verificar se a resposta está em cache
        const cachedResponse = queryCache.get(cacheKey)

        if (cachedResponse) {
          return Promise.resolve(cachedResponse).then(onfulfilled, onrejected)
        }

        // Se não estiver em cache, executar a consulta
        const response = await originalExecute.call(this, onfulfilled, onrejected)

        // Armazenar em cache se for bem-sucedido
        if (!response.error && response.data) {
          queryCache.set(cacheKey, response)
        }

        return response
      }

      return selectBuilder
    }

    return builder
  }

  return client
}

// Cliente Supabase para o lado do servidor (sem cache)
export const createOptimizedServerComponentClient = () => {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}
