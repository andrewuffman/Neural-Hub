'use client'

import React, { useState } from 'react'

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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [newContent, setNewContent] = useState({
    title: '',
    type: 'text' as const,
    source: '',
    content: '',
    tags: ''
  })

  // Enhanced mock data with sample conversations
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'ChatGPT: Marketing Strategy for SaaS Startup',
      type: 'chat',
      source: 'ChatGPT',
      date: '2024-01-15',
      tags: ['marketing', 'strategy', 'saas', 'startup'],
      conversation: [
        {
          role: 'user',
          message: 'I need help creating a marketing strategy for my SaaS startup. We offer project management software for remote teams.',
          timestamp: '10:30 AM'
        },
        {
          role: 'assistant',
          message: 'Great! Let\'s create a comprehensive marketing strategy. First, let\'s identify your target audience: remote teams, project managers, and small to medium businesses. What\'s your current user base size and what channels are you currently using?',
          timestamp: '10:31 AM'
        },
        {
          role: 'user',
          message: 'We have about 500 users, mostly from LinkedIn and word of mouth. Our budget is limited - around $5k/month for marketing.',
          timestamp: '10:32 AM'
        },
        {
          role: 'assistant',
          message: 'Perfect! With a $5k budget, I recommend this strategy:\n\n1. **Content Marketing (40% - $2k)**:\n   - Weekly blog posts about remote work\n   - LinkedIn thought leadership content\n   - Guest posts on project management blogs\n\n2. **Paid Social (30% - $1.5k)**:\n   - LinkedIn ads targeting project managers\n   - Facebook/Instagram for broader awareness\n\n3. **SEO (20% - $1k)**:\n   - Keyword optimization for "project management software"\n   - Local SEO for remote work communities\n\n4. **Partnerships (10% - $500)**:\n   - Co-marketing with remote work tools\n   - Affiliate programs\n\nWould you like me to dive deeper into any of these areas?',
          timestamp: '10:33 AM'
        }
      ]
    },
    {
      id: '2',
      title: 'Midjourney: Product Mockup for Mobile App',
      type: 'image',
      source: 'Midjourney',
      date: '2024-01-14',
      tags: ['design', 'mobile', 'app', 'mockup'],
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      content: 'Generated mobile app interface mockup with modern design, showing dashboard layout with charts and navigation elements.'
    },
    {
      id: '3',
      title: 'Claude: Python Data Analysis Script',
      type: 'code',
      source: 'Claude',
      date: '2024-01-13',
      tags: ['python', 'data', 'analysis', 'pandas'],
      codeLanguage: 'python',
      content: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load and analyze user engagement data
df = pd.read_csv('user_engagement.csv')

# Calculate key metrics
daily_active_users = df.groupby('date')['user_id'].nunique()
avg_session_duration = df.groupby('user_id')['session_duration'].mean()

# Create visualization
plt.figure(figsize=(12, 6))
daily_active_users.plot(kind='line')
plt.title('Daily Active Users Over Time')
plt.xlabel('Date')
plt.ylabel('Active Users')
plt.show()

# User segmentation analysis
user_segments = df.groupby('user_type').agg({
    'session_duration': 'mean',
    'page_views': 'sum',
    'conversion_rate': 'mean'
}).round(2)

print("User Segment Analysis:")
print(user_segments)`
    },
    {
      id: '4',
      title: 'ChatGPT: Content Calendar Planning',
      type: 'chat',
      source: 'ChatGPT',
      date: '2024-01-12',
      tags: ['content', 'calendar', 'planning', 'social-media'],
      conversation: [
        {
          role: 'user',
          message: 'I need help creating a content calendar for our tech blog. We want to post 3 times per week.',
          timestamp: '2:15 PM'
        },
        {
          role: 'assistant',
          message: 'I\'ll help you create a structured content calendar! Here\'s a suggested format:\n\n**Monday**: How-to/Tutorial posts\n**Wednesday**: Industry insights/Thought leadership\n**Friday**: Case studies/Success stories\n\nFor each post, plan:\n- Topic\n- Target keyword\n- Call-to-action\n- Social media angles\n\nWould you like me to suggest specific topics for the next month?',
          timestamp: '2:16 PM'
        },
        {
          role: 'user',
          message: 'Yes, please! We focus on AI and productivity tools.',
          timestamp: '2:17 PM'
        },
        {
          role: 'assistant',
          message: 'Perfect! Here\'s your 4-week content calendar:\n\n**Week 1**:\n- Mon: "10 AI Tools That Will 10x Your Productivity"\n- Wed: "The Future of Work: AI Integration Strategies"\n- Fri: "How Company X Increased Efficiency by 300% with AI"\n\n**Week 2**:\n- Mon: "Building Your First AI-Powered Workflow"\n- Wed: "AI Ethics in the Workplace"\n- Fri: "Productivity Metrics That Actually Matter"\n\n**Week 3**:\n- Mon: "Automating Email Management with AI"\n- Wed: "The ROI of AI Implementation"\n- Fri: "Remote Team Collaboration Tools"\n\n**Week 4**:\n- Mon: "AI-Powered Project Management"\n- Wed: "Data-Driven Decision Making"\n- Fri: "Scaling Your Business with AI"\n\nEach post should be 1500-2000 words with actionable takeaways.',
          timestamp: '2:18 PM'
        }
      ]
    },
    {
      id: '5',
      title: 'Claude: React Component Architecture',
      type: 'code',
      source: 'Claude',
      date: '2024-01-11',
      tags: ['react', 'javascript', 'frontend', 'architecture'],
      codeLanguage: 'javascript',
      content: `// Dashboard Component Architecture
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard">
      <Header />
      <MetricsGrid data={data.metrics} />
      <ContentList data={data.content} />
      <ActivityFeed data={data.activity} />
    </div>
  );
};

export default Dashboard;`
    },
    {
      id: '6',
      title: 'Midjourney: Brand Identity Concepts',
      type: 'image',
      source: 'Midjourney',
      date: '2024-01-10',
      tags: ['branding', 'logo', 'identity', 'design'],
      imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      content: 'Brand identity concept showing logo variations, color palette, and typography options for a modern tech company.'
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
                Neural Hub Dashboard
              </h1>
              <p style={{ margin: '4px 0 0 0', opacity: 0.8, fontSize: '0.9rem' }}>
                Organize your AI content
              </p>
            </div>
          </a>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a 
              href="/"
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
              ← Back to Home
            </a>
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