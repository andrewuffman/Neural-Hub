import { NextRequest, NextResponse } from 'next/server'
import { userStorage } from '@/lib/users'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Verify email
    const user = userStorage.verifyEmail(token)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Return success
    const { password: _, emailVerificationToken: __, passwordResetToken: ___, twoFactorSecret: ____, ...userWithoutSensitiveData } = user

    return NextResponse.json({
      message: 'Email verified successfully',
      user: userWithoutSensitiveData
    })

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Manual verification for testing (bypass email)
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user and manually verify
    const user = userStorage.findByEmail(email)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Manually verify the email
    user.emailVerified = true
    user.emailVerificationToken = undefined
    user.emailVerificationExpires = undefined

    // Return success
    const { password: _, emailVerificationToken: __, passwordResetToken: ___, twoFactorSecret: ____, ...userWithoutSensitiveData } = user

    return NextResponse.json({
      message: 'Email manually verified for testing',
      user: userWithoutSensitiveData
    })

  } catch (error) {
    console.error('Manual verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 