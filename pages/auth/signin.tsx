import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Layout from '../../components/Layout'

export default function SignInPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCredentials(e:any){
    e.preventDefault(); setLoading(true); setError('')
    const res = await signIn('credentials', { redirect: false, email, password })
    setLoading(false)
    if (res?.error) setError('Invalid credentials')
    else window.location.href = '/dashboard/student'
  }

  return (
    <Layout>
      <h2 className="text-2xl font-semibold">Sign in</h2>
      <p className="mt-2">Use the temporary credentials provider (email + temp password) or request an email magic link if SMTP is configured.</p>
      <form onSubmit={handleCredentials} className="mt-4 space-y-3">
        <div>
          <label className="block text-sm">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 w-full" />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded" disabled={loading}>Sign in</button>
        </div>
      </form>
      <div className="mt-4 text-sm text-gray-600">Temp password is set in env as TEMP_LOGIN_PASSWORD (default: devpass). Use seeded student emails.</div>
    </Layout>
  )
}
