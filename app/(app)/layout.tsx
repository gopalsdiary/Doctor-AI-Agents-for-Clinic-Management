import React from 'react'
import Sidebar from '@/components/layout/sidebar'
import Topbar from '@/components/layout/topbar'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col glass-sidebar z-30">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl pointer-events-none -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl pointer-events-none -ml-48 -mb-48" />

        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative z-10 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
