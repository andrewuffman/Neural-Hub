'use client'

import React, { useState } from 'react'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setMessage('Thanks! We\'ll notify you when Neural Hub launches.')
        setEmail('')
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  const handleGetStarted = () => {
    document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        padding: '24px 20px', 
        textAlign: 'center', 
        color: 'white',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          margin: 0, 
          fontWeight: '700',
          letterSpacing: '-0.02em'
        }}>
          Neural Hub
        </h1>
        <p style={{ 
          fontSize: '1rem', 
          margin: '8px 0 0 0', 
          opacity: 0.8,
          fontWeight: '400'
        }}>
          AI Content Organization Platform
        </p>
      </header>

      {/* Hero Section */}
      <section style={{ 
        padding: '80px 20px', 
        textAlign: 'center', 
        color: 'white',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          fontSize: '3.5rem', 
          marginBottom: '24px', 
          fontWeight: '700',
          letterSpacing: '-0.03em',
          lineHeight: '1.1'
        }}>
          Organize Your AI-Generated Content
        </h2>
        <p style={{ 
          fontSize: '1.25rem', 
          marginBottom: '48px', 
          opacity: 0.9, 
          lineHeight: '1.6',
          fontWeight: '400',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Connect all your AI tools in one place. Store, organize, and discover your ChatGPT conversations, 
          Midjourney images, and more with intelligent tagging and search.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={handleGetStarted}
            style={{
              backgroundColor: 'white',
              color: '#667eea',
              padding: '16px 32px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease',
              letterSpacing: '-0.01em'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'
            }}
          >
            Get Started
          </button>
          
          <a 
            href="/dashboard"
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              padding: '16px 32px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              letterSpacing: '-0.01em'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            }}
          >
            Try Dashboard
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '80px 20px', 
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ 
            textAlign: 'center', 
            color: 'white', 
            fontSize: '2.5rem', 
            marginBottom: '64px',
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }}>
            Features
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '32px' 
          }}>
            {[
              {
                title: 'Smart Organization',
                description: 'Automatically categorize and tag your AI content for easy discovery.',
                icon: '🧠'
              },
              {
                title: 'Universal Search',
                description: 'Find any piece of content across all your AI tools instantly.',
                icon: '🔍'
              },
              {
                title: 'Collaboration',
                description: 'Share and collaborate on AI-generated content with your team.',
                icon: '👥'
              },
              {
                title: 'Export & Backup',
                description: 'Export your content in multiple formats and keep it safe.',
                icon: '💾'
              },
              {
                title: 'AI Insights',
                description: 'Get insights and analytics on your AI content usage.',
                icon: '📊'
              },
              {
                title: 'Integrations',
                description: 'Connect with ChatGPT, Midjourney, Claude, and more.',
                icon: '🔗'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.08)',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center',
                color: 'white',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{feature.icon}</div>
                <h4 style={{ 
                  fontSize: '1.25rem', 
                  marginBottom: '12px', 
                  fontWeight: '600',
                  letterSpacing: '-0.01em'
                }}>
                  {feature.title}
                </h4>
                <p style={{ 
                  opacity: 0.8, 
                  lineHeight: '1.6',
                  fontSize: '0.95rem',
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture Section */}
      <section id="email-capture" style={{ 
        padding: '100px 20px', 
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '24px', 
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }}>
            Get Early Access
          </h3>
          <p style={{ 
            fontSize: '1.125rem', 
            marginBottom: '48px', 
            opacity: 0.8,
            lineHeight: '1.6'
          }}>
            Be among the first to experience the future of AI content organization.
          </p>
          
          <form onSubmit={handleEmailSubmit} style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              style={{
                padding: '16px 20px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                minWidth: '280px',
                flex: '1',
                maxWidth: '320px',
                background: 'rgba(255,255,255,0.95)',
                color: '#333',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.background = 'white'
                e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.3)'
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.95)'
                e.target.style.boxShadow = 'none'
              }}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: '#0070f3',
                color: 'white',
                padding: '16px 32px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                transition: 'all 0.2s ease',
                letterSpacing: '-0.01em'
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = '#0051cc'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseOut={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = '#0070f3'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
          
          {message && (
            <div style={{
              marginTop: '24px',
              padding: '16px 24px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              fontSize: '0.95rem'
            }}>
              {message}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '48px 20px', 
        textAlign: 'center', 
        color: 'white',
        opacity: 0.7,
        borderTop: '1px solid rgba(255,255,255,0.1)',
        fontSize: '0.9rem'
      }}>
        <p style={{ margin: 0 }}>&copy; 2024 Neural Hub. All rights reserved.</p>
      </footer>
    </div>
  )
} 