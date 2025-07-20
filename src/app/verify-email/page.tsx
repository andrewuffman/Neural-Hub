'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      setMessage('Invalid verification link')
      return
    }

    // Verify email
    fetch(`/api/auth/verify-email?token=${token}`)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          setStatus('success')
          setMessage(data.message)
        } else {
          setStatus('error')
          setMessage(data.error || 'Verification failed')
        }
      })
      .catch(error => {
        setStatus('error')
        setMessage('Verification failed. Please try again.')
      })
  }, [searchParams])

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
        marginTop: '80px',
        textAlign: 'center'
      }}>
        {status === 'loading' && (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '24px' }}>⏳</div>
            <h2 style={{ 
              margin: '0 0 16px 0',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1a202c'
            }}>
              Verifying Your Email
            </h2>
            <p style={{ 
              margin: 0,
              color: '#718096',
              fontSize: '1rem'
            }}>
              Please wait while we verify your email address...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '24px' }}>✅</div>
            <h2 style={{ 
              margin: '0 0 16px 0',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1a202c'
            }}>
              Email Verified!
            </h2>
            <p style={{ 
              margin: '0 0 32px 0',
              color: '#718096',
              fontSize: '1rem'
            }}>
              {message}
            </p>
            <button
              onClick={() => router.push('/login')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
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
              Sign In Now
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '24px' }}>❌</div>
            <h2 style={{ 
              margin: '0 0 16px 0',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1a202c'
            }}>
              Verification Failed
            </h2>
            <p style={{ 
              margin: '0 0 32px 0',
              color: '#718096',
              fontSize: '1rem'
            }}>
              {message}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => router.push('/login')}
                style={{
                  background: 'white',
                  color: '#667eea',
                  border: '2px solid #667eea',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#667eea'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.color = '#667eea'
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/')}
                style={{
                  background: 'transparent',
                  color: '#718096',
                  border: '1px solid #e2e8f0',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f8fafc'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Go Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 