'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
  twoFactorEnabled: boolean
  lastLogin?: string
  settings: {
    theme: string
    notifications: boolean
    emailNotifications: boolean
    preferredAIPlatforms: string[]
  }
  profile: {
    avatar?: string
    bio?: string
    location?: string
    website?: string
    company?: string
    jobTitle?: string
  }
  billing: {
    plan: 'free' | 'pro' | 'enterprise'
    address?: {
      line1: string
      line2?: string
      city: string
      state: string
      postalCode: string
      country: string
    }
  }
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/login')
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch (error) {
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleSave = async (updates: Partial<User>) => {
    setIsSaving(true)
    setMessage('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        setMessage('Profile updated successfully!')
      } else {
        setMessage('Failed to update profile')
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading your account...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fafafa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '24px 20px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
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
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              backdropFilter: 'blur(10px)'
            }}>
              N
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em' }}>
                Account Settings
              </h1>
              <p style={{ margin: '4px 0 0 0', opacity: 0.8, fontSize: '0.9rem' }}>
                Manage your profile and preferences
              </p>
            </div>
          </a>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a 
              href="/dashboard"
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
              }}
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Tabs */}
        <div style={{ 
          background: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          marginBottom: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { id: 'profile', label: 'Profile', icon: '👤' },
              { id: 'security', label: 'Security', icon: '🔒' },
              { id: 'billing', label: 'Billing', icon: '💳' },
              { id: 'preferences', label: 'Preferences', icon: '⚙️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 20px',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: activeTab === tab.id ? '#667eea' : '#f8f9fa',
                  color: activeTab === tab.id ? 'white' : '#666',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = '#f0f0f0'
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = '#f8f9fa'
                  }
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ 
          background: 'white', 
          padding: '32px', 
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #f0f0f0'
        }}>
          {message && (
            <div style={{
              background: message.includes('successfully') ? '#f0fff4' : '#fef2f2',
              border: `1px solid ${message.includes('successfully') ? '#9ae6b4' : '#fecaca'}`,
              color: message.includes('successfully') ? '#22543d' : '#dc2626',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '0.9rem'
            }}>
              {message}
            </div>
          )}

          {activeTab === 'profile' && (
            <ProfileTab user={user} onSave={handleSave} isSaving={isSaving} />
          )}

          {activeTab === 'security' && (
            <SecurityTab user={user} onSave={handleSave} isSaving={isSaving} />
          )}

          {activeTab === 'billing' && (
            <BillingTab user={user} onSave={handleSave} isSaving={isSaving} />
          )}

          {activeTab === 'preferences' && (
            <PreferencesTab user={user} onSave={handleSave} isSaving={isSaving} />
          )}
        </div>
      </div>
    </div>
  )
}

// Profile Tab Component
function ProfileTab({ user, onSave, isSaving }: { user: User, onSave: (updates: Partial<User>) => void, isSaving: boolean }) {
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.profile.bio || '',
    location: user.profile.location || '',
    website: user.profile.website || '',
    company: user.profile.company || '',
    jobTitle: user.profile.jobTitle || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name: formData.name,
      profile: {
        ...user.profile,
        ...formData
      }
    })
  }

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', fontWeight: '700', color: '#1a202c' }}>
        Profile Information
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '0.9rem' }}>
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
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
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '0.9rem' }}>
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                background: '#f9fafb',
                color: '#6b7280',
                fontFamily: 'inherit'
              }}
            />
            <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#6b7280' }}>
              {user.emailVerified ? '✅ Verified' : '❌ Not verified'}
            </p>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '0.9rem' }}>
              Job Title
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
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
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '0.9rem' }}>
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
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
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '0.9rem' }}>
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
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
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '0.9rem' }}>
              Website
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
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
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151', fontSize: '0.9rem' }}>
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            rows={4}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea'
              e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.boxShadow = 'none'
            }}
            placeholder="Tell us about yourself..."
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            opacity: isSaving ? 0.7 : 1
          }}
          onMouseOver={(e) => {
            if (!isSaving) {
              e.currentTarget.style.transform = 'translateY(-1px)'
            }
          }}
          onMouseOut={(e) => {
            if (!isSaving) {
              e.currentTarget.style.transform = 'translateY(0)'
            }
          }}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

