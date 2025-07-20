import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { userStorage } from '@/lib/users'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user
    const user = userStorage.findByEmail(email)
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message: 'If an account with that email exists, a password reset link has been sent.'
      })
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    
    // Set password reset token
    const updatedUser = userStorage.setPasswordResetToken(email, resetToken)
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to generate reset token' },
        { status: 500 }
      )
    }

    // In production, send reset email here
    console.log('Password reset token:', resetToken)
    console.log('Reset URL:', `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`)

    return NextResponse.json({
      message: 'If an account with that email exists, a password reset link has been sent.'
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 