"use client"

import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Stethoscope, 
  Settings, 
  Bot, 
  CreditCard,
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/app/dashboard' },
  { label: 'Calendar', icon: Calendar, href: '/app/calendar' },
  { label: 'Appointments', icon: Stethoscope, href: '/app/appointments' },
  { label: 'Patients', icon: Users, href: '/app/patients' },
  { label: 'Services', icon: Sparkles, href: '/app/services' },
  { label: 'AI Settings', icon: Bot, href: '/app/ai-settings' },
]

const Sidebar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const supabase = createClient()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }

      toast.success('Signed out')
      navigate('/login')
    } catch {
      toast.error('Unable to sign out')
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-6">
        <Link to="/app/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none text-slate-900 tracking-tight">Doctor<span className="text-teal-600">AI</span></span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Management</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} to={item.href}>
              <div className={cn(
                "group flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 mb-1",
                isActive 
                  ? "bg-teal-50 text-teal-700 shadow-sm shadow-teal-100/50" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}>
                <div className="flex items-center gap-3">
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-teal-600" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* AI Assistant Badge */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-hero p-4 rounded-2xl relative overflow-hidden group cursor-pointer">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl" />
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="text-xs font-bold text-white mb-1">AI Agent Active</div>
            <div className="text-[10px] text-teal-100 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Monitoring widget
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-100 space-y-1">
        <Link to="/app/settings">
          <div className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors",
            pathname === '/app/settings' && "text-teal-700 bg-teal-50"
          )}>
            <Settings className="w-5 h-5" />
            <span className="text-sm font-semibold">Settings</span>
          </div>
        </Link>
        <Link to="/app/billing">
          <div className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors",
            pathname === '/app/billing' && "text-teal-700 bg-teal-50"
          )}>
            <CreditCard className="w-5 h-5" />
            <span className="text-sm font-semibold">Billing</span>
          </div>
        </Link>
        
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors mt-2">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
