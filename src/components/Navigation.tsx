'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
}

interface NavigationProps {
  isAuthenticated?: boolean
  user?: User | null
}

export default function Navigation({ isAuthenticated = false, user }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleNeuralHubClick = () => {
    if (isAuthenticated && user) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  const menuItems = [
    { name: 'About', href: '/about', description: 'Learn about Neural Hub' },
    { name: 'Dashboard', href: '/dashboard', description: 'Your personal content hub', requiresAuth: true },
    { name: 'Content Library', href: '/library', description: 'Shared AI content from the community' },
    { name: 'Account', href: '/account', description: 'Manage your account settings', requiresAuth: true },
  ]

  return (
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
        {/* Neural Hub Logo */}
        <div 
          onClick={handleNeuralHubClick}
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
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Website Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: '#4a5568',
                fontSize: '0.95rem',
                fontWeight: '500',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#f7fafc'
                e.currentTarget.style.color = '#2d3748'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.color = '#4a5568'
              }}
            >
              Menu
              <span style={{ fontSize: '0.8rem' }}>▼</span>
            </button>

            {isMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                border: '1px solid #e2e8f0',
                padding: '8px',
                minWidth: '200px',
                zIndex: 1001
              }}>
                {menuItems.map((item) => {
                  if (item.requiresAuth && !isAuthenticated) return null
                  
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '12px 16px',
                        color: '#4a5568',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#f7fafc'
                        e.currentTarget.style.color = '#2d3748'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'none'
                        e.currentTarget.style.color = '#4a5568'
                      }}
                    >
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                        {item.description}
                      </div>
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* User Menu */}
          {isAuthenticated && user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {user.name}
                <span style={{ fontSize: '0.7rem' }}>▼</span>
              </button>

              {isUserMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #e2e8f0',
                  padding: '8px',
                  minWidth: '180px',
                  zIndex: 1001,
                  marginTop: '8px'
                }}>
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #e2e8f0',
                    marginBottom: '8px'
                  }}>
                    <div style={{ fontWeight: '600', color: '#2d3748', fontSize: '0.9rem' }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                      {user.email}
                    </div>
                  </div>
                  
                  <a
                    href="/dashboard"
                    onClick={() => setIsUserMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      color: '#4a5568',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#f7fafc'
                      e.currentTarget.style.color = '#2d3748'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'none'
                      e.currentTarget.style.color = '#4a5568'
                    }}
                  >
                    Dashboard
                  </a>
                  
                  <a
                    href="/account"
                    onClick={() => setIsUserMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      color: '#4a5568',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#f7fafc'
                      e.currentTarget.style.color = '#2d3748'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'none'
                      e.currentTarget.style.color = '#4a5568'
                    }}
                  >
                    Account Settings
                  </a>
                  
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      handleLogout()
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 16px',
                      color: '#e53e3e',
                      background: 'none',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#fed7d7'
                      e.currentTarget.style.color = '#c53030'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'none'
                      e.currentTarget.style.color = '#e53e3e'
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                letterSpacing: '-0.01em'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Sign In
            </a>
          )}
        </nav>
      </div>
    </header>
  )
}
