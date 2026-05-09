"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { usePatients } from '@/hooks/use-patients'
import { useClinic } from '@/hooks/use-clinic'
import { Loader2 } from 'lucide-react'

export function NewPatientModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const { clinic } = useClinic()
  const { createPatient } = usePatients()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clinic?.id) return

    setLoading(true)
    try {
      await createPatient({
        clinic_id: clinic.id,
        name,
        email,
        phone
      })

      toast.success('Patient record created successfully!')
      onOpenChange(false)
      setName('')
      setEmail('')
      setPhone('')
    } catch (error) {
      toast.error('Failed to create patient')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Create a new patient record in your clinic.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" className="rounded-xl h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="rounded-xl h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="rounded-xl h-11" />
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">Cancel</Button>
            <Button type="submit" disabled={loading || !name || !clinic} className="gradient-brand text-white border-0 rounded-xl">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Create Patient
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
