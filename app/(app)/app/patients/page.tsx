"use client"

import React from 'react'
import { Plus, Search, Filter, Mail, Phone, MoreVertical, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const patients = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', phone: '+1 234 567 890', visits: 12, lastVisit: '2 days ago', status: 'Active' },
  { id: 2, name: 'Maria Garcia', email: 'maria@example.com', phone: '+1 234 567 891', visits: 5, lastVisit: '1 week ago', status: 'Active' },
  { id: 3, name: 'James Wilson', email: 'james@example.com', phone: '+1 234 567 892', visits: 1, lastVisit: 'New Patient', status: 'New' },
  { id: 4, name: 'Emma Brown', email: 'emma@example.com', phone: '+1 234 567 893', visits: 24, lastVisit: '1 month ago', status: 'Inactive' },
]

const PatientsPage = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Patients</h1>
          <p className="text-slate-500">Manage your patient records and medical history.</p>
        </div>
        
        <Button className="h-11 rounded-xl gradient-brand text-white gap-2 font-bold shadow-lg shadow-teal-500/20 px-6" onClick={() => toast.info('Patient intake form is coming soon')}>
          <Plus className="w-4 h-4" />
          Add New Patient
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients', value: '1,284', color: 'bg-teal-500' },
          { label: 'Active This Month', value: '342', color: 'bg-cyan-500' },
          { label: 'New This Week', value: '18', color: 'bg-purple-500' },
          { label: 'Patient Satisfaction', value: '98%', color: 'bg-emerald-500' },
        ].map((stat, i) => (
          <Card key={i} className="p-4 border-slate-100 shadow-sm rounded-2xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Search & Grid */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search by name, email, or phone number..." 
            className="pl-11 h-12 rounded-xl border-slate-200 bg-white shadow-sm focus:ring-teal-500"
          />
        </div>
        <Button variant="outline" className="h-12 rounded-xl border-slate-200 bg-white gap-2 font-bold shadow-sm px-6" onClick={() => toast.info('Filter options are coming soon')}>
          <Filter className="w-4 h-4 text-slate-400" />
          Filters
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {patients.map((p) => (
          <Card key={p.id} className="p-6 hover-lift border-slate-100 shadow-sm rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-400">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 border-slate-200 shadow-xl">
                  <DropdownMenuItem onSelect={() => toast.info(`Opening chart for ${p.name}`)} className="rounded-lg px-3 py-2 text-sm font-semibold focus:bg-teal-50 focus:text-teal-700 cursor-pointer">
                    View Chart
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => toast.success(`Reminder queued for ${p.name}`)} className="rounded-lg px-3 py-2 text-sm font-semibold focus:bg-teal-50 focus:text-teal-700 cursor-pointer">
                    Send Reminder
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => toast.info(`Archiving ${p.name}`)} className="rounded-lg px-3 py-2 text-sm font-semibold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">
                    Archive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg ring-1 ring-slate-200">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} />
                  <AvatarFallback>{p.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Badge className={cn(
                  "absolute -bottom-1 -right-1 px-2 py-0.5 border-2 border-white",
                  p.status === 'Active' ? "bg-emerald-500" : p.status === 'New' ? "bg-purple-500" : "bg-slate-400"
                )}>
                  {p.status}
                </Badge>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {p.email}</div>
                    <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {p.phone}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Total Visits</div>
                      <div className="text-sm font-bold text-slate-900">{p.visits}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Last Visit</div>
                      <div className="text-sm font-bold text-teal-600">{p.lastVisit}</div>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-teal-600 font-bold hover:bg-teal-50 h-9 rounded-lg px-4" onClick={() => toast.info(`Opening history for ${p.name}`)}>
                    View History
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center py-8">
        <Button variant="ghost" className="text-slate-500 font-semibold gap-2" onClick={() => toast.success('Loaded more patients')}>
          <Sparkles className="w-4 h-4 text-teal-500" />
          Load More Patients
        </Button>
      </div>
    </div>
  )
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ')

export default PatientsPage
