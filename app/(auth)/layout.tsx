import React from 'react'
import { Sparkles } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-80 h-80 border-2 border-white rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 border-2 border-white rounded-full opacity-50" />
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-lg flex items-center justify-center border border-white/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">DoctorAI</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Streamline your practice with <br />
            <span className="text-teal-200">intelligent automation.</span>
          </h2>
          <p className="text-xl text-teal-50 max-w-lg">
            Join the community of forward-thinking medical professionals using AI to deliver better care.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-teal-600 bg-teal-100 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="User" />
              </div>
            ))}
          </div>
          <div className="text-sm text-teal-100 font-medium">
            Join 500+ clinics already using DoctorAI
          </div>
        </div>
      </div>

      {/* Right Side - Forms */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">DoctorAI</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
