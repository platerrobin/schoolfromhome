import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(resources)
}
