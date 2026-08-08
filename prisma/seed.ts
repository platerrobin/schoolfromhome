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
    { email: 'jayce.plater@example.test', name: 'Jayce Plater', gradeFrom: 0, gradeTo: 2 },
    { email: 'brayson.plater@example.test', name: 'Brayson Plater', gradeFrom: 2, gradeTo: 3 },
    { email: 'kaydon.plater@example.test', name: 'Kaydon Plater', gradeFrom: 5, gradeTo: 6 },
    { email: 'eliyah.plater@example.test', name: 'Eliyah', gradeFrom: 6, gradeTo: 7 },
    { email: 'javies.bell@example.test', name: 'Javies Bell', gradeFrom: 12, gradeTo: 12 },
    { email: 'angel.mccarthy@example.test', name: 'Angel McCarthy', gradeFrom: 12, gradeTo: 12 }
  ]

  for (const s of studentsData){
    await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: { email: s.email, name: s.name, role: 'STUDENT', gradeFrom: s.gradeFrom, gradeTo: s.gradeTo }
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

  // Seed reading resources (links to Project Gutenberg search pages so they can be opened/read)
  const books = [
    { title: "Aesop's Fables", query: 'Aesop+Fables' },
    { title: "Alice's Adventures in Wonderland", query: 'Alice+Adventures+in+Wonderland' },
    { title: 'The Secret Garden', query: 'The+Secret+Garden' },
    { title: 'The Wind in the Willows', query: 'The+Wind+in+the+Willows' },
    { title: 'Treasure Island', query: 'Treasure+Island' },
    { title: 'The Adventures of Tom Sawyer', query: 'The+Adventures+of+Tom+Sawyer' },
    { title: 'Peter Pan', query: 'Peter+Pan' },
    { title: 'Pride and Prejudice', query: 'Pride+and+Prejudice' },
    { title: 'Frankenstein', query: 'Frankenstein' },
    { title: 'The Call of the Wild', query: 'The+Call+of+the+Wild' },
    { title: 'Sherlock Holmes (selected stories)', query: 'Sherlock+Holmes' }
  ]

  for (const b of books){
    await prisma.resource.create({ data: { title: b.title, fileUrl: `https://www.gutenberg.org/ebooks/search/?query=${b.query}`, type: 'book' } })
  }

  console.log('Seeding finished')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
