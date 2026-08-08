import Layout from '../../components/Layout'

export default function StudentDashboard(){
  return (
    <Layout>
      <h2 className="text-2xl font-semibold">Student Dashboard</h2>
      <p className="mt-4">Your enrolled courses, upcoming assignments, and games.</p>
      <div className="mt-6 space-y-4">
        <a className="block p-4 bg-white rounded shadow" href="#">My Courses</a>
        <a className="block p-4 bg-white rounded shadow" href="#">Assignments</a>
        <a className="block p-4 bg-white rounded shadow" href="#">Games</a>
        <a className="block p-4 bg-white rounded shadow" href="#">Reading Library</a>
      </div>
    </Layout>
  )
}
