import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import { getServerSession } from 'next-auth/next'
import prisma from '../../../lib/prisma'

export const authOptions = {
  providers: [
    // Credentials provider for quick testing (TEMP_LOGIN_PASSWORD in env)
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) return null
        const { email, password } = credentials
        const tempPassword = process.env.TEMP_LOGIN_PASSWORD || 'devpass'
        if (password !== tempPassword) return null
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return null
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      }
    }),

    // Email provider (requires SMTP_URL in env to work fully)
    EmailProvider({
      server: process.env.SMTP_URL || '',
      from: process.env.EMAIL_FROM || 'no-reply@schoolfromhome.test'
    }),

    // Google provider placeholder (set client id/secret in env to enable)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async jwt({ token, user }){
      if (user) token.id = (user as any).id ?? token.id
      return token
    },
    async session({ session, token }){
      if (token && session.user) {
        ;(session.user as any).id = token.id
      }
      return session
    }
  },
  events: {
    async signIn(message) {
      try {
        const email = message.user?.email
        if (!email) return
        const u = await prisma.user.findUnique({ where: { email } })
        if (u) {
          await prisma.user.update({ where: { id: u.id }, data: { lastLogin: new Date() } })
          // create attendance entry for auto-log sign-ins
          await prisma.attendance.create({ data: { studentId: u.id, status: 'PRESENT' } })
        }
      } catch (e) {
        console.error('signIn event error', e)
      }
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
}

export default NextAuth(authOptions)
