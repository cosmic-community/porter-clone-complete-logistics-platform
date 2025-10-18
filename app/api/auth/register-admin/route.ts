import { NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/cosmic'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password, full_name } = await request.json()

    if (!email || !password || !full_name) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if admin already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10)

    // Create admin user
    const newUser = await createUser({
      full_name,
      email,
      password_hash,
      role: 'Admin',
    })

    console.log('Admin user created successfully:', newUser.id)

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: newUser.id,
        email: newUser.metadata?.email,
        name: newUser.metadata?.full_name,
        role: newUser.metadata?.role,
      },
    })
  } catch (error) {
    console.error('Admin registration error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to create admin user'
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}