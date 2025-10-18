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
    console.log('Looking for user with email:', email)
    const user = await getUserByEmail(email)

    if (!user) {
      console.log('User not found for email:', email)
      return NextResponse.json(
        { 
          success: false, 
          error: 'No account found with this email. Please check your email or register a new account.',
          code: 'USER_NOT_FOUND'
        },
        { status: 401 }
      )
    }

    console.log('User found:', user.id, 'with role:', user.metadata?.role)

    // Check if user is active
    if (user.metadata?.is_active === false) {
      console.log('User account is inactive:', user.id)
      return NextResponse.json(
        { success: false, error: 'Account is inactive. Please contact support.' },
        { status: 401 }
      )
    }

    // Verify password exists
    if (!user.metadata?.password_hash) {
      console.error('User has no password hash:', user.id)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Account setup incomplete. Please contact support or register again.',
          code: 'NO_PASSWORD'
        },
        { status: 500 }
      )
    }

    // Verify password
    console.log('Verifying password for user:', user.id)
    const isPasswordValid = await bcrypt.compare(
      password,
      user.metadata.password_hash
    )

    if (!isPasswordValid) {
      console.log('Invalid password for user:', user.id)
      return NextResponse.json(
        { success: false, error: 'Invalid password. Please try again.' },
        { status: 401 }
      )
    }

    console.log('Password verified successfully for user:', user.id)

    // Create session
    const sessionUser = {
      id: user.id,
      email: user.metadata?.email || '',
      name: user.metadata?.full_name || '',
      role: user.metadata?.role || 'Customer',
    }

    console.log('Creating session for user:', sessionUser)

    const token = await createToken(sessionUser)
    await setAuthCookie(token)

    console.log('Login successful for user:', user.id)

    return NextResponse.json({
      success: true,
      user: sessionUser,
    })
  } catch (error) {
    console.error('Login error:', error)
    
    // More specific error message based on error type
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during login'
    
    return NextResponse.json(
      { 
        success: false, 
        error: `Login failed: ${errorMessage}`,
        code: 'SERVER_ERROR'
      },
      { status: 500 }
    )
  }
}