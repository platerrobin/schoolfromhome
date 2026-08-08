import Layout from '../../components/Layout'

export default function TeacherDashboard(){
  return (
    <Layout>
      <h2 className="text-2xl font-semibold">Teacher Dashboard</h2>
      <p className="mt-4">Create courses, lessons, worksheets, games, and grade submissions here.</p>

      <div className="mt-6 space-y-4">
        <a className="block p-4 bg-white rounded shadow" href="#">Create Course</a>
        <a className="block p-4 bg-white rounded shadow" href="#">Manage Worksheets</a>
        <a className="block p-4 bg-white rounded shadow" href="#">Games Library</a>
        <a className="block p-4 bg-white rounded shadow" href="#">Gradebook</a>
      </div>
    </Layout>
  )
}
