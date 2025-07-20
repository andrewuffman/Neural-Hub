import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { userStorage } from '@/lib/users'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = userStorage.findByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex')
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours

    // Create user
    const newUser = userStorage.createUser({
      email,
      name,
      password: hashedPassword,
      emailVerificationToken,
      emailVerificationExpires
    })

    // In production, send verification email here
    console.log('Email verification token:', emailVerificationToken)
    console.log('Verification URL:', `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email?token=${emailVerificationToken}`)

    // Return user without password and sensitive data
    const { password: _, emailVerificationToken: __, ...userWithoutSensitiveData } = newUser

    return NextResponse.json({
      message: 'User created successfully. Please check your email to verify your account.',
      user: userWithoutSensitiveData,
      requiresEmailVerification: true
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 