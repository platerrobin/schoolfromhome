import Head from 'next/head'
import Link from 'next/link'

export default function Home(){
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Head><title>schoolfromhome</title></Head>
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold">SchoolFromHome</h1>
        <p className="mt-4">Welcome — your starter scaffold is on the homeschool-starter branch.</p>
        <div className="mt-6 space-x-4">
          <Link href="/dashboard/teacher"><a className="text-blue-600">Teacher Dashboard</a></Link>
          <Link href="/dashboard/student"><a className="text-blue-600">Student Dashboard</a></Link>
        </div>
      </main>
    </div>
  )
}
