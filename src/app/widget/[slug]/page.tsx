"use client"

import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Bot, 
  Send, 
  X, 
  MessageCircle, 
  Loader2, 
  Sparkles,
  ChevronDown,
  User,
  MoreVertical,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createBrowserClient } from '@/lib/supabase/client'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const WidgetPage = () => {
  const { slug } = useParams() as any
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [clinic, setClinic] = useState<any>(null)
  const [aiSettings, setAiSettings] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const supabase = createBrowserClient()

  useEffect(() => {
    const fetchClinicData = async () => {
      // Fetch clinic by subdomain/slug
      const { data: clinicData } = await supabase
        .from('clinics')
        .select('*, ai_settings(*)')
        .eq('subdomain', slug)
        .single()

      if (clinicData) {
        setClinic(clinicData)
        setAiSettings(clinicData.ai_settings)
        if (clinicData.ai_settings?.welcome_message) {
          setMessages([{ 
            role: 'assistant', 
            content: clinicData.ai_settings.welcome_message 
          }])
        }
      }
    }

    fetchClinicData()
  }, [slug])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate AI Response for now
    // In a real app, this would call an API route that uses Anthropic/OpenAI
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I've received your request about "${userMessage}". Let me check our availability for you.` 
      }])
      setIsLoading(false)
    }, 1500)
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-16 h-16 rounded-full gradient-brand text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group relative"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </button>
    )
  }

  return (
    <Card className="w-[380px] h-[600px] flex flex-col shadow-2xl border-slate-200/50 rounded-3xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
      {/* Widget Header */}
      <div className="gradient-hero p-5 text-white flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-xl" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative">
            <Avatar className="w-10 h-10 border-2 border-white/20 shadow-lg">
              <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${slug}`} />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-teal-600" />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">{aiSettings?.agent_name || 'AI Assistant'}</div>
            <div className="text-[10px] text-teal-100 flex items-center gap-1 opacity-80">
              <Sparkles className="w-2 h-2" /> Powered by DoctorAI
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 relative z-10">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 rounded-lg">
            <MoreVertical className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex gap-3 animate-in fade-in duration-300",
            msg.role === 'user' ? "flex-row-reverse" : ""
          )}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm",
              msg.role === 'user' ? "bg-slate-200" : "bg-gradient-brand text-white"
            )}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-slate-600" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm",
              msg.role === 'user' 
                ? "bg-white border border-slate-100 text-slate-700 rounded-tr-none" 
                : "bg-slate-900 text-white rounded-tl-none"
            )}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <div className="bg-slate-200 h-10 w-24 rounded-2xl rounded-tl-none" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
          <Input 
            placeholder="Type your message..." 
            className="h-12 pr-12 rounded-2xl border-slate-200 focus:ring-teal-500 bg-slate-50/50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="absolute right-1 w-10 h-10 gradient-brand text-white rounded-xl shadow-lg shadow-teal-500/20"
            disabled={!input.trim() || isLoading}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <Shield className="w-3 h-3" /> HIPAA Compliant & Secure
        </div>
      </div>
    </Card>
  )
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ')

export default WidgetPage
