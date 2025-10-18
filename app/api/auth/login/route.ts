import { NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/cosmic'
import { createToken, setAuthCookie } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if user is active
    if (!user.metadata?.is_active) {
      return NextResponse.json(
        { success: false, error: 'Account is inactive' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.metadata?.password_hash || ''
    )

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create session
    const sessionUser = {
      id: user.id,
      email: user.metadata?.email || '',
      name: user.metadata?.full_name || '',
      role: user.metadata?.role || 'Customer',
    }

    const token = await createToken(sessionUser)
    await setAuthCookie(token)

    return NextResponse.json({
      success: true,
      user: sessionUser,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}