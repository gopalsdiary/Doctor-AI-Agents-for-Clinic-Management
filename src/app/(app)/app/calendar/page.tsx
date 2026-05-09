import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar as CalendarIcon, Clock3, Bot, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppointments } from '@/hooks/use-appointments'
import { format } from 'date-fns'

export default function CalendarPage() {
  const { appointments, isLoading } = useAppointments()
  return (
    <div className="space-y-8 pb-12">
      <div className="gradient-hero rounded-[2.5rem] p-8 lg:p-12 text-white shadow-2xl shadow-teal-900/20">
        <Badge className="mb-4 bg-white/15 text-white border-white/20 px-3 py-1">
          <CalendarIcon className="w-3 h-3 mr-2" />
          Scheduling workspace
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">Calendar</h1>
        <p className="text-teal-50 max-w-2xl mb-6">
          Keep the day full, balance provider time, and let the AI assistant handle new bookings around your rules.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="bg-white text-teal-700 hover:bg-slate-100 font-bold shadow-xl">
            <Link to="/app/appointments">
              View appointments
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold">
            <Link to="/app/ai-settings">Adjust AI scheduling</Link>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
            Loading calendar...
          </div>
        ) : appointments.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            No appointments scheduled yet.
          </div>
        ) : appointments.map((appt: any) => (
          <Card key={appt.id} className="p-6 rounded-3xl border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold text-slate-900">{appt.patient?.name}</div>
              <Badge variant="outline" className="text-teal-700 border-teal-200 bg-teal-50 uppercase text-[10px] font-bold">
                {appt.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock3 className="w-4 h-4 text-teal-500" />
                {format(new Date(appt.start_time), 'hh:mm a')}
              </div>
              <div className="text-[10px] font-bold text-slate-400">
                {format(new Date(appt.start_time), 'MMM dd')}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-8 rounded-3xl border-slate-100 shadow-sm bg-slate-50">
        <div className="flex items-center gap-3 mb-4 text-slate-900 font-bold">
          <Bot className="w-5 h-5 text-teal-600" />
          AI scheduling rules
        </div>
        <p className="text-slate-600 max-w-3xl mb-6">
          Your assistant can keep booking inside open slots, avoid lunch breaks, and surface urgent requests when the calendar is tight.
        </p>
        <Button asChild className="gradient-brand text-white shadow-lg shadow-teal-500/20">
          <Link to="/app/ai-settings">Review AI settings</Link>
        </Button>
      </Card>
    </div>
  )
}
