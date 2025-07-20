'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TestVerificationPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleManualVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`✅ ${data.message}`)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setMessage(`❌ ${data.error}`)
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
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
        </div>
      </header>

      <div style={{
        background: 'white',
        padding: '48px',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f0f0f0',
        width: '100%',
        maxWidth: '500px',
        marginTop: '80px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ 
            margin: '0 0 8px 0',
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1a202c',
            letterSpacing: '-0.02em'
          }}>
            Test Email Verification
          </h2>
          <p style={{ 
            margin: 0,
            color: '#718096',
            fontSize: '1rem'
          }}>
            Manually verify your email for testing purposes
          </p>
        </div>

        <div style={{
          background: '#fef3c7',
          border: '1px solid #f59e0b',
          color: '#92400e',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '24px',
          fontSize: '0.9rem'
        }}>
          <strong>Note:</strong> This is a testing page. In production, users would receive verification emails. For now, enter your email below to manually verify your account.
        </div>

        <form onSubmit={handleManualVerification}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '600',
              color: '#374151',
              fontSize: '0.9rem'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea'
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
              placeholder="Enter your email address"
            />
          </div>

          {message && (
            <div style={{
              background: message.includes('✅') ? '#f0fff4' : '#fef2f2',
              border: `1px solid ${message.includes('✅') ? '#9ae6b4' : '#fecaca'}`,
              color: message.includes('✅') ? '#22543d' : '#dc2626',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '0.9rem'
            }}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: isLoading ? 0.7 : 1,
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              marginBottom: '20px'
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
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>

          <div style={{ textAlign: 'center' }}>
            <a 
              href="/login"
              style={{
                color: '#667eea',
                textDecoration: 'underline',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  )
} 