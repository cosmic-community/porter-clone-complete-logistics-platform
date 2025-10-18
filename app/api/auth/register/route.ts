import { NextResponse } from 'next/server'
import { getUserByEmail, createUser } from '@/lib/cosmic'
import { createToken, setAuthCookie } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { full_name, email, password, phone_number, role } = await request.json()

    if (!full_name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10)

    // Create user
    const newUser = await createUser({
      full_name,
      email,
      password_hash,
      phone_number,
      role: role || 'Customer',
    })

    // Create session
    const sessionUser = {
      id: newUser.id,
      email: newUser.metadata?.email || '',
      name: newUser.metadata?.full_name || '',
      role: newUser.metadata?.role || 'Customer',
    }

    const token = await createToken(sessionUser)
    await setAuthCookie(token)

    return NextResponse.json({
      success: true,
      user: sessionUser,
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}