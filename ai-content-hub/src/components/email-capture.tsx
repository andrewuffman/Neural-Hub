'use client'

import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'

interface EmailCaptureProps {
  className?: string
  variant?: 'hero' | 'footer' | 'sidebar'
}

export function EmailCapture({ className = '', variant = 'hero' }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    
    // For now, just simulate success
    // Later we'll integrate with ConvertKit, Mailchimp, etc.
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setEmail('')
      
      // Reset after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className={`flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg ${className}`}>
        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
        <span className="text-green-800 font-medium">Thanks! We'll notify you when Neural Hub launches.</span>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      {variant === 'hero' && (
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Get Early Access</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Be the first to organize your AI content with Neural Hub
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary px-6 py-3 whitespace-nowrap disabled:opacity-50"
        >
          {isSubmitting ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>
      
      {variant === 'hero' && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Join 100+ AI enthusiasts already on the waitlist
        </p>
      )}
    </div>
  )
} 