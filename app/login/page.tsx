'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect based on user role
        if (data.user.role === 'Admin') {
          router.push('/admin')
        } else if (data.user.role === 'Driver') {
          router.push('/driver/dashboard')
        } else {
          router.push('/dashboard')
        }
      } else {
        // Show more helpful error messages
        if (data.code === 'USER_NOT_FOUND') {
          setError('No account found with this email. Have you added the demo admin user to Cosmic CMS?')
        } else if (data.code === 'NO_PASSWORD') {
          setError('Account setup incomplete. Please contact support.')
        } else {
          setError(data.error || 'Login failed. Please try again.')
        }
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-2xl">
              P
            </div>
            <span className="font-bold text-2xl text-gray-900">Porter Clone</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-medium mb-1">Login Failed</p>
                <p className="text-sm">{error}</p>
                {error.includes('demo admin user') && (
                  <p className="text-sm mt-2">
                    <strong>Note:</strong> Click the "Add Content" button in the repository update to create the demo admin user in Cosmic CMS.
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className="input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
            <p className="text-sm text-blue-700">
              <strong>Email:</strong> admin@porterclone.com<br />
              <strong>Password:</strong> admin123
            </p>
            <p className="text-xs text-blue-600 mt-2">
              Note: You need to add the demo admin user to your Cosmic CMS first using the "Add Content" button.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}