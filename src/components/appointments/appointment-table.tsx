"use client"

import React, { useState } from 'react'
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
import { useAppointments } from '@/hooks/use-appointments'
import { format } from 'date-fns'

const AppointmentTable = () => {
  const { appointments, isLoading, updateAppointmentStatus } = useAppointments()

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateAppointmentStatus({ id, status })
      toast.success(`Appointment marked as ${status}`)
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading appointments...</div>
  }

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
          {appointments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                No appointments found.
              </TableCell>
            </TableRow>
          ) : (
            appointments.map((appt: any) => (
              <TableRow key={appt.id} className="hover:bg-slate-50 transition-colors border-slate-100">
                <TableCell>
                  <div className="flex items-center gap-3 py-1">
                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm ring-1 ring-slate-200">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${appt.patient?.name}`} />
                      <AvatarFallback>{appt.patient?.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="font-bold text-slate-900">{appt.patient?.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-slate-600">{appt.service?.name || 'General'}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      {format(new Date(appt.start_time), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {format(new Date(appt.start_time), 'hh:mm a')}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    appt.status === 'confirmed' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                    appt.status === 'pending' ? "bg-amber-50 text-amber-700 border-amber-100" :
                    "bg-red-50 text-red-700 border-red-100"
                  )}>
                    {appt.status === 'confirmed' && <CheckCircle2 className="w-3 h-3 mr-1 inline" />}
                    {appt.status === 'pending' && <Clock3 className="w-3 h-3 mr-1 inline" />}
                    {appt.status === 'cancelled' && <XCircle className="w-3 h-3 mr-1 inline" />}
                    {appt.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "p-1.5 rounded-lg",
                      appt.handled_by === 'ai' ? "bg-teal-50 text-teal-600" : "bg-slate-100 text-slate-600"
                    )}>
                      {appt.handled_by === 'ai' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-bold text-slate-600">{appt.handled_by === 'ai' ? 'AI Agent' : 'Manual'}</span>
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
                      <DropdownMenuItem onSelect={() => handleStatusChange(appt.id, 'confirmed')} className="rounded-lg px-3 py-2 text-sm font-semibold focus:bg-teal-50 focus:text-teal-700 cursor-pointer text-emerald-600">Confirm</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleStatusChange(appt.id, 'cancelled')} className="rounded-lg px-3 py-2 text-sm font-semibold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppointmentTable
