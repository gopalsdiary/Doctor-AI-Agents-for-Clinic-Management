import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function create() {
  const { data, error } = await supabase.auth.signUp({
    email: 'test@doctorai.com',
    password: 'password123',
    options: {
      data: {
        full_name: 'Test Doctor',
      }
    }
  })
  if (error) {
    console.error('Error creating user:', error.message)
  } else {
    console.log('User created:', data.user?.email)
  }
}

create()
