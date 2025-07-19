import React from 'react'

export default function HomePage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '1rem' }}>
        Neural Hub
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
        AI Content Organization Platform
      </p>
      <button style={{
        backgroundColor: '#0070f3',
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer'
      }}>
        Get Started
      </button>
    </div>
  )
}
