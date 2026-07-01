// Public client-side Supabase config.
// Do not place service_role keys, database passwords, or any server secret here.
const RAW_SUPABASE_URL = "https://fwjiazogmqknwssokbht.supabase.co/rest/v1/";

export const SUPABASE_URL = RAW_SUPABASE_URL.replace(/\/rest\/v1\/?$/, "");
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3amlhem9nbXFrbndzc29rYmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NTk5NzcsImV4cCI6MjA5ODQzNTk3N30.elT4aGCrgFDNwnHE8o5eK5pOK7fv2HmTJXcULx81G38";
export const SUPABASE_READY = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);