// Security Tab Component
function SecurityTab({ user, onSave, isSaving }: { user: User, onSave: (updates: Partial<User>) => void, isSaving: boolean }) {
  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', fontWeight: '700', color: '#1a202c' }}>
        Security Settings
      </h2>
      
      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          background: '#f9fafb'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>
            Two-Factor Authentication
          </h3>
          <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: '0.9rem' }}>
            Add an extra layer of security to your account.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ 
              padding: '4px 8px', 
              borderRadius: '4px', 
              fontSize: '0.8rem',
              fontWeight: '500',
              background: user.twoFactorEnabled ? '#dcfce7' : '#fef3c7',
              color: user.twoFactorEnabled ? '#166534' : '#92400e'
            }}>
              {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <button
              style={{
                background: user.twoFactorEnabled ? '#dc2626' : '#667eea',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {user.twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
            </button>
          </div>
        </div>

        <div style={{
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          background: '#f9fafb'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>
            Password
          </h3>
          <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: '0.9rem' }}>
            Last changed: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
          </p>
          <button
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Change Password
          </button>
        </div>

        <div style={{
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          background: '#f9fafb'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>
            Login History
          </h3>
          <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: '0.9rem' }}>
            Last login: {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
          </p>
        </div>
      </div>
    </div>
  )
}

// Billing Tab Component
function BillingTab({ user, onSave, isSaving }: { user: User, onSave: (updates: Partial<User>) => void, isSaving: boolean }) {
  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', fontWeight: '700', color: '#1a202c' }}>
        Billing & Subscription
      </h2>
      
      <div style={{ display: 'grid', gap: '20px' }}>
        <div style={{
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          background: '#f9fafb'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>
            Current Plan
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ 
              padding: '4px 12px', 
              borderRadius: '20px', 
              fontSize: '0.9rem',
              fontWeight: '600',
              background: '#667eea',
              color: 'white',
              textTransform: 'capitalize'
            }}>
              {user.billing.plan}
            </span>
            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              {user.billing.plan === 'free' ? 'Free forever' : '$29/month'}
            </span>
          </div>
          <button
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {user.billing.plan === 'free' ? 'Upgrade to Pro' : 'Manage Subscription'}
          </button>
        </div>

        <div style={{
          padding: '20px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          background: '#f9fafb'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>
            Payment Method
          </h3>
          <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: '0.9rem' }}>
            {user.billing.paymentMethod ? 
              `${user.billing.paymentMethod.brand} ending in ${user.billing.paymentMethod.last4}` : 
              'No payment method on file'
            }
          </p>
          <button
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {user.billing.paymentMethod ? 'Update Payment Method' : 'Add Payment Method'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Preferences Tab Component
function PreferencesTab({ user, onSave, isSaving }: { user: User, onSave: (updates: Partial<User>) => void, isSaving: boolean }) {
  const [preferences, setPreferences] = useState({
    theme: user.settings.theme,
    notifications: user.settings.notifications,
    emailNotifications: user.settings.emailNotifications,
    preferredAIPlatforms: [...user.settings.preferredAIPlatforms]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      settings: {
        ...user.settings,
        ...preferences
      }
    })
  }

  const togglePlatform = (platform: string) => {
    const updated = preferences.preferredAIPlatforms.includes(platform)
      ? preferences.preferredAIPlatforms.filter(p => p !== platform)
      : [...preferences.preferredAIPlatforms, platform]
    setPreferences({...preferences, preferredAIPlatforms: updated})
  }

  return (
    <div>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', fontWeight: '700', color: '#1a202c' }}>
        Preferences
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: '24px' }}>
          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>
              Theme
            </h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['light', 'dark', 'auto'].map(theme => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => setPreferences({...preferences, theme})}
                  style={{
                    padding: '8px 16px',
                    border: `2px solid ${preferences.theme === theme ? '#667eea' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    background: preferences.theme === theme ? '#667eea' : 'white',
                    color: preferences.theme === theme ? 'white' : '#374151',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textTransform: 'capitalize'
                  }}
                  onMouseOver={(e) => {
                    if (preferences.theme !== theme) {
                      e.currentTarget.style.borderColor = '#667eea'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (preferences.theme !== theme) {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }
                  }}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>
              Notifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={preferences.notifications}
                  onChange={(e) => setPreferences({...preferences, notifications: e.target.checked})}
                  style={{ width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '0.95rem', color: '#374151' }}>
                  Push notifications
                </span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={preferences.emailNotifications}
                  onChange={(e) => setPreferences({...preferences, emailNotifications: e.target.checked})}
                  style={{ width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '0.95rem', color: '#374151' }}>
                  Email notifications
                </span>
              </label>
            </div>
          </div>

          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>
              Preferred AI Platforms
            </h3>
            <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '0.9rem' }}>
              Select the AI platforms you use most frequently:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['ChatGPT', 'Claude', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'Anthropic', 'OpenAI', 'Google Bard'].map(platform => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => togglePlatform(platform)}
                  style={{
                    padding: '6px 12px',
                    border: `2px solid ${preferences.preferredAIPlatforms.includes(platform) ? '#667eea' : '#e5e7eb'}`,
                    borderRadius: '20px',
                    background: preferences.preferredAIPlatforms.includes(platform) ? '#667eea' : 'white',
                    color: preferences.preferredAIPlatforms.includes(platform) ? 'white' : '#374151',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!preferences.preferredAIPlatforms.includes(platform)) {
                      e.currentTarget.style.borderColor = '#667eea'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!preferences.preferredAIPlatforms.includes(platform)) {
                      e.currentTarget.style.borderColor = '#e5e7eb'
                    }
                  }}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            opacity: isSaving ? 0.7 : 1,
            marginTop: '24px'
          }}
          onMouseOver={(e) => {
            if (!isSaving) {
              e.currentTarget.style.transform = 'translateY(-1px)'
            }
          }}
          onMouseOut={(e) => {
            if (!isSaving) {
              e.currentTarget.style.transform = 'translateY(0)'
            }
          }}
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </button>
      </form>
    </div>
  )
} 