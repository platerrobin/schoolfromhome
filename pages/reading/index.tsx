import useSWR from 'swr'
import Link from 'next/link'
import Layout from '../../components/Layout'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function ReadingLibrary(){
  const { data, error } = useSWR('/api/resources', fetcher)
  if (error) return <Layout><p className="p-4">Failed to load library.</p></Layout>
  if (!data) return <Layout><p className="p-4">Loading...</p></Layout>

  return (
    <Layout>
      <h2 className="text-2xl font-semibold">Reading Library</h2>
      <p className="mt-2">Public-domain books and uploaded resources. Click a title to open the reader or download.</p>
      <ul className="mt-4 space-y-3">
        {data.map((r:any) => (
          <li key={r.id} className="p-3 bg-white rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{r.title}</h3>
                <div className="text-sm text-gray-600">Type: {r.type}</div>
              </div>
              <div className="space-x-2">
                <Link href={`/reading/${r.id}`}><a className="text-blue-600">Open</a></Link>
                {r.fileUrl && r.fileUrl.startsWith('http') && (
                  <a href={r.fileUrl} target="_blank" rel="noreferrer" className="ml-4 text-blue-600">Source</a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
