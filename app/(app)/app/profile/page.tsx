import React from 'react'
import Link from 'next/link'
import { User, ArrowRight, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ProfilePage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2.5rem] bg-white p-8 lg:p-12 shadow-sm border border-slate-100">
        <Badge className="mb-4 bg-teal-50 text-teal-700 border-teal-100 px-3 py-1">
          <User className="w-3 h-3 mr-2" />
          Provider profile
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-3">Profile</h1>
        <p className="text-slate-600 max-w-2xl mb-6">
          Keep your public profile current so patients know who is on the team and what you specialize in.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="gradient-brand text-white shadow-lg shadow-teal-500/20">
            <Link href="/app/settings">
              Edit clinic settings
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-200">
            <Link href="/app/billing">View billing</Link>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6">
        <Card className="p-8 rounded-3xl border-slate-100 shadow-sm">
          <div className="w-20 h-20 rounded-2xl gradient-brand text-white flex items-center justify-center mb-4">
            <Stethoscope className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Dr. Jane Smith</h2>
          <p className="text-slate-600">Chief Surgeon</p>
        </Card>

        <Card className="p-8 rounded-3xl border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Profile details</h2>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>Specialty, credentials, and contact details</li>
            <li>Clinic hours and appointment availability</li>
            <li>Profile photo and branding</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
