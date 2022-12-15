import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_APIKEY

export const supabase = createClient(supabaseUrl, supabaseKey)

const { data: { session } } = await supabase.auth.getSession()
// console.log(session);

const user = supabase.auth.getUser()
console.log(user);





