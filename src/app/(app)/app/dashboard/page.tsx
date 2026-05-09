"use client"

import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  Calendar as CalendarIcon,
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Clock,
  Sparkles,
  Bot
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { useAppointments } from '@/hooks/use-appointments'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

const DashboardPage = () => {
  const { appointments, isLoading } = useAppointments()

  // Simulated stats based on real data where possible
  const stats = [
    {
      label: 'Total Patients',
      value: '1,284', // Placeholder for now
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-teal-50 text-teal-600'
    },
    {
      label: 'Appointments',
      value: appointments.length.toString(),
      change: '+8%',
      trend: 'up',
      icon: CalendarIcon,
      color: 'bg-cyan-50 text-cyan-600'
    },
    {
      label: 'AI-Handled',
      value: appointments.filter((a: any) => a.handled_by === 'ai').length.toString(),
      change: '+14%',
      trend: 'up',
      icon: Bot,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      label: 'Revenue',
      value: '$12,480', // Placeholder
      change: '-2%',
      trend: 'down',
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-600'
    },
  ]

  const todayAppointments = appointments.slice(0, 5)

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading dashboard...</div>
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative gradient-hero rounded-[2.5rem] p-8 lg:p-12 overflow-hidden shadow-2xl shadow-teal-900/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-4 border border-white/20">
              <Sparkles className="w-3 h-3" />
              Your Clinic is Performing Great Today
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Welcome Back, <br /> Doctor!
            </h1>
            <p className="text-teal-50 text-lg max-w-md opacity-90">
              Your AI agent has handled {appointments.filter((a: any) => a.handled_by === 'ai').length} bookings so far.
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild size="lg" className="bg-white text-teal-700 hover:bg-slate-100 font-bold rounded-2xl h-14 px-8 shadow-xl">
              <Link to="/app/appointments">View Analytics</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-2xl h-14 px-8 backdrop-blur-sm">
              <Link to="/app/ai-settings">
                <Bot className="w-5 h-5 mr-2" />
                Configure AI
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" id="stats">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 hover-lift border-slate-100 shadow-sm overflow-hidden relative group">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-500">
              <stat.icon className="w-24 h-24" />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center shadow-inner`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <Badge variant={stat.trend === 'up' ? 'default' : 'destructive'} className={stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : ''}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change}
              </Badge>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-500">{stat.label}</div>
              <div className="text-3xl font-bold text-slate-900 mt-1 stat-number">{stat.value}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Appointments */}
        <Card className="lg:col-span-2 p-8 border-slate-100 shadow-sm rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Upcoming Appointments</h3>
              <p className="text-sm text-slate-500">Monitor and manage your upcoming visits.</p>
            </div>
            <Button asChild variant="ghost" className="text-teal-600 font-bold hover:bg-teal-50">
              <Link to="/app/calendar">View Calendar</Link>
            </Button>
          </div>

          <div className="space-y-6">
            {todayAppointments.length === 0 ? (
              <div className="py-12 text-center text-slate-500">No appointments scheduled.</div>
            ) : (
              todayAppointments.map((appt: any) => (
                <div key={appt.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 ring-2 ring-white shadow-sm">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${appt.patient?.name}`} />
                      <AvatarFallback>{appt.patient?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-slate-900">{appt.patient?.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <span className="font-medium text-teal-600">{appt.service?.name || 'General'}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <Clock className="w-3 h-3" /> {format(new Date(appt.start_time), 'hh:mm a')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <Badge className={cn(
                        "px-3 py-1",
                        appt.status === 'confirmed' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                        appt.status === 'pending' ? "bg-amber-50 text-amber-700 border-amber-100" :
                        "bg-red-50 text-red-700 border-red-100"
                      )}>
                        {appt.status}
                      </Badge>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                        {appt.handled_by === 'ai' ? <Bot className="w-2 h-2" /> : <Users className="w-2 h-2" />}
                        Handled by {appt.handled_by === 'ai' ? 'AI' : 'Manual'}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 border-slate-200 shadow-xl">
                        <DropdownMenuItem asChild className="rounded-lg px-3 py-2 text-sm font-semibold focus:bg-teal-50 focus:text-teal-700 cursor-pointer">
                          <Link to="/app/appointments">View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => toast.success(`Cancellation requested for ${appt.patient?.name}`)} className="rounded-lg px-3 py-2 text-sm font-semibold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">
                          Cancel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            ))}
          </div>
          
          <Button asChild className="w-full mt-8 h-12 bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100 rounded-xl font-bold shadow-sm">
            <Link to="/app/appointments">View All Appointments</Link>
          </Button>
        </Card>

        {/* AI Performance Card */}
        <Card className="p-8 border-slate-100 shadow-sm rounded-3xl gradient-brand-soft border-teal-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">AI Performance</h3>
              <p className="text-xs text-slate-500">Active</p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { label: 'Booking Accuracy', value: '98%', color: 'bg-teal-500' },
              { label: 'Patient Satisfaction', value: '4.9/5', color: 'bg-cyan-500' },
              { label: 'Hours Reclaimed', value: '14h', color: 'bg-purple-500' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-slate-600">{stat.label}</span>
                  <span className="text-slate-900">{stat.value}</span>
                </div>
                <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden">
                  <div className={`h-full ${stat.color} rounded-full`} style={{ width: '85%' }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white">
            <div className="text-xs font-bold text-teal-800 mb-2 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> AI Insights
            </div>
            <p className="text-[11px] text-teal-900 leading-relaxed">
              Based on patient interactions, the AI recommends adding a "Telehealth" service option to capture more weekend bookings.
            </p>
          </div>

          <Button asChild className="w-full mt-6 gradient-brand text-white font-bold h-12 rounded-xl">
            <Link to="/app/ai-settings">Open AI Control Center</Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
