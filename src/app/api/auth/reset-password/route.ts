import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { userStorage } from '@/lib/users'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Reset password
    const user = userStorage.resetPassword(token, hashedPassword)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Return success
    const { password: _, emailVerificationToken: __, passwordResetToken: ___, twoFactorSecret: ____, ...userWithoutSensitiveData } = user

    return NextResponse.json({
      message: 'Password reset successfully',
      user: userWithoutSensitiveData
    })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 