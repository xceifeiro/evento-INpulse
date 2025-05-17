import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Cria um cliente Supabase para uso no lado do cliente
export const createClientComponentClient = () => {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// Cria um cliente Supabase para uso no lado do servidor
export const createServerComponentClient = () => {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}
