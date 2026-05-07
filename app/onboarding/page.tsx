"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Building2, 
  MapPin, 
  Globe, 
  Phone, 
  Loader2, 
  ArrowRight, 
  Check,
  Sparkles,
  ShieldCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { createBrowserClient } from '@/lib/supabase/client'

const steps = [
  { id: 1, title: 'Clinic Details', icon: Building2 },
  { id: 2, title: 'Location', icon: MapPin },
  { id: 3, title: 'Finish', icon: Check },
]

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    address: '',
    phone: '',
  })
  
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would create the clinic record and link the user
      toast.success("Clinic setup complete!")
      router.push('/app/dashboard')
    } catch (error) {
      toast.error("Failed to complete setup")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Background Orbs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-3xl -mr-64 -mt-64 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100/30 rounded-full blur-3xl -ml-64 -mb-64 pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold mb-4">
            <Sparkles className="w-3 h-3" /> Step {currentStep} of 3
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Let's set up your clinic</h1>
          <p className="text-slate-500 text-lg">Just a few details to get your AI assistant ready.</p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                currentStep >= step.id ? "bg-gradient-brand text-white shadow-lg shadow-teal-500/20" : "bg-white text-slate-400 border border-slate-200"
              )}>
                <step.icon className="w-5 h-5" />
              </div>
              {step.id < 3 && <div className={cn("w-12 h-1 rounded-full", currentStep > step.id ? "bg-teal-500" : "bg-slate-200")} />}
            </div>
          ))}
        </div>

        <Card className="p-10 border-slate-200 shadow-2xl rounded-[2rem] overflow-hidden relative">
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clinicName">Official Clinic Name</Label>
                  <Input 
                    id="clinicName" 
                    placeholder="e.g. Wellness Medical Center" 
                    className="h-14 rounded-2xl border-slate-200 focus:ring-teal-500 text-lg px-6"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subdomain">Subdomain (for your booking widget)</Label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="subdomain" 
                      placeholder="wellness-center" 
                      className="h-14 pl-12 pr-32 rounded-2xl border-slate-200 focus:ring-teal-500 text-lg"
                      value={formData.subdomain}
                      onChange={(e) => setFormData({...formData, subdomain: e.target.value})}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      .doctor-ai.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Clinic Address</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Medical Way, Health City" 
                    className="h-14 rounded-2xl border-slate-200 focus:ring-teal-500 text-lg px-6"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      id="phone" 
                      placeholder="+1 (555) 000-0000" 
                      className="h-14 pl-12 rounded-2xl border-slate-200 focus:ring-teal-500 text-lg"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 py-6">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-100 shadow-inner">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Everything looks perfect!</h2>
                <p className="text-slate-500">Your clinic profile is ready. Your AI agent has been initialized with default settings.</p>
              </div>
            </div>
          )}

          <div className="mt-12 flex gap-4">
            {currentStep > 1 && (
              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-8 rounded-2xl border-slate-200 font-bold"
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                Back
              </Button>
            )}
            <Button 
              size="lg" 
              className="flex-1 h-14 rounded-2xl gradient-brand text-white font-bold text-lg shadow-xl shadow-teal-500/20 group"
              onClick={handleNext}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  {currentStep === 3 ? "Launch Dashboard" : "Continue"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </Card>

        <p className="mt-8 text-center text-xs text-slate-400">
          Secure onboarding with 256-bit encryption. Your data is always protected.
        </p>
      </div>
    </div>
  )
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ')

export default OnboardingPage
