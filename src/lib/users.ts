// Shared user storage with enhanced account features
export interface User {
  id: string
  email: string
  name: string
  password: string
  createdAt: string
  emailVerified: boolean
  emailVerificationToken?: string
  emailVerificationExpires?: string
  twoFactorEnabled: boolean
  twoFactorSecret?: string
  passwordResetToken?: string
  passwordResetExpires?: string
  lastLogin?: string
  content: any[]
  settings: {
    theme: string
    notifications: boolean
    emailNotifications: boolean
    preferredAIPlatforms: string[]
  }
  profile: {
    avatar?: string
    bio?: string
    location?: string
    website?: string
    company?: string
    jobTitle?: string
  }
  billing: {
    plan: 'free' | 'pro' | 'enterprise'
    stripeCustomerId?: string
    address?: {
      line1: string
      line2?: string
      city: string
      state: string
      postalCode: string
      country: string
    }
    paymentMethod?: {
      type: string
      last4: string
      brand: string
    }
  }
}

// Global user storage that persists across API calls
let users: User[] = []

export const userStorage = {
  // Add a new user
  createUser: (user: Omit<User, 'id' | 'createdAt' | 'emailVerified' | 'twoFactorEnabled' | 'content' | 'settings' | 'profile' | 'billing'>) => {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      emailVerified: false,
      twoFactorEnabled: false,
      content: [],
      settings: {
        theme: 'light',
        notifications: true,
        emailNotifications: true,
        preferredAIPlatforms: ['ChatGPT', 'Claude', 'Midjourney']
      },
      profile: {
        avatar: '',
        bio: '',
        location: '',
        website: '',
        company: '',
        jobTitle: ''
      },
      billing: {
        plan: 'free'
      }
    }
    users.push(newUser)
    return newUser
  },

  // Find user by email
  findByEmail: (email: string) => {
    return users.find(user => user.email === email)
  },

  // Find user by ID
  findById: (id: string) => {
    return users.find(user => user.id === id)
  },

  // Update user
  updateUser: (id: string, updates: Partial<User>) => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      return users[userIndex]
    }
    return null
  },

  // Verify email
  verifyEmail: (token: string) => {
    const user = users.find(u => u.emailVerificationToken === token && u.emailVerificationExpires && new Date(u.emailVerificationExpires) > new Date())
    if (user) {
      user.emailVerified = true
      user.emailVerificationToken = undefined
      user.emailVerificationExpires = undefined
      return user
    }
    return null
  },

  // Set password reset token
  setPasswordResetToken: (email: string, token: string) => {
    const user = users.find(u => u.email === email)
    if (user) {
      user.passwordResetToken = token
      user.passwordResetExpires = new Date(Date.now() + 3600000).toISOString() // 1 hour
      return user
    }
    return null
  },

  // Reset password
  resetPassword: (token: string, newPassword: string) => {
    const user = users.find(u => u.passwordResetToken === token && u.passwordResetExpires && new Date(u.passwordResetExpires) > new Date())
    if (user) {
      user.password = newPassword
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      return user
    }
    return null
  },

  // Update last login
  updateLastLogin: (id: string) => {
    const user = users.find(u => u.id === id)
    if (user) {
      user.lastLogin = new Date().toISOString()
      return user
    }
    return null
  },

  // Get all users (for debugging)
  getAll: () => {
    return users
  },

  // Add some sample users for testing
  addSampleUsers: () => {
    if (users.length === 0) {
      console.log('Adding sample users for testing...')
      // Add a test user
      const testUser: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK2O', // password: test123
        createdAt: new Date().toISOString(),
        emailVerified: true,
        twoFactorEnabled: false,
        lastLogin: new Date().toISOString(),
        content: [],
        settings: {
          theme: 'light',
          notifications: true,
          emailNotifications: true,
          preferredAIPlatforms: ['ChatGPT', 'Claude', 'Midjourney']
        },
        profile: {
          avatar: '',
          bio: 'AI enthusiast and content creator',
          location: 'San Francisco, CA',
          website: 'https://example.com',
          company: 'Tech Corp',
          jobTitle: 'Product Manager'
        },
        billing: {
          plan: 'free'
        }
      }
      users.push(testUser)
    }
  }
}

// Initialize with sample users
userStorage.addSampleUsers() 