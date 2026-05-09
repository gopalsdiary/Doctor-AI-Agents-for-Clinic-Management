"use client"

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, ReceiptText, Sparkles, ArrowRight, CheckCircle2, Loader2, Download, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { useClinic } from '@/hooks/use-clinic'

export default function BillingPage() {
  const { clinic, isLoading: isLoadingClinic } = useClinic()
  const [invoices, setInvoices] = useState<any[]>([])
  const [isLoadingInvoices, setIsLoadingInvoices] = useState(true)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!clinic?.id) return
      const supabase = createClient()
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('clinic_id', clinic.id)
        .order('created_at', { ascending: false })

      if (!error) setInvoices(data || [])
      setIsLoadingInvoices(false)
    }

    if (clinic) {
      fetchInvoices()
    } else if (!isLoadingClinic) {
      setTimeout(() => setIsLoadingInvoices(false), 0)
    }
  }, [clinic, isLoadingClinic])

  const handleUpgrade = async () => {
    if (!clinic?.id) return
    const supabase = createClient()

    toast.promise(
      async () => {
        const { error } = await supabase
          .from('clinics')
          .update({ subscription_status: 'growth' })
          .eq('id', clinic.id)

        if (error) throw error
        // window.location.reload() // Or use query client invalidation
      },
      {
        loading: 'Processing upgrade...',
        success: 'Welcome to the Growth plan!',
        error: 'Failed to upgrade. Please try again.',
      }
    )
  }

  if (isLoadingClinic) {
    return <div className="p-8 text-center text-slate-500">Loading billing...</div>
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2.5rem] gradient-brand text-white p-8 lg:p-12 shadow-2xl shadow-teal-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24" />
        <div className="relative z-10">
          <Badge className="mb-4 bg-white/15 text-white border-white/20 px-3 py-1 font-bold">
            <CreditCard className="w-3 h-3 mr-2" />
            Billing overview
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">Billing</h1>
          <p className="text-teal-50 max-w-2xl mb-6">
            Review your plan, keep invoices organized, and upgrade when the clinic needs more capacity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleUpgrade} className="bg-white text-teal-700 hover:bg-slate-100 font-bold shadow-xl rounded-xl h-12 px-6">
              Upgrade plan
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold rounded-xl h-12 px-6">
              <Link to="/app/settings">Manage settings</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
        <Card className="p-8 rounded-3xl border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Sparkles className="w-16 h-16 text-teal-600" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900">Current plan</h2>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">
            {clinic?.subscription_status || 'Trial'}
          </div>
          <p className="text-slate-500 mb-6 font-medium">
            {clinic?.subscription_status === 'growth' ? '$129 per month, billed monthly.' : 'Free trial - 14 days remaining.'}
          </p>
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500" />
              <span>Up to 5 team members</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500" />
              <span>AI booking assistant</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500" />
              <span>Patient triage automation</span>
            </li>
          </ul>
        </Card>

        <Card className="p-8 rounded-3xl border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <ReceiptText className="w-5 h-5 text-cyan-600" />
            <h2 className="text-xl font-bold text-slate-900">Recent invoices</h2>
          </div>
          <div className="space-y-4">
            {isLoadingInvoices ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
              </div>
            ) : invoices.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm italic">
                No invoices found yet.
              </div>
            ) : (
              invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedInvoice(invoice)}
                >
                  <div>
                    <div className="font-bold text-slate-900">{invoice.id.slice(0, 8).toUpperCase()}</div>
                    <div className="text-xs text-slate-500 font-medium">{new Date(invoice.created_at).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{invoice.amount}</div>
                    <Badge variant="outline" className={cn(
                      "mt-1 text-[10px] uppercase font-bold",
                      invoice.status === 'paid' ? "text-emerald-600 border-emerald-100 bg-emerald-50" : "text-amber-600 border-amber-100 bg-amber-50"
                    )}>
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
        <DialogContent className="max-w-md rounded-3xl p-8">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white">
                <ReceiptText className="w-6 h-6" />
              </div>
              <DialogTitle className="text-2xl font-bold">Receipt</DialogTitle>
            </div>
            <DialogDescription>
              Details for invoice #{selectedInvoice?.id.slice(0, 8).toUpperCase()}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-6">
            <div className="flex justify-between border-b border-slate-100 pb-4">
              <span className="text-slate-500 font-medium">Date</span>
              <span className="text-slate-900 font-bold">{selectedInvoice && new Date(selectedInvoice.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-4">
              <span className="text-slate-500 font-medium">Clinic</span>
              <span className="text-slate-900 font-bold">{clinic?.name}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-4">
              <span className="text-slate-500 font-medium">Status</span>
              <Badge variant="outline" className={cn(
                "uppercase font-bold text-[10px]",
                selectedInvoice?.status === 'paid' ? "text-emerald-600 border-emerald-100 bg-emerald-50" : "text-amber-600 border-amber-100 bg-amber-50"
              )}>
                {selectedInvoice?.status}
              </Badge>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-xl font-bold text-slate-900">Total Amount</span>
              <span className="text-xl font-black text-teal-600">{selectedInvoice?.amount}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="rounded-xl h-12 font-bold" onClick={() => setSelectedInvoice(null)}>
              Close
            </Button>
            <Button className="rounded-xl h-12 gradient-brand text-white font-bold gap-2" onClick={() => toast.success('Receipt download started...')}>
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ')
