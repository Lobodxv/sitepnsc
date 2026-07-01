import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // Inicializa o cliente com a chave de serviço (acesso total)
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SERVICE_ROLE_KEY') ?? ''
  )

  // Extrai o e-mail do corpo da requisição
  const { email } = await req.json()

  // Realiza a inserção na tabela admin_users ignorando RLS
  const { error } = await supabaseAdmin
    .from('admin_users')
    .insert({ email: email.toLowerCase() })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  }

  return new Response(JSON.stringify({ message: "Admin registrado com sucesso" }), { status: 200 })
})