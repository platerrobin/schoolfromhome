import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import Layout from '../../components/Layout'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string
  const resource = await prisma.resource.findUnique({ where: { id } })
  if (!resource) return { notFound: true }
  return { props: { resource } }
}

export default function ReaderPage({ resource }: any){
  const isExternal = resource.fileUrl && resource.fileUrl.startsWith('http')
  return (
    <Layout>
      <h2 className="text-2xl font-semibold">{resource.title}</h2>
      <div className="mt-4">
        {isExternal ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">This book links to an external public-domain source. Use the Source link to open or download the text/audio.</p>
            <a href={resource.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600">Open source</a>
          </div>
        ) : (
          // If we later host files under /books or /uploads this will render inline
          <div>
            {resource.type === 'book' && resource.fileUrl.endsWith('.pdf') && (
              <iframe src={resource.fileUrl} width="100%" height={600} />
            )}
            {resource.type === 'book' && resource.fileUrl.endsWith('.txt') && (
              <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">{resource.fileUrl}</pre>
            )}
            {resource.type === 'audio' && (
              <audio controls src={resource.fileUrl} className="w-full" />
            )}
          </div>
        )}

        <div className="mt-6">
          <a href={`/api/worksheets/generate?resourceId=${resource.id}`} className="inline-block bg-indigo-600 text-white px-4 py-2 rounded">Generate Worksheet (PDF)</a>
        </div>
      </div>
    </Layout>
  )
}
