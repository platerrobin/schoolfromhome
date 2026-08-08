import Link from 'next/link'
export default function Layout({ children }: { children: React.ReactNode }){
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-indigo-600 text-white p-4">
        <div className="max-w-4xl mx-auto">SchoolFromHome</div>
      </header>
      <main className="max-w-4xl mx-auto p-6">{children}</main>
      <footer className="text-center p-4 text-sm text-gray-500">© SchoolFromHome</footer>
    </div>
  )
}
