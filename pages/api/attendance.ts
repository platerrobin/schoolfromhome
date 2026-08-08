import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const session = await getServerSession(req, res, authOptions)
  if (!session) return res.status(401).json({ error: 'Not authenticated' })

  const user = session.user as any
  try {
    if (req.method === 'GET'){
      // teachers get all, students get their own
      if (user.role === 'TEACHER' || user.role === 'ADMIN'){
        const list = await prisma.attendance.findMany({ include: { student: true }, orderBy: { timestamp: 'desc' } })
        return res.json(list)
      } else {
        const list = await prisma.attendance.findMany({ where: { studentId: user.id }, orderBy: { timestamp: 'desc' } })
        return res.json(list)
      }
    }

    if (req.method === 'POST'){
      const body = req.body
      // teacher may mark any student; student may auto-log their own
      if (user.role === 'TEACHER' || user.role === 'ADMIN'){
        const { studentId, status = 'PRESENT', note } = body
        if (!studentId) return res.status(400).json({ error: 'studentId required' })
        const a = await prisma.attendance.create({ data: { studentId, status, note } })
        return res.json(a)
      } else {
        // student logging themselves
        const a = await prisma.attendance.create({ data: { studentId: user.id, status: body.status || 'PRESENT', note: body.note } })
        return res.json(a)
      }
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (e:any){
    console.error(e)
    return res.status(500).json({ error: e.message || 'Server error' })
  }
}
