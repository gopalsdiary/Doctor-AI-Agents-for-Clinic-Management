import React from 'react'
import Link from 'next/link'
import { CreditCard, ReceiptText, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const invoices = [
  { id: 'INV-2041', amount: '$129', status: 'Paid' },
  { id: 'INV-2038', amount: '$129', status: 'Paid' },
  { id: 'INV-2035', amount: '$129', status: 'Upcoming' },
]

export default function BillingPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2.5rem] gradient-brand text-white p-8 lg:p-12 shadow-2xl shadow-teal-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24" />
        <div className="relative z-10">
          <Badge className="mb-4 bg-white/15 text-white border-white/20 px-3 py-1">
            <CreditCard className="w-3 h-3 mr-2" />
            Billing overview
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">Billing</h1>
          <p className="text-teal-50 max-w-2xl mb-6">
            Review your plan, keep invoices organized, and upgrade when the clinic needs more capacity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-white text-teal-700 hover:bg-slate-100 font-bold shadow-xl">
              <Link href="/pricing">
                Upgrade plan
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold">
              <Link href="/app/settings">Manage billing settings</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">
        <Card className="p-8 rounded-3xl border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900">Current plan</h2>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-2">Growth</div>
          <p className="text-slate-500 mb-6">$129 per month, billed monthly.</p>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>Up to 5 team members</li>
            <li>AI booking assistant and patient triage</li>
            <li>Priority support</li>
          </ul>
        </Card>

        <Card className="p-8 rounded-3xl border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <ReceiptText className="w-5 h-5 text-cyan-600" />
            <h2 className="text-xl font-bold text-slate-900">Recent invoices</h2>
          </div>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
                <div>
                  <div className="font-bold text-slate-900">{invoice.id}</div>
                  <div className="text-xs text-slate-500">Recurring clinic subscription</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{invoice.amount}</div>
                  <Badge variant="outline" className="mt-1 text-xs">{invoice.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
