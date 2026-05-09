"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useServices } from '@/hooks/use-services'
import { useClinic } from '@/hooks/use-clinic'
import { Loader2 } from 'lucide-react'

export function NewServiceModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('30')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const { clinic } = useClinic()
  const { createService } = useServices()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clinic?.id) return

    setLoading(true)
    try {
      await createService({
        clinic_id: clinic.id,
        name,
        duration_minutes: parseInt(duration),
        description,
        price: price ? parseFloat(price) : null
      })

      toast.success('Service created successfully!')
      onOpenChange(false)
      setName('')
      setDuration('30')
      setDescription('')
      setPrice('')
    } catch (error) {
      toast.error('Failed to create service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Define a new service your clinic offers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="serviceName">Service Name</Label>
            <Input id="serviceName" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dental Checkup" className="rounded-xl h-11" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (mins)</Label>
              <Input id="duration" type="number" required value={duration} onChange={(e) => setDuration(e.target.value)} className="rounded-xl h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (optional)</Label>
              <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" className="rounded-xl h-11" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does this service include?" className="rounded-xl min-h-[100px]" />
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">Cancel</Button>
            <Button type="submit" disabled={loading || !name || !clinic} className="gradient-brand text-white border-0 rounded-xl">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Create Service
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
