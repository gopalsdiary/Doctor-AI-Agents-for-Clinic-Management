"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { usePatients } from '@/hooks/use-patients'
import { useServices } from '@/hooks/use-services'
import { useAppointments } from '@/hooks/use-appointments'
import { useClinic } from '@/hooks/use-clinic'

export function NewAppointmentModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [loading, setLoading] = useState(false)
  const [patientId, setPatientId] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const { clinic } = useClinic()
  const { patients } = usePatients()
  const { services } = useServices()
  const { createAppointment } = useAppointments()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clinic?.id) return

    setLoading(true)
    try {
      const start_time = new Date(`${date}T${time}:00`).toISOString()
      const end_time = new Date(new Date(start_time).getTime() + 30 * 60000).toISOString() // Default 30 mins

      await createAppointment({
        clinic_id: clinic.id,
        patient_id: patientId,
        service_id: serviceId || null,
        start_time,
        end_time,
        status: 'pending',
        handled_by: 'manual'
      })

      toast.success('Appointment created successfully!')
      onOpenChange(false)
      setPatientId('')
      setServiceId('')
      setDate('')
      setTime('')
    } catch (error) {
      toast.error('Failed to create appointment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
          <DialogDescription>
            Book a new appointment for a patient.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="patient">Patient</Label>
            <Select value={patientId} onValueChange={setPatientId} required>
              <SelectTrigger id="patient" className="rounded-xl h-11">
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {patients.map((p: any) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <Select value={serviceId} onValueChange={setServiceId}>
              <SelectTrigger id="service" className="rounded-xl h-11">
                <SelectValue placeholder="Select a service (optional)" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {services.map((s: any) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" required value={time} onChange={(e) => setTime(e.target.value)} className="rounded-xl h-11" />
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">Cancel</Button>
            <Button type="submit" disabled={loading || !patientId || !clinic} className="gradient-brand text-white border-0 rounded-xl">
              {loading ? 'Saving...' : 'Book Appointment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
