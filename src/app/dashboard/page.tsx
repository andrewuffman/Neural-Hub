'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'

interface ContentItem {
  id: string
  title: string
  type: 'chat' | 'image' | 'code' | 'text'
  source: string
  date: string
  tags: string[]
  content?: string
  conversation?: Array<{ role: 'user' | 'assistant', message: string, timestamp: string }>
  imageUrl?: string
  codeLanguage?: string
}

interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
  settings: {
    theme: string
    notifications: boolean
  }
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newContent, setNewContent] = useState({
    title: '',
    type: 'text' as const,
    source: '',
    content: '',
    tags: ''
  })
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      // Ensure emailVerified property exists
      const userWithEmailVerified = {
        ...parsedUser,
        emailVerified: parsedUser.emailVerified || false
      }
      setUser(userWithEmailVerified)
      fetchUserContent(token)
    } catch (error) {
      console.error('Error loading user data:', error)
      router.push('/login')
    }
  }, [router])

  const fetchUserContent = async (token: string) => {
    try {
      const response = await fetch('/api/content', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setContentItems(data.content || [])
      } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/login')
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newContent.title,
          type: newContent.type,
          source: newContent.source,
          content: newContent.content,
          tags: newContent.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        })
      })

      if (response.ok) {
        const data = await response.json()
        setContentItems([data.content, ...contentItems])
        setNewContent({ title: '', type: 'text', source: '', content: '', tags: '' })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error('Error adding content:', error)
    }
  }

  const handleDeleteContent = async (id: string) => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await fetch(`/api/content?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setContentItems(contentItems.filter(item => item.id !== id))
        if (selectedContent?.id === id) {
          setSelectedContent(null)
        }
      }
    } catch (error) {
      console.error('Error deleting content:', error)
    }
  }

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTab = activeTab === 'all' || item.type === activeTab
    return matchesSearch && matchesTab
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chat': return '💬'
      case 'image': return '🖼️'
      case 'code': return '💻'
      case 'text': return '📝'
      default: return '📄'
    }
  }

  const formatCode = (code: string, language: string = 'javascript') => {
    return (
      <pre style={{
        background: '#f8f9fa',
        padding: '16px',
        borderRadius: '8px',
        overflow: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        border: '1px solid #e5e5e5'
      }}>
        <code>{code}</code>
      </pre>
    )
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
        <Navigation isAuthenticated={true} user={user} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading your content...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fafafa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Navigation */}
      <Navigation isAuthenticated={true} user={user} />
      
      {/* Dashboard Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '120px 20px 40px 20px',
        marginBottom: '32px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          textAlign: 'center' 
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            letterSpacing: '-0.02em',
            marginBottom: '12px'
          }}>
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p style={{ 
            margin: 0, 
            opacity: 0.9, 
            fontSize: '1.1rem',
            marginBottom: '24px'
          }}>
            Manage your AI content and discover new possibilities
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                background: 'white',
                color: '#667eea',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                letterSpacing: '-0.01em'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              + Add Content
            </button>
            <a
              href="/library"
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                textDecoration: 'none',
                padding: '14px 28px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                letterSpacing: '-0.01em',
                display: 'inline-block'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Browse Library
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 32px 20px' }}>
        {/* Search and Filters */}
        <div style={{ 
          background: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          marginBottom: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #f0f0f0'
        }}>
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              fontSize: '16px',
              marginBottom: '20px',
              outline: 'none',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea'
              e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e5e5'
              e.target.style.boxShadow = 'none'
            }}
          />
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['all', 'chat', 'image', 'code', 'text'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  background: activeTab === tab ? '#667eea' : '#f8f9fa',
                  color: activeTab === tab ? 'white' : '#666',
                  fontWeight: activeTab === tab ? '600' : '500',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  letterSpacing: '-0.01em'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.background = '#f0f0f0'
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.background = '#f8f9fa'
                  }
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '24px' 
        }}>
          {filteredContent.map(item => (
            <div key={item.id} style={{
              background: 'white',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
            }}
            onClick={() => setSelectedContent(item)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteContent(item.id)
                }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#fecaca'
                  e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#fee2e2'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                ×
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ 
                  fontSize: '2rem', 
                  marginRight: '16px',
                  filter: 'grayscale(0.2)'
                }}>
                  {getTypeIcon(item.type)}
                </span>
                <div>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: '1.1rem', 
                    fontWeight: '600',
                    color: '#333',
                    letterSpacing: '-0.01em',
                    lineHeight: '1.3'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ 
                    margin: '6px 0 0 0', 
                    fontSize: '0.85rem', 
                    color: '#888',
                    fontWeight: '500'
                  }}>
                    {item.source} • {item.date}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {item.tags.map(tag => (
                  <span key={tag} style={{
                    background: '#f8f9fa',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '0.8rem',
                    color: '#666',
                    fontWeight: '500',
                    border: '1px solid #f0f0f0'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '80px 20px', 
            color: '#888',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '24px', opacity: 0.5 }}>📭</div>
            <h3 style={{ margin: '0 0 12px 0', color: '#666', fontWeight: '600' }}>No content found</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              {contentItems.length === 0 
                ? "You haven't added any content yet. Click 'Add Content' to get started!" 
                : "Try adjusting your search or filters, or add some new content!"}
            </p>
          </div>
        )}
      </div>

      {/* Content Detail Modal */}
      {selectedContent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            border: '1px solid #f0f0f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ 
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#333',
                letterSpacing: '-0.02em'
              }}>
                {selectedContent.title}
              </h2>
              <button
                onClick={() => setSelectedContent(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '8px'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 16px 0' }}>
                {selectedContent.source} • {selectedContent.date}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {selectedContent.tags.map(tag => (
                  <span key={tag} style={{
                    background: '#f8f9fa',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '0.8rem',
                    color: '#666',
                    fontWeight: '500',
                    border: '1px solid #f0f0f0'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Display */}
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
              {selectedContent.type === 'chat' && selectedContent.conversation && (
                <div>
                  {selectedContent.conversation.map((message, index) => (
                    <div key={index} style={{
                      marginBottom: '16px',
                      padding: '16px',
                      borderRadius: '12px',
                      background: message.role === 'user' ? '#f8f9fa' : '#667eea',
                      color: message.role === 'user' ? '#333' : 'white',
                      maxWidth: '80%',
                      marginLeft: message.role === 'user' ? '0' : 'auto'
                    }}>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        opacity: 0.7, 
                        marginBottom: '8px',
                        fontWeight: '600'
                      }}>
                        {message.role === 'user' ? 'You' : selectedContent.source} • {message.timestamp}
                      </div>
                      <div style={{ 
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.5'
                      }}>
                        {message.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedContent.type === 'image' && selectedContent.imageUrl && (
                <div>
                  <img 
                    src={selectedContent.imageUrl} 
                    alt={selectedContent.title}
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      marginBottom: '16px'
                    }}
                  />
                  <p style={{ color: '#666', lineHeight: '1.6' }}>
                    {selectedContent.content}
                  </p>
                </div>
              )}

              {selectedContent.type === 'code' && selectedContent.content && (
                <div>
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '8px 12px', 
                    borderRadius: '8px 8px 0 0',
                    border: '1px solid #e5e5e5',
                    borderBottom: 'none',
                    fontSize: '0.8rem',
                    color: '#666',
                    fontWeight: '600'
                  }}>
                    {selectedContent.codeLanguage || 'Code'}
                  </div>
                  {formatCode(selectedContent.content, selectedContent.codeLanguage)}
                </div>
              )}

              {selectedContent.type === 'text' && selectedContent.content && (
                <div style={{ 
                  color: '#333',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {selectedContent.content}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Content Modal */}
      {showAddForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            border: '1px solid #f0f0f0'
          }}>
            <h2 style={{ 
              marginTop: 0, 
              marginBottom: '24px',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#333',
              letterSpacing: '-0.02em'
            }}>
              Add New Content
            </h2>
            
            <form onSubmit={handleAddContent}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '0.9rem'
                }}>
                  Title
                </label>
                <input
                  type="text"
                  value={newContent.title}
                  onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e5e5',
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
                    e.target.style.borderColor = '#e5e5e5'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '0.9rem'
                }}>
                  Type
                </label>
                <select
                  value={newContent.type}
                  onChange={(e) => setNewContent({...newContent, type: e.target.value as any})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                    background: 'white'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea'
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e5e5'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  <option value="text">Text</option>
                  <option value="chat">Chat</option>
                  <option value="image">Image</option>
                  <option value="code">Code</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '0.9rem'
                }}>
                  Source
                </label>
                <input
                  type="text"
                  value={newContent.source}
                  onChange={(e) => setNewContent({...newContent, source: e.target.value})}
                  placeholder="e.g., ChatGPT, Midjourney, Claude"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e5e5',
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
                    e.target.style.borderColor = '#e5e5e5'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '0.9rem'
                }}>
                  Content
                </label>
                <textarea
                  value={newContent.content}
                  onChange={(e) => setNewContent({...newContent, content: e.target.value})}
                  placeholder="Enter your content here..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e5e5',
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
                    e.target.style.borderColor = '#e5e5e5'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600',
                  color: '#333',
                  fontSize: '0.9rem'
                }}>
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={newContent.tags}
                  onChange={(e) => setNewContent({...newContent, tags: e.target.value})}
                  placeholder="e.g., marketing, design, code"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e5e5',
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
                    e.target.style.borderColor = '#e5e5e5'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  style={{
                    padding: '12px 24px',
                    border: '1px solid #e5e5e5',
                    background: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    color: '#666'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#f8f9fa'
                    e.currentTarget.style.borderColor = '#d0d0d0'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'white'
                    e.currentTarget.style.borderColor = '#e5e5e5'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    background: '#667eea',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    letterSpacing: '-0.01em'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#5a67d8'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#667eea'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Add Content
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
