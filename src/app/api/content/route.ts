import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Simple in-memory storage (replace with database in production)
let users: any[] = []
let contentItems: any[] = []

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Helper function to verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  
  const token = authHeader.substring(7)
  try {
    return jwt.verify(token, JWT_SECRET) as any
  } catch {
    return null
  }
}

// GET - Fetch user's content
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userContent = contentItems.filter(item => item.userId === user.userId)
    
    return NextResponse.json({
      content: userContent
    })

  } catch (error) {
    console.error('Get content error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new content
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { title, type, source, content, tags, conversation, imageUrl, codeLanguage } = await request.json()

    // Validation
    if (!title || !type || !source) {
      return NextResponse.json(
        { error: 'Title, type, and source are required' },
        { status: 400 }
      )
    }

    const newContent = {
      id: Date.now().toString(),
      userId: user.userId,
      title,
      type,
      source,
      content,
      tags: tags || [],
      conversation,
      imageUrl,
      codeLanguage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    contentItems.push(newContent)

    return NextResponse.json({
      message: 'Content created successfully',
      content: newContent
    }, { status: 201 })

  } catch (error) {
    console.error('Create content error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update content
export async function PUT(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id, title, type, source, content, tags, conversation, imageUrl, codeLanguage } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      )
    }

    const contentIndex = contentItems.findIndex(item => item.id === id && item.userId === user.userId)
    
    if (contentIndex === -1) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      )
    }

    const updatedContent = {
      ...contentItems[contentIndex],
      title: title || contentItems[contentIndex].title,
      type: type || contentItems[contentIndex].type,
      source: source || contentItems[contentIndex].source,
      content: content || contentItems[contentIndex].content,
      tags: tags || contentItems[contentIndex].tags,
      conversation: conversation || contentItems[contentIndex].conversation,
      imageUrl: imageUrl || contentItems[contentIndex].imageUrl,
      codeLanguage: codeLanguage || contentItems[contentIndex].codeLanguage,
      updatedAt: new Date().toISOString()
    }

    contentItems[contentIndex] = updatedContent

    return NextResponse.json({
      message: 'Content updated successfully',
      content: updatedContent
    })

  } catch (error) {
    console.error('Update content error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete content
export async function DELETE(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      )
    }

    const contentIndex = contentItems.findIndex(item => item.id === id && item.userId === user.userId)
    
    if (contentIndex === -1) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      )
    }

    contentItems.splice(contentIndex, 1)

    return NextResponse.json({
      message: 'Content deleted successfully'
    })

  } catch (error) {
    console.error('Delete content error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 