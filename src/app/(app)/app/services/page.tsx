import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Stethoscope, Bot, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const services = [
  { name: 'General Consultation', duration: '30 min', note: 'Primary care and routine follow-ups.' },
  { name: 'Specialist Visit', duration: '45 min', note: 'Deeper visits for complex cases.' },
  { name: 'AI Triage Follow-up', duration: '15 min', note: 'Automated pre-visit screening.' },
]

export default function ServicesPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2.5rem] bg-white p-8 lg:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl -mr-24 -mt-24" />
        <div className="relative z-10 max-w-3xl">
          <Badge className="mb-4 bg-teal-50 text-teal-700 border-teal-100 px-3 py-1">
            <Sparkles className="w-3 h-3 mr-2" />
            Service catalog
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-3">Services</h1>
          <p className="text-slate-600 max-w-2xl mb-6">
            Keep appointments organized by service type and let the AI assistant route patients into the right flow.
          </p>
          <Button asChild className="gradient-brand text-white shadow-lg shadow-teal-500/20">
            <Link to="/app/settings">
              Configure service rules
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={service.name} className="p-6 rounded-3xl border-slate-100 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${index === 1 ? 'bg-cyan-50 text-cyan-600' : 'bg-teal-50 text-teal-600'}`}>
              <Stethoscope className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">{service.name}</h2>
            <div className="text-sm font-semibold text-teal-600 mb-3">{service.duration}</div>
            <p className="text-sm text-slate-600 leading-relaxed">{service.note}</p>
          </Card>
        ))}
      </div>

      <Card className="p-8 rounded-3xl border-slate-100 shadow-sm bg-slate-50">
        <div className="flex items-center gap-3 mb-4 text-slate-900 font-bold">
          <Bot className="w-5 h-5 text-teal-600" />
          Service automation
        </div>
        <p className="text-slate-600 max-w-3xl mb-6">
          Configure which services the AI assistant can offer, which ones need manual approval, and how long each appointment should be.
        </p>
        <Button asChild className="gradient-brand text-white shadow-lg shadow-teal-500/20">
          <Link to="/app/ai-settings">Open AI settings</Link>
        </Button>
      </Card>
    </div>
  )
}
