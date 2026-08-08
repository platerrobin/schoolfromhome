import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import JsPDF from 'jspdf'

// Simple worksheet generator endpoint (generates a basic PDF with prompts). For production
// you might want to implement templates per book/grade and more sophisticated layout.
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { resourceId } = req.query
  if (!resourceId || typeof resourceId !== 'string') return res.status(400).json({ error: 'resourceId required' })
  const resource = await prisma.resource.findUnique({ where: { id: resourceId } })
  if (!resource) return res.status(404).json({ error: 'resource not found' })

  // basic PDF
  const doc = new JsPDF()
  doc.setFontSize(16)
  doc.text(resource.title, 14, 20)
  doc.setFontSize(12)
  doc.text('Reading comprehension questions:', 14, 36)
  doc.text('1) What is the main idea of the chapter you read?', 14, 48)
  doc.text('2) List three new words you learned and define them.', 14, 60)
  doc.text('3) Write a short summary (3-5 sentences):', 14, 84)

  const pdf = doc.output('arraybuffer')
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="${resource.title}-worksheet.pdf"`)
  res.send(Buffer.from(pdf))
}
