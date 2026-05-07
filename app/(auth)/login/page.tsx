"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bot, Mail, Lock, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { createBrowserClient } from '@/lib/supabase/client'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success("Welcome back!")
      router.push('/app/dashboard')
      router.refresh()
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
        <p className="text-slate-500">Enter your credentials to access your clinic</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="email"
              type="email"
              placeholder="doctor@example.com"
              className="pl-10 h-12 border-slate-200 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" size="sm" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10 h-12 border-slate-200 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 gradient-brand text-white shadow-lg shadow-teal-500/20 group"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 pt-8 border-t border-slate-100">
        <p className="text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-bold">
            Create an account
          </Link>
        </p>
      </div>

      <div className="mt-8 glass p-4 rounded-xl border-teal-100 bg-teal-50/50 flex items-start gap-3">
        <Bot className="w-5 h-5 text-teal-600 mt-0.5" />
        <div className="text-xs text-teal-800 leading-relaxed">
          <strong>Pro Tip:</strong> Your AI agent can handle appointment reminders and basic triage while you're offline.
        </div>
      </div>
    </div>
  )
}

export default LoginPage
