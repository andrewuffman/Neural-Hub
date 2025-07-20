'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'

interface SharedContent {
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
  author: {
    name: string
    id: string
  }
  likes: number
  isPublic: boolean
}

export default function ContentLibraryPage() {
  const [sharedContent, setSharedContent] = useState<SharedContent[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContent, setSelectedContent] = useState<SharedContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading shared content
    setTimeout(() => {
      setSharedContent([
        {
          id: '1',
          title: 'Marketing Copy Generator',
          type: 'chat',
          source: 'ChatGPT',
          date: '2024-01-15',
          tags: ['marketing', 'copywriting', 'business'],
          author: { name: 'Sarah Chen', id: 'user1' },
          likes: 42,
          isPublic: true,
          conversation: [
            {
              role: 'user',
              message: 'Write a compelling marketing copy for a new AI productivity tool',
              timestamp: '2024-01-15 10:30'
            },
            {
              role: 'assistant',
              message: 'Here\'s a compelling marketing copy for your AI productivity tool:\n\n🚀 Transform Your Workflow with AI-Powered Efficiency\n\nTired of spending hours on repetitive tasks? Our cutting-edge AI tool streamlines your workflow, saving you 5+ hours every week.\n\n✨ Key Features:\n• Smart automation for routine tasks\n• Intelligent document processing\n• Real-time collaboration tools\n• Seamless integration with your existing tools\n\n🎯 Perfect for: Entrepreneurs, teams, and professionals who want to work smarter, not harder.\n\nReady to revolutionize your productivity? Start your free trial today!',
              timestamp: '2024-01-15 10:31'
            }
          ]
        },
        {
          id: '2',
          title: 'React Component Architecture',
          type: 'code',
          source: 'Claude',
          date: '2024-01-14',
          tags: ['react', 'javascript', 'frontend'],
          author: { name: 'Mike Johnson', id: 'user2' },
          likes: 28,
          isPublic: true,
          codeLanguage: 'javascript',
          content: `// Modern React Component Architecture
import React, { useState, useEffect } from 'react'

// Custom hook for data fetching
const useDataFetching = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

// Main component
const DataDisplay = ({ url }) => {
  const { data, loading, error } = useDataFetching(url)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data available</div>

  return (
    <div className="data-display">
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  )
}

export default DataDisplay`
        },
        {
          id: '3',
          title: 'Creative Writing Prompts',
          type: 'text',
          source: 'Claude',
          date: '2024-01-13',
          tags: ['writing', 'creative', 'prompts'],
          author: { name: 'Emma Davis', id: 'user3' },
          likes: 35,
          isPublic: true,
          content: `Here are 10 creative writing prompts to spark your imagination:

1. **The Time Traveler's Dilemma**: You discover a device that can send you back in time for exactly 24 hours. You can only use it once. What do you do?

2. **The Last Library**: In a world where all books have been digitized, you find the last physical library. What secrets does it hold?

3. **The Memory Merchant**: You can buy and sell memories. What would you trade, and what would you buy?

4. **The Silent City**: You wake up in a city where no one can speak. How do you communicate and what caused this phenomenon?

5. **The Dream Collector**: You have the ability to enter other people's dreams. What do you discover?

6. **The Color Thief**: Someone is stealing colors from the world. What happens when they take your favorite color?

7. **The Recipe for Happiness**: You find a cookbook with recipes that can change emotions. What do you cook?

8. **The Last Photograph**: You take the last photograph ever. What do you capture?

9. **The Language of Animals**: You wake up one day able to understand all animals. What do they tell you?

10. **The Infinite Library**: You discover a library with every book that could ever be written. How do you choose what to read?`
        },
        {
          id: '4',
          title: 'AI Art Style Guide',
          type: 'image',
          source: 'Midjourney',
          date: '2024-01-12',
          tags: ['art', 'design', 'midjourney'],
          author: { name: 'Alex Rivera', id: 'user4' },
          likes: 51,
          isPublic: true,
          imageUrl: 'https://via.placeholder.com/400x300/667eea/ffffff?text=AI+Art+Style+Guide',
          content: 'A comprehensive guide to creating stunning AI-generated artwork using Midjourney. This guide covers various artistic styles, techniques, and best practices for achieving professional-quality results.'
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chat': return '💬'
      case 'image': return '🖼️'
      case 'code': return '💻'
      case 'text': return '📝'
      default: return '📄'
    }
  }

  const filteredContent = sharedContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         item.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === 'all' || item.type === activeTab
    return matchesSearch && matchesTab
  })

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <Navigation />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading shared content...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <Navigation />
      
      <div style={{ paddingTop: '100px' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '32px 20px' 
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#1a202c',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Content Library
            </h1>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#4a5568',
              lineHeight: '1.6'
            }}>
              Discover amazing AI content shared by the Neural Hub community
            </p>
          </div>

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
              placeholder="Search content, tags, or authors..."
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
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ 
                    fontSize: '2rem', 
                    marginRight: '16px',
                    filter: 'grayscale(0.2)'
                  }}>
                    {getTypeIcon(item.type)}
                  </span>
                  <div style={{ flex: 1 }}>
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
                      by {item.author.name} • {item.source} • {item.date}
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
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

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  fontSize: '0.85rem',
                  color: '#888'
                }}>
                  <span>❤️ {item.likes} likes</span>
                  <span>Click to view</span>
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
              <div style={{ fontSize: '4rem', marginBottom: '24px', opacity: 0.5 }}>🔍</div>
              <h3 style={{ margin: '0 0 12px 0', color: '#666', fontWeight: '600' }}>No content found</h3>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>
                Try adjusting your search or filters to find shared content
              </p>
            </div>
          )}
        </div>
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
                by {selectedContent.author.name} • {selectedContent.source} • {selectedContent.date} • ❤️ {selectedContent.likes} likes
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
                        {message.role === 'user' ? 'User' : selectedContent.source} • {message.timestamp}
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
                  <pre style={{
                    background: '#f8f9fa',
                    padding: '16px',
                    borderRadius: '0 0 8px 8px',
                    overflow: 'auto',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    border: '1px solid #e5e5e5',
                    borderTop: 'none',
                    margin: 0
                  }}>
                    <code>{selectedContent.content}</code>
                  </pre>
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
    </div>
  )
}
