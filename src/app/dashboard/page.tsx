'use client'

import React, { useState } from 'react'

interface ContentItem {
  id: string
  title: string
  type: 'chat' | 'image' | 'code' | 'text'
  source: string
  date: string
  tags: string[]
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newContent, setNewContent] = useState({
    title: '',
    type: 'text' as const,
    source: '',
    content: '',
    tags: ''
  })

  // Mock data
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'ChatGPT Conversation: Marketing Strategy',
      type: 'chat',
      source: 'ChatGPT',
      date: '2024-01-15',
      tags: ['marketing', 'strategy', 'business']
    },
    {
      id: '2',
      title: 'Midjourney: Product Mockup',
      type: 'image',
      source: 'Midjourney',
      date: '2024-01-14',
      tags: ['design', 'product', 'mockup']
    },
    {
      id: '3',
      title: 'Python Script: Data Analysis',
      type: 'code',
      source: 'Claude',
      date: '2024-01-13',
      tags: ['python', 'data', 'analysis']
    }
  ])

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: newContent.title,
      type: newContent.type,
      source: newContent.source,
      date: new Date().toISOString().split('T')[0],
      tags: newContent.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    }
    
    setContentItems([newItem, ...contentItems])
    setNewContent({ title: '', type: 'text', source: '', content: '', tags: '' })
    setShowAddForm(false)
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
          <div>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.02em' }}>
              Neural Hub Dashboard
            </h1>
            <p style={{ margin: '4px 0 0 0', opacity: 0.8, fontSize: '0.9rem' }}>
              Organize your AI content
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            style={{
              background: 'white',
              color: '#667eea',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
              transition: 'all 0.2s ease',
              letterSpacing: '-0.01em'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            + Add Content
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
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
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
            }}
            >
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
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Try adjusting your search or filters, or add some new content!</p>
          </div>
        )}
      </div>

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