import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Adicione este cabeçalho para permitir chamadas do seu site
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Lida com a requisição de pré-verificação (CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SERVICE_ROLE_KEY') ?? ''
  )

  // Extrai o e-mail apenas se o método for POST
  const { email } = await req.json()

  const { error } = await supabaseAdmin
    .from('admin_users')
    .insert({ email: email.toLowerCase() })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 400, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })
  }

  return new Response(JSON.stringify({ message: "Admin registrado com sucesso" }), { 
    status: 200, 
    headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
  })
})