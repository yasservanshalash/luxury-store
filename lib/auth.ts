import { NextRequest } from 'next/server'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@linebygizia.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password'

export interface AdminUser {
  id: string
  email: string
  role: 'ADMIN'
  name: string
}

export async function validateAdminCredentials(email: string, password: string): Promise<AdminUser | null> {
  // Simple authentication for development
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return {
      id: 'admin-1',
      email: ADMIN_EMAIL,
      role: 'ADMIN',
      name: 'Line by Gizia Admin'
    }
  }
  return null
}

export function generateAdminToken(admin: AdminUser): string {
  // Simple token for development - in production, use proper JWT
  return Buffer.from(JSON.stringify({
    id: admin.id,
    email: admin.email,
    role: admin.role,
    name: admin.name,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  })).toString('base64')
}

export function verifyAdminToken(token: string): AdminUser | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
    
    // Check if token is expired
    if (decoded.exp < Date.now()) {
      return null
    }
    
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name
    }
  } catch (error) {
    return null
  }
}

export function getAdminFromRequest(request: NextRequest): AdminUser | null {
  const token = request.cookies.get('admin-token')?.value
  if (!token) {
    return null
  }
  return verifyAdminToken(token)
} 