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
      {/* BARRE DE NAVIGATION (ONGLETS) */}
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <span className="font-black text-xl tracking-tighter text-blue-500">DEVSTEP</span>
            
            <div className="flex space-x-8">
              <button className="text-sm font-medium border-b-2 border-blue-500 pb-5 pt-5">Aperçu</button>
              <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors pb-5 pt-5">Projets</button>
              <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors pb-5 pt-5">Paramètres</button>
            </div>

            <div className="text-xs text-gray-500">{session.user.email}</div>
          </div>
        </div>
      </nav>

      {/* CONTENU DE LA PAGE */}
      <main className="max-w-5xl mx-auto p-6 mt-8">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-2xl mb-8">
          <h2 className="text-3xl font-bold">Bienvenue sur ton espace 🚀</h2>
          <p className="mt-2 text-blue-100">Sélectionne un onglet pour commencer à travailler.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
            <div className="text-blue-400 text-2xl mb-2">📁</div>
            <h3 className="font-bold">Mes Projets</h3>
            <p className="text-sm text-gray-400 mt-1">0 projets créés</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
            <div className="text-emerald-400 text-2xl mb-2">⚡</div>
            <h3 className="font-bold">Activités</h3>
            <p className="text-sm text-gray-400 mt-1">Aucune activité récente</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
            <div className="text-purple-400 text-2xl mb-2">⚙️</div>
            <h3 className="font-bold">Configuration</h3>
            <p className="text-sm text-gray-400 mt-1">Profil complété à 80%</p>
          </div>
        </div>
      </main>
    </div>
  )
}