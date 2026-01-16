import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/')

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="font-black text-xl text-blue-500">DEVSTEP</span>
          <div className="flex space-x-8">
            <button className="text-sm font-medium border-b-2 border-blue-500 pb-5 pt-5 text-white">Aperçu</button>
            <button className="text-sm font-medium text-gray-400 hover:text-white pb-5 pt-5">Projets</button>
            <button className="text-sm font-medium text-gray-400 hover:text-white pb-5 pt-5">Paramètres</button>
          </div>
          <div className="text-xs text-gray-500">{session.user.email}</div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-6 mt-8">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold">Bienvenue sur ton espace 🚀</h2>
          <p className="mt-2 text-blue-100">L'interface à onglets est maintenant active.</p>
        </div>
      </main>
    </div>
  )
}