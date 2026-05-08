"use client"

import React from 'react'
import { 
  MoreHorizontal, 
  Calendar, 
  Clock, 
  Bot, 
  User,
  CheckCircle2,
  XCircle,
  Clock3
} from 'lucide-react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const appointments = [
  { 
    id: '1', 
    patient: 'Alex Johnson', 
    service: 'General Consultation', 
    date: 'May 12, 2024', 
    time: '09:00 AM', 
    status: 'Confirmed', 
    handledBy: 'AI Agent' 
  },
  { 
    id: '2', 
    patient: 'Maria Garcia', 
    service: 'Dental Cleaning', 
    date: 'May 12, 2024', 
    time: '10:30 AM', 
    status: 'Pending', 
    handledBy: 'Manual' 
  },
  { 
    id: '3', 
    patient: 'James Wilson', 
    service: 'Skin Checkup', 
    date: 'May 13, 2024', 
    time: '01:45 PM', 
    status: 'Cancelled', 
    handledBy: 'AI Agent' 
  },
  { 
    id: '4', 
    patient: 'Emma Brown', 
    service: 'Vaccination', 
    date: 'May 14, 2024', 
    time: '11:15 AM', 
    status: 'Confirmed', 
    handledBy: 'Manual' 
  },
]

const AppointmentTable = () => {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold text-slate-900 h-14">Patient</TableHead>
            <TableHead className="font-bold text-slate-900 h-14">Service</TableHead>
            <TableHead className="font-bold text-slate-900 h-14">Date & Time</TableHead>
            <TableHead className="font-bold text-slate-900 h-14">Status</TableHead>
            <TableHead className="font-bold text-slate-900 h-14">Handled By</TableHead>
            <TableHead className="text-right h-14"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appt) => (
            <TableRow key={appt.id} className="hover:bg-slate-50 transition-colors border-slate-100">
              <TableCell>
                <div className="flex items-center gap-3 py-1">
                  <Avatar className="w-10 h-10 border-2 border-white shadow-sm ring-1 ring-slate-200">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${appt.patient}`} />
                    <AvatarFallback>{appt.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="font-bold text-slate-900">{appt.patient}</div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium text-slate-600">{appt.service}</span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    {appt.date}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {appt.time}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  appt.status === 'Confirmed' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                  appt.status === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-100" :
                  "bg-red-50 text-red-700 border-red-100"
                )}>
                  {appt.status === 'Confirmed' && <CheckCircle2 className="w-3 h-3 mr-1 inline" />}
                  {appt.status === 'Pending' && <Clock3 className="w-3 h-3 mr-1 inline" />}
                  {appt.status === 'Cancelled' && <XCircle className="w-3 h-3 mr-1 inline" />}
                  {appt.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "p-1.5 rounded-lg",
                    appt.handledBy === 'AI Agent' ? "bg-teal-50 text-teal-600" : "bg-slate-100 text-slate-600"
                  )}>
                    {appt.handledBy === 'AI Agent' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs font-bold text-slate-600">{appt.handledBy}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 border-slate-200 shadow-xl">
                    <DropdownMenuItem onSelect={() => toast.info(`Opening details for ${appt.patient}`)} className="rounded-lg px-3 py-2 text-sm font-semibold focus:bg-teal-50 focus:text-teal-700 cursor-pointer">View Details</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => toast.info(`Editing ${appt.patient}'s appointment`)} className="rounded-lg px-3 py-2 text-sm font-semibold focus:bg-teal-50 focus:text-teal-700 cursor-pointer">Edit Appointment</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => toast.success(`Cancellation requested for ${appt.patient}`)} className="rounded-lg px-3 py-2 text-sm font-semibold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">Cancel</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppointmentTable