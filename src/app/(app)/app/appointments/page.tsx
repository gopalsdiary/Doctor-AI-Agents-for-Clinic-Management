"use client"

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Filter, Download, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AppointmentTable from '@/components/appointments/appointment-table'
import { toast } from 'sonner'
import { NewAppointmentModal } from '@/components/appointments/new-appointment-modal'

const AppointmentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Appointments</h1>
          <p className="text-slate-500">Manage all your clinical visits and AI bookings.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl border-slate-200 gap-2 font-bold hover:bg-slate-50 shadow-sm" onClick={() => toast.success('Export started. Your file will download shortly.') }>
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="h-11 rounded-xl gradient-brand text-white gap-2 font-bold shadow-lg shadow-teal-500/20 px-6">
            <Plus className="w-4 h-4" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search by patient name or doctor..." 
            className="pl-11 h-12 rounded-xl border-slate-200 bg-white shadow-sm focus:ring-teal-500"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Button variant="outline" className="flex-1 lg:flex-none h-12 rounded-xl border-slate-200 bg-white gap-2 font-bold shadow-sm" onClick={() => toast.info('Status filter options are coming soon')}>
            <Filter className="w-4 h-4 text-slate-400" />
            All Status
          </Button>
          <Button variant="outline" className="flex-1 lg:flex-none h-12 rounded-xl border-slate-200 bg-white gap-2 font-bold shadow-sm" onClick={() => toast.info('Date filter options are coming soon')}>
            <Calendar className="w-4 h-4 text-slate-400" />
            This Week
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <AppointmentTable />
      
      <NewAppointmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}

export default AppointmentsPage
