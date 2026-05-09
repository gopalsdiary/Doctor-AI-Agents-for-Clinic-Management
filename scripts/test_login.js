import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'test@doctorai.com',
    password: 'password123',
  })
  if (error) {
    console.error('Error logging in:', error.message)
  } else {
    console.log('Successfully logged in! Session token:', data.session?.access_token.substring(0, 20) + '...')
  }
}

login()
