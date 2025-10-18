'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SetupAdminPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    full_name: 'Admin User',
    email: 'admin@porterclone.com',
    password: 'admin123',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/auth/register-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setError(data.error || 'Failed to create admin user')
      }
    } catch (err) {
      console.error('Registration error:', err)
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Setup Admin Account</h1>
          <p className="text-gray-600">Create your first admin user to get started</p>
        </div>

        <div className="card">
          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium mb-1">✓ Success!</p>
              <p className="text-sm">Admin user created successfully. Redirecting to login...</p>
            </div>
          ) : null}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium mb-1">Setup Failed</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                className="input"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Admin User"
                required
              />
            </div>

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className="input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@porterclone.com"
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
                placeholder="Enter admin password"
                required
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading || success}
            >
              {loading ? 'Creating Admin User...' : success ? 'Created! Redirecting...' : 'Create Admin User'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">ℹ️ First Time Setup</p>
            <p className="text-sm text-blue-700">
              This page helps you create your first admin user in Cosmic CMS. After creation, you can log in with these credentials at the login page.
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}