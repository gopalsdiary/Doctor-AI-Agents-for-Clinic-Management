import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRight, 
  Bot, 
  Calendar, 
  Shield, 
  Zap, 
  Users, 
  MessageSquare,
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-teal-100">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-slate-200/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gradient-brand flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Doctor<span className="text-teal-600">AI</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-teal-600 transition-colors">Features</Link>
            <Link href="#ai-agents" className="hover:text-teal-600 transition-colors">AI Agents</Link>
            <Link href="/pricing" className="hover:text-teal-600 transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-600">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="gradient-brand text-white hover:opacity-90 shadow-md shadow-teal-500/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden gradient-mesh">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-2xl">
                <Badge className="mb-4 bg-teal-50 text-teal-700 border-teal-100 px-3 py-1 animate-pulse">
                  <Sparkles className="w-3 h-3 mr-2" />
                  Now with Autonomous AI Agents
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
                  The Future of <span className="text-transparent bg-clip-text gradient-brand">Clinic Management</span> is Here.
                </h1>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                  DoctorAI combines powerful clinic management tools with intelligent AI agents that handle bookings, patient inquiries, and workflow automation 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="h-14 px-8 text-lg gradient-brand text-white shadow-lg shadow-teal-500/30 group">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg border-slate-200 hover:bg-slate-50">
                    <Link href="#ai-agents">Watch Demo</Link>
                  </Button>
                </div>
                
                <div className="mt-12 flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                        <Image 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                          alt="User Avatar" 
                          fill
                          sizes="40px"
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-slate-500">
                    <span className="font-bold text-slate-900">500+</span> clinics already joined
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
                <div className="relative z-10 glass-card p-2 rounded-3xl overflow-hidden ring-1 ring-slate-200/50 shadow-2xl animate-typing">
                  <Image 
                    src="/images/hero.png" 
                    alt="Doctor AI Platform" 
                    width={800}
                    height={600}
                    priority
                    className="rounded-2xl w-full h-auto"
                  />
                </div>
                
                {/* Floating Stats */}
                <div className="absolute top-10 -left-10 glass p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Avg. Response Time</div>
                      <div className="text-lg font-bold text-slate-900">0.8s</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-10 -right-10 glass p-4 rounded-2xl shadow-xl animate-bounce delay-700 duration-[4000ms]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">AI Appointments Today</div>
                      <div className="text-lg font-bold text-slate-900">142</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4">Core Capabilities</h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Everything you need to run a modern practice.</h3>
              <p className="text-lg text-slate-600">Streamline your operations and focus on what matters most: your patients.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart Scheduling",
                  desc: "Automated booking system with real-time sync and conflict resolution.",
                  icon: Calendar,
                  color: "bg-teal-50 text-teal-600"
                },
                {
                  title: "AI Patient Triage",
                  desc: "Intelligent agents that assess patient needs and route them accordingly.",
                  icon: Bot,
                  color: "bg-cyan-50 text-cyan-600"
                },
                {
                  title: "Secure Health Records",
                  desc: "HIPAA-compliant storage for all patient data and clinical notes.",
                  icon: Shield,
                  color: "bg-blue-50 text-blue-600"
                },
                {
                  title: "Clinic Analytics",
                  desc: "Deep insights into your practice performance and patient trends.",
                  icon: Zap,
                  color: "bg-purple-50 text-purple-600"
                },
                {
                  title: "Multi-Clinic Management",
                  desc: "Scale your business with centralized control over multiple locations.",
                  icon: Users,
                  color: "bg-indigo-50 text-indigo-600"
                },
                {
                  title: "Automated Follow-ups",
                  desc: "AI agents handle post-visit surveys and treatment reminders.",
                  icon: MessageSquare,
                  color: "bg-pink-50 text-pink-600"
                }
              ].map((f, i) => (
                <Card key={i} className="p-8 hover-lift border-slate-100 shadow-sm">
                  <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-6`}>
                    <f.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Agent Showcase */}
        <section id="ai-agents" className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-6">
                  <Bot className="w-4 h-4" />
                  AI Agent Engine
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                  Your AI Agent never sleeps, <span className="text-teal-600">ever.</span>
                </h3>
                <div className="space-y-6 mb-10">
                  {[
                    "Handles 90% of routine inquiries automatically",
                    "Seamlessly books and reschedules appointments",
                    "Integrates with your existing website and tools",
                    "Always polite, accurate, and on-brand"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <span className="text-lg text-slate-700">{text}</span>
                    </div>
                  ))}
                </div>
                <Link href="/signup">
                  <Button size="lg" className="gradient-brand text-white px-10">
                    Meet Your Agent
                  </Button>
                </Link>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <div className="glass-card rounded-3xl p-6 shadow-2xl bg-slate-900 text-white relative overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">AI Clinic Agent</div>
                      <div className="text-[10px] text-teal-400 flex items-center gap-1">
                        <div className="pulse-dot" /> Online
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 font-mono text-sm">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px]">US</div>
                      <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                        Hello! I'm Dr. Sarah's assistant. How can I help you today?
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="bg-teal-600 p-3 rounded-2xl rounded-tr-none max-w-[80%]">
                        I'd like to book an appointment for tomorrow.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px]">AI</div>
                      <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                        Checking availability... I have slots at 10:00 AM, 2:30 PM, and 4:15 PM. Which works best?
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="bg-teal-600 p-3 rounded-2xl rounded-tr-none max-w-[80%]">
                        10:00 AM please.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px]">AI</div>
                      <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                        Great! You're booked for 10:00 AM tomorrow. I've sent a confirmation to your phone.
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-white/10 flex gap-2">
                    <div className="flex-1 bg-slate-800 h-10 rounded-full px-4 flex items-center text-slate-500 text-xs">
                      Type a message...
                    </div>
                    <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="gradient-hero rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-teal-900/20">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
                <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full opacity-50" />
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 relative z-10">
                Ready to transform your clinic?
              </h2>
              <p className="text-xl text-teal-50 mb-12 max-w-2xl mx-auto relative z-10">
                Join hundreds of medical professionals who are reclaiming their time with DoctorAI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-10 text-lg bg-white text-teal-700 hover:bg-slate-100 shadow-xl">
                    Get Started Now
                  </Button>
                </Link>
                <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg border-white/30 text-white hover:bg-white/10">
                  <Link href="/pricing">Talk to Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">DoctorAI</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                The intelligent clinic management platform designed for the modern medical professional.
              </p>
              <div className="flex gap-4">
                {/* Social icons would go here */}
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-6">Product</h5>
              <ul className="space-y-4 text-sm">
                <li><Link href="#features" className="hover:text-teal-400 transition-colors">Features</Link></li>
                <li><Link href="#ai-agents" className="hover:text-teal-400 transition-colors">AI Agents</Link></li>
                <li><Link href="/pricing" className="hover:text-teal-400 transition-colors">Pricing</Link></li>
                <li><Link href="/about" className="hover:text-teal-400 transition-colors">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-6">Support</h5>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-teal-400 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-teal-400 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-teal-400 transition-colors">API Reference</Link></li>
                <li><Link href="#" className="hover:text-teal-400 transition-colors">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-6">Company</h5>
              <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-teal-400 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-teal-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2024 DoctorAI Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
