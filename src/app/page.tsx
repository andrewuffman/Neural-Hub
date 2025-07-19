'use client'

import React, { useState } from 'react'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setIsSubscribed(true)
        setEmail('')
      }
    } catch (error) {
      console.error('Error subscribing:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Navigation Header */}
      <header style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        padding: '16px 20px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <a 
            href="/"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
            }}>
              N
            </div>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#1a202c',
                letterSpacing: '-0.02em'
              }}>
                Neural Hub
              </h1>
              <p style={{ 
                margin: '2px 0 0 0', 
                fontSize: '0.8rem', 
                color: '#718096',
                fontWeight: '500'
              }}>
                AI Content Organization
              </p>
            </div>
          </a>
          
          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a 
              href="#features"
              onClick={(e) => {
                e.preventDefault()
                scrollToFeatures()
              }}
              style={{
                color: '#4a5568',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#667eea'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#4a5568'
              }}
            >
              Features
            </a>
            <a 
              href="/dashboard"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.95rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}
            >
              Try Dashboard
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ paddingTop: '100px' }}>
        {/* Hero Section */}
        <section style={{ 
          padding: '80px 20px',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '800', 
            color: '#1a202c',
            margin: '0 0 24px 0',
            letterSpacing: '-0.03em',
            lineHeight: '1.1'
          }}>
            Organize Your
            <span style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}> AI Content</span>
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#4a5568', 
            margin: '0 0 48px 0',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            Centralize, organize, and discover your AI-generated content from ChatGPT, Claude, Midjourney, and more.
          </p>

          {/* Email Capture */}
          {!isSubscribed ? (
            <form onSubmit={handleEmailSubmit} style={{ 
              display: 'flex', 
              gap: '12px', 
              maxWidth: '400px', 
              margin: '0 auto 48px auto',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  flex: '1',
                  minWidth: '250px',
                  padding: '16px 20px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea'
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0'
                  e.target.style.boxShadow = 'none'
                }}
              />
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isLoading ? 0.7 : 1,
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)'
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }
                }}
              >
                {isLoading ? 'Subscribing...' : 'Get Early Access'}
              </button>
            </form>
          ) : (
            <div style={{
              background: '#f0fff4',
              border: '1px solid #9ae6b4',
              color: '#22543d',
              padding: '16px 24px',
              borderRadius: '12px',
              margin: '0 auto 48px auto',
              maxWidth: '400px',
              fontWeight: '500'
            }}>
              ✅ Thanks! We'll notify you when we launch.
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="/dashboard"
              style={{
                background: 'white',
                color: '#667eea',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                border: '2px solid #667eea',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#667eea'
                e.currentTarget.style.color = 'white'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.color = '#667eea'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}
            >
              Try Dashboard
            </a>
            <button
              onClick={scrollToFeatures}
              style={{
                background: 'transparent',
                color: '#4a5568',
                padding: '16px 32px',
                borderRadius: '12px',
                border: '2px solid #e2e8f0',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#f8fafc'
                e.currentTarget.style.borderColor = '#cbd5e0'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = '#e2e8f0'
              }}
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{ 
          padding: '80px 20px',
          background: 'white',
          margin: '40px 0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ 
              textAlign: 'center', 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#1a202c',
              margin: '0 0 64px 0',
              letterSpacing: '-0.02em'
            }}>
              Everything you need to organize AI content
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '40px' 
            }}>
              <div style={{
                padding: '32px',
                background: '#f8fafc',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '24px'
                }}>
                  💬
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: '#1a202c',
                  margin: '0 0 16px 0'
                }}>
                  Centralized Storage
                </h3>
                <p style={{ 
                  color: '#4a5568', 
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Store all your AI conversations, code snippets, images, and text in one organized place.
                </p>
              </div>

              <div style={{
                padding: '32px',
                background: '#f8fafc',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '24px'
                }}>
                  🔍
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: '#1a202c',
                  margin: '0 0 16px 0'
                }}>
                  Smart Search
                </h3>
                <p style={{ 
                  color: '#4a5568', 
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Find any piece of content instantly with powerful search and filtering capabilities.
                </p>
              </div>

              <div style={{
                padding: '32px',
                background: '#f8fafc',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '24px'
                }}>
                  🏷️
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: '#1a202c',
                  margin: '0 0 16px 0'
                }}>
                  Smart Tagging
                </h3>
                <p style={{ 
                  color: '#4a5568', 
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Automatically tag and categorize your content for easy organization and discovery.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 