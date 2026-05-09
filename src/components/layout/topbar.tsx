"use client"

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { 
  Bell, 
  Search, 
  Menu,
  ChevronDown,
  Plus,
  HelpCircle,
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  Settings,
  Bot,
  CreditCard
} from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { NewAppointmentModal } from '@/components/appointments/new-appointment-modal'
import { createClient } from '@/lib/supabase/client'

const mobileNavItems = [
  { label: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Calendar', href: '/app/calendar', icon: Calendar },
  { label: 'Appointments', href: '/app/appointments', icon: Stethoscope },
  { label: 'Patients', href: '/app/patients', icon: Users },
  { label: 'Services', href: '/app/services', icon: Bot },
  { label: 'AI Settings', href: '/app/ai-settings', icon: Bot },
  { label: 'Settings', href: '/app/settings', icon: Settings },
  { label: 'Billing', href: '/app/billing', icon: CreditCard },
]

const Topbar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const supabase = createClient()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
  
  const getPageTitle = () => {
    const segments = pathname.split('/')
    const last = segments[segments.length - 1]
    return last.charAt(0).toUpperCase() + last.slice(1).replace('-', ' ')
  }

  return (
    <header className="h-20 glass border-b border-slate-200/50 px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="lg:hidden text-slate-500" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </Button>
        
        <div className="hidden md:flex items-center gap-3 bg-slate-100/50 border border-slate-200/50 rounded-2xl px-4 py-2 w-full max-w-md focus-within:ring-2 ring-teal-500/20 transition-all">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search patients, appointments, or invoices..." 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-600 placeholder:text-slate-400"
          />
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] text-slate-400 font-sans">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] text-slate-400 font-sans">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={() => setIsModalOpen(true)} variant="outline" className="hidden sm:flex border-teal-200 bg-teal-50/30 text-teal-700 hover:bg-teal-50 gap-2 font-bold rounded-xl h-11 px-5">
          <Plus className="w-4 h-4" />
          New Appointment
        </Button>

        <div className="flex items-center gap-1 border-l border-slate-200 ml-2 pl-4">
          <Button variant="ghost" size="icon" className="text-slate-500 relative hover:bg-slate-100 rounded-xl" onClick={() => toast.info('You do not have any unread notifications yet')}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 rounded-xl" onClick={() => toast.info('Help center is coming soon')}>
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-slate-100 transition-colors focus:outline-none">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-bold text-slate-900 leading-none">Dr. Jane Smith</span>
                <span className="text-[10px] text-slate-400 mt-1 uppercase font-semibold tracking-wider">Chief Surgeon</span>
              </div>
              <Avatar className="w-10 h-10 border-2 border-white shadow-sm ring-1 ring-slate-200">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-slate-200/60 shadow-xl">
            <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">My Account</DropdownMenuLabel>
            <DropdownMenuItem onSelect={(event) => { event.preventDefault(); navigate('/app/profile'); }} className="rounded-xl px-3 py-2 text-sm font-semibold focus:bg-teal-50 focus:text-teal-700 cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem onSelect={(event) => { event.preventDefault(); navigate('/app/settings'); }} className="rounded-xl px-3 py-2 text-sm font-semibold focus:bg-teal-50 focus:text-teal-700 cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 my-1 mx-1" />
            <DropdownMenuItem onSelect={(event) => { event.preventDefault(); void handleLogout(); }} className="rounded-xl px-3 py-2 text-sm font-semibold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <DialogContent className="w-[92vw] max-w-sm rounded-3xl border-slate-200 p-0 overflow-hidden">
            <div className="p-6">
              <DialogHeader className="text-left">
                <DialogTitle>Clinic navigation</DialogTitle>
                <DialogDescription>
                  Jump to any clinic section or open account actions.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 grid gap-2">
                {mobileNavItems.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className="h-12 justify-start rounded-xl px-4 text-slate-700 hover:bg-slate-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to={item.href}>
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button onClick={() => { setMobileMenuOpen(false); setIsModalOpen(true); }} className="h-11 rounded-xl gradient-brand text-white font-bold">
                  New Appointment
                </Button>
                <Button variant="outline" className="h-11 rounded-xl border-slate-200 font-bold" onClick={() => void handleLogout()}>
                  Logout
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <NewAppointmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </header>
  )
}

export default Topbar
