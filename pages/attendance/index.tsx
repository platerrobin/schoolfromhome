import useSWR from 'swr'
import Layout from '../../components/Layout'
import { useState } from 'react'

const fetcher = (url:string) => fetch(url).then(r=>r.json())

export default function AttendancePage(){
  const { data, error, mutate } = useSWR('/api/attendance', fetcher)
  const [loading, setLoading] = useState(false)

  async function markPresent(studentId:string){
    setLoading(true)
    await fetch('/api/attendance', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ studentId, status: 'PRESENT' }) })
    setLoading(false)
    mutate()
  }

  function exportCSV(){
    if (!data) return
    const rows = data.map((r:any) => ({ name: r.student.name, email: r.student.email, timestamp: r.timestamp, status: r.status }))
    const csv = [Object.keys(rows[0]).join(','), ...rows.map(Object.values).map(r=>r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'attendance.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Layout>
      <h2 className="text-2xl font-semibold">Attendance</h2>
      <div className="mt-4">
        <button onClick={exportCSV} className="bg-indigo-600 text-white px-4 py-2 rounded">Export CSV</button>
      </div>

      <div className="mt-6">
        {error && <div className="text-red-600">Failed to load</div>}
        {!data && <div>Loading…</div>}
        {data && (
          <table className="w-full text-left border-collapse mt-4">
            <thead>
              <tr><th className="p-2">Student</th><th className="p-2">Email</th><th className="p-2">Time</th><th className="p-2">Status</th><th className="p-2">Actions</th></tr>
            </thead>
            <tbody>
              {data.map((row:any) => (
                <tr key={row.id} className="border-t"><td className="p-2">{row.student?.name}</td><td className="p-2">{row.student?.email}</td><td className="p-2">{new Date(row.timestamp).toLocaleString()}</td><td className="p-2">{row.status}</td><td className="p-2"><button onClick={()=>markPresent(row.studentId)} disabled={loading} className="text-blue-600">Mark Present</button></td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}
