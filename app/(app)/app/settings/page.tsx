import React from 'react'
import Link from 'next/link'
import { Settings, Shield, Bot, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2.5rem] gradient-brand text-white p-8 lg:p-12 shadow-2xl shadow-teal-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24" />
        <div className="relative z-10 max-w-3xl">
          <Badge className="mb-4 bg-white/15 text-white border-white/20 px-3 py-1">
            <Settings className="w-3 h-3 mr-2" />
            Clinic settings
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">Settings</h1>
          <p className="text-teal-50 max-w-2xl mb-6">
            Update clinic details, tune automation defaults, and move quickly to the AI agent configuration.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-white text-teal-700 hover:bg-slate-100 font-bold shadow-xl">
              <Link href="/app/ai-settings">
                Open AI settings
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold">
              <Link href="/app/billing">View billing</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-8 rounded-3xl border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900">Clinic profile</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Keep the public booking experience aligned with your current location, hours, and team structure.
          </p>
        </Card>

        <Card className="p-8 rounded-3xl border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Bot className="w-5 h-5 text-cyan-600" />
            <h2 className="text-xl font-bold text-slate-900">AI defaults</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Tune how the assistant speaks, what it can book automatically, and which cases should escalate to the front desk.
          </p>
        </Card>
      </div>
    </div>
  )
}
