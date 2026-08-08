import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
  console.log('Seeding...')
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@schoolfromhome.test' },
    update: {},
    create: { email: 'teacher@schoolfromhome.test', name: 'Demo Teacher', role: 'TEACHER' }
  })

  const studentsData = [
    { email: 'jayce.plater@example.test', name: 'Jayce Plater' },
    { email: 'brayson.plater@example.test', name: 'Brayson Plater' },
    { email: 'kaydon.plater@example.test', name: 'Kaydon Plater' },
    { email: 'eliyah.plater@example.test', name: 'Eliyah Plater' },
  ]

  for (const s of studentsData){
    await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: { email: s.email, name: s.name, role: 'STUDENT' }
    })
  }

  const course = await prisma.course.create({
    data: {
      title: 'Intro to Math',
      description: 'Sample course',
      teacherId: teacher.id,
      lessons: { create: [
        { title: 'Lesson 1', content: 'Welcome to Lesson 1' },
        { title: 'Lesson 2', content: 'Welcome to Lesson 2' }
      ] }
    }
  })

  console.log('Seeding finished')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
