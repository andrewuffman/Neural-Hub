'use client'

import React from 'react'
import Navigation from '@/components/Navigation'

export default function AboutPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <Navigation />
      
      <div style={{ paddingTop: '100px' }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '40px 20px' 
        }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: '700', 
              color: '#1a202c',
              marginBottom: '20px',
              letterSpacing: '-0.02em'
            }}>
              About Neural Hub
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#4a5568',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              The ultimate platform for organizing, sharing, and discovering AI-generated content
            </p>
          </div>

          <div style={{ 
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f0f0f0',
            marginBottom: '40px'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '600', 
              color: '#2d3748',
              marginBottom: '24px',
              letterSpacing: '-0.01em'
            }}>
              What is Neural Hub?
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#4a5568',
              lineHeight: '1.7',
              marginBottom: '20px'
            }}>
              Neural Hub is a comprehensive platform designed to help you organize, manage, and share your AI-generated content. 
              Whether you're working with ChatGPT conversations, Midjourney images, Claude responses, or any other AI tools, 
              Neural Hub provides the perfect solution for keeping your digital content organized and accessible.
            </p>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#4a5568',
              lineHeight: '1.7'
            }}>
              Our platform combines powerful organization tools with a collaborative community where users can share their 
              best AI prompts, use cases, and creative content with others. This creates a thriving ecosystem of knowledge 
              sharing and inspiration for AI enthusiasts, professionals, and creators.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginBottom: '40px'
          }}>
            <div style={{ 
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #f0f0f0',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '20px',
                filter: 'grayscale(0.2)'
              }}>
                📁
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                color: '#2d3748',
                marginBottom: '12px'
              }}>
                Organize Everything
              </h3>
              <p style={{ 
                color: '#718096',
                lineHeight: '1.6'
              }}>
                Categorize and tag your AI content by type, source, and purpose. 
                Find exactly what you need with powerful search and filtering.
              </p>
            </div>

            <div style={{ 
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #f0f0f0',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '20px',
                filter: 'grayscale(0.2)'
              }}>
                🤝
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                color: '#2d3748',
                marginBottom: '12px'
              }}>
                Share & Collaborate
              </h3>
              <p style={{ 
                color: '#718096',
                lineHeight: '1.6'
              }}>
                Share your best AI prompts and content with the community. 
                Discover amazing use cases from other creators and professionals.
              </p>
            </div>

            <div style={{ 
              background: 'white',
              padding: '30px',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid #f0f0f0',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '20px',
                filter: 'grayscale(0.2)'
              }}>
                🔒
              </div>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '600', 
                color: '#2d3748',
                marginBottom: '12px'
              }}>
                Secure & Private
              </h3>
              <p style={{ 
                color: '#718096',
                lineHeight: '1.6'
              }}>
                Keep your private content secure while choosing what to share. 
                Advanced security features protect your valuable AI assets.
              </p>
            </div>
          </div>

          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '40px',
            color: 'white',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '600', 
              marginBottom: '20px',
              letterSpacing: '-0.01em'
            }}>
              Ready to Get Started?
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              opacity: 0.9,
              marginBottom: '30px',
              lineHeight: '1.6'
            }}>
              Join thousands of users who are already organizing and sharing their AI content with Neural Hub
            </p>
            <a
              href="/login"
              style={{
                background: 'white',
                color: '#667eea',
                textDecoration: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                display: 'inline-block',
                letterSpacing: '-0.01em'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Create Your Account
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
