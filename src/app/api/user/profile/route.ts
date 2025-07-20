import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { userStorage } from '@/lib/users'

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

// GET - Get user profile
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userData = userStorage.findById(user.userId)
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Return user without sensitive data
    const { password: _, emailVerificationToken: __, passwordResetToken: ___, twoFactorSecret: ____, ...userWithoutSensitiveData } = userData

    return NextResponse.json({
      user: userWithoutSensitiveData
    })

  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const updates = await request.json()
    
    // Update user
    const updatedUser = userStorage.updateUser(user.userId, updates)
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Return user without sensitive data
    const { password: _, emailVerificationToken: __, passwordResetToken: ___, twoFactorSecret: ____, ...userWithoutSensitiveData } = updatedUser

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: userWithoutSensitiveData
    })

  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 