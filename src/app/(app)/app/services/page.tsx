"use client"

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Stethoscope, Bot, ArrowRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useServices } from '@/hooks/use-services'
import { NewServiceModal } from '@/components/services/new-service-modal'

export default function ServicesPage() {
  const { services, isLoading } = useServices()
  const [isModalOpen, setIsModalOpen] = useState(false)

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
          <div className="flex gap-4">
            <Button className="gradient-brand text-white shadow-lg shadow-teal-500/20 h-11 px-6 rounded-xl font-bold" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add new service
            </Button>
            <Button asChild variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 h-11 px-6 rounded-xl font-bold">
              <Link to="/app/settings">
                Rules
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-slate-500">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">No services found.</div>
        ) : services.map((service: any, index: number) => (
          <Card key={service.id} className="p-6 rounded-3xl border-slate-100 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${index % 2 === 1 ? 'bg-cyan-50 text-cyan-600' : 'bg-teal-50 text-teal-600'}`}>
              <Stethoscope className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">{service.name}</h2>
            <div className="text-sm font-semibold text-teal-600 mb-3">{service.duration_minutes} min</div>
            <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
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

      <NewServiceModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
