import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const plans = [
  {
    name: 'Starter',
    price: '$49',
    note: 'For solo practices getting started with AI.',
    features: ['1 clinic', 'AI booking assistant', 'Basic analytics', 'Email support'],
  },
  {
    name: 'Growth',
    price: '$129',
    note: 'For growing teams that need more automation.',
    features: ['Up to 5 team members', 'Patient triage', 'Advanced scheduling', 'Priority support'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    note: 'For multi-location clinics with complex workflows.',
    features: ['Unlimited locations', 'Dedicated onboarding', 'Custom integrations', 'SLA support'],
  },
]

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-3xl mb-12">
          <Badge className="mb-4 bg-teal-50 text-teal-700 border-teal-100 px-3 py-1">
            <Sparkles className="w-3 h-3 mr-2" />
            Transparent pricing
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-4">Pricing that grows with your clinic.</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Start with core scheduling and patient automation, then scale into richer workflows as your team grows.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={`p-8 rounded-3xl border-slate-200 shadow-sm ${plan.featured ? 'ring-2 ring-teal-500/20 relative overflow-hidden' : ''}`}>
              {plan.featured && <div className="absolute top-0 right-0 w-24 h-24 bg-teal-100/60 rounded-full blur-2xl -mr-10 -mt-10" />}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-slate-900">{plan.name}</h2>
                  {plan.featured && <Badge className="bg-teal-600 text-white">Most popular</Badge>}
                </div>
                <div className="text-5xl font-black text-slate-900">{plan.price}</div>
                <p className="mt-3 text-sm text-slate-500">{plan.note}</p>

                <ul className="mt-8 space-y-3 text-sm text-slate-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-3">
                  <Button asChild className="gradient-brand text-white shadow-lg shadow-teal-500/20">
                    <Link href="/signup">Start free trial</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-slate-200">
                    <a href="mailto:sales@doctorai.example?subject=DoctorAI%20Pricing">Talk to sales</a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] bg-gradient-hero p-10 text-white shadow-2xl shadow-teal-900/20">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-3">Not sure which plan fits?</h2>
            <p className="text-teal-50 mb-6">
              Book a walkthrough and we will help map the right workflow for your clinic size and support model.
            </p>
            <Button asChild size="lg" className="h-12 px-6 bg-white text-teal-700 hover:bg-slate-100 shadow-xl">
              <Link href="/about">
                Learn more about DoctorAI
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingPage
