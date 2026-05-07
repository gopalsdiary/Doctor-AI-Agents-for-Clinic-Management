import React from 'react'
import Link from 'next/link'
import { ArrowRight, Bot, Shield, Sparkles, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const highlights = [
  { icon: Bot, title: 'AI-first workflow', text: 'Designed to automate the repetitive admin work that slows clinics down.' },
  { icon: Users, title: 'Built for teams', text: 'Shared tools for doctors, front desk staff, and support teams.' },
  { icon: Shield, title: 'Secure by default', text: 'Structured around patient privacy and careful access controls.' },
]

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4 max-w-6xl space-y-12">
        <div className="max-w-3xl">
          <Badge className="mb-4 bg-teal-50 text-teal-700 border-teal-100 px-3 py-1">
            <Sparkles className="w-3 h-3 mr-2" />
            Why DoctorAI exists
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-4">
            We build the clinic operations layer that should have existed already.
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            DoctorAI helps clinics answer patients faster, keep schedules full, and reduce the manual overhead that drains staff time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <Card key={item.title} className="p-8 rounded-3xl border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-2xl gradient-brand text-white flex items-center justify-center mb-5">
                <item.icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h2>
              <p className="text-slate-600 leading-relaxed">{item.text}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center rounded-[2rem] bg-slate-50 p-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">A platform for clinics that want fewer empty slots and fewer manual steps.</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              The product combines booking automation, patient communications, and lightweight analytics so teams can focus on care instead of coordination.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="gradient-brand text-white shadow-lg shadow-teal-500/20">
                <Link href="/signup">
                  Get started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-slate-200">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>

          <Card className="p-6 rounded-3xl border-slate-200 shadow-sm bg-white">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">What teams get</div>
            <ul className="space-y-4 text-sm text-slate-600">
              <li>Real-time appointment handling</li>
              <li>Patient-friendly booking widget</li>
              <li>Less repetitive admin work</li>
              <li>One place for clinic settings and AI behavior</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AboutPage