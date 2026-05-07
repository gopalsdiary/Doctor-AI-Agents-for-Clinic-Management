"use client"

import React, { useEffect, useState } from 'react'
import { 
  Bot, 
  Save, 
  MessageSquare, 
  Zap, 
  Shield, 
  Mic, 
  MicOff,
  Sparkles,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { createBrowserClient } from '@/lib/supabase/client'

const AISettingsPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    agent_name: 'Sarah',
    welcome_message: 'Hello! I am Sarah, your clinical assistant. How can I help you today?',
    prompt_instructions: 'You are a professional medical clinic assistant. Your goal is to help patients book appointments, answer questions about our services, and provide general clinic information. Do not provide medical advice.',
    voice_enabled: false,
  })

  const supabase = createBrowserClient()

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('ai_settings')
          .select('*')
          .single()

        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows found"
          toast.error("Failed to load AI settings")
        } else if (data) {
          setSettings({
            agent_name: data.agent_name || 'Sarah',
            welcome_message: data.welcome_message || '',
            prompt_instructions: data.prompt_instructions || '',
            voice_enabled: data.voice_enabled || false,
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // In a multi-tenant app, we'd need the clinic_id here.
      // For the demo, we'll assume the RLS handles it or we're using a single row for now.
      const { error } = await supabase
        .from('ai_settings')
        .upsert({
          agent_name: settings.agent_name,
          welcome_message: settings.welcome_message,
          prompt_instructions: settings.prompt_instructions,
          voice_enabled: settings.voice_enabled,
          updated_at: new Date().toISOString(),
        })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success("AI settings saved successfully")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Agent Configuration</h1>
          <p className="text-slate-500">Customize how your AI agent interacts with patients.</p>
        </div>
        <Button 
          onClick={handleSave} 
          className="gradient-brand text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-teal-500/20"
          disabled={isSaving}
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* General Identity */}
          <Card className="p-8 border-slate-100 shadow-sm rounded-3xl">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Bot className="w-5 h-5 text-teal-600" />
              Agent Identity
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="agentName">Agent Name</Label>
                <Input 
                  id="agentName" 
                  value={settings.agent_name}
                  onChange={(e) => setSettings({...settings, agent_name: e.target.value})}
                  className="h-12 border-slate-200 focus:ring-teal-500 rounded-xl"
                  placeholder="e.g. Sarah"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea 
                  id="welcomeMessage" 
                  value={settings.welcome_message}
                  onChange={(e) => setSettings({...settings, welcome_message: e.target.value})}
                  className="min-h-[100px] border-slate-200 focus:ring-teal-500 rounded-xl"
                  placeholder="The first message the agent sends to patients..."
                />
              </div>
            </div>
          </Card>

          {/* Prompt Instructions */}
          <Card className="p-8 border-slate-100 shadow-sm rounded-3xl">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-600" />
              Behavior & Personality
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="instructions">System Instructions</Label>
                <Textarea 
                  id="instructions" 
                  value={settings.prompt_instructions}
                  onChange={(e) => setSettings({...settings, prompt_instructions: e.target.value})}
                  className="min-h-[200px] border-slate-200 focus:ring-teal-500 rounded-xl leading-relaxed"
                  placeholder="Describe how the agent should behave, what information it has access to, and its limitations..."
                />
              </div>
              
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Important:</strong> AI agents should never provide medical diagnoses or prescribe medications. Ensure your instructions clearly state these boundaries.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Voice Settings */}
          <Card className="p-6 border-slate-100 shadow-sm rounded-3xl">
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest text-slate-400">Features</h3>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                {settings.voice_enabled ? <Mic className="w-5 h-5 text-teal-600" /> : <MicOff className="w-5 h-5 text-slate-400" />}
                <div>
                  <div className="text-sm font-bold text-slate-900">Voice Mode</div>
                  <div className="text-[10px] text-slate-500">Enable audio responses</div>
                </div>
              </div>
              <Switch 
                checked={settings.voice_enabled}
                onCheckedChange={(checked) => setSettings({...settings, voice_enabled: checked})}
              />
            </div>

            <div className="p-4 bg-gradient-brand rounded-2xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 blur-xl" />
              <div className="relative z-10">
                <Zap className="w-5 h-5 mb-2" />
                <div className="text-xs font-bold mb-1">AI Premium Active</div>
                <p className="text-[10px] text-teal-100 opacity-80">
                  Using GPT-4o for maximum reasoning capabilities.
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Preview */}
          <Card className="p-6 border-slate-100 shadow-sm rounded-3xl bg-slate-900 text-white">
            <h3 className="text-xs font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-teal-400" />
              Live Preview
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none text-[11px] leading-relaxed">
                  {settings.welcome_message || "Hello! How can I help you?"}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AISettingsPage
