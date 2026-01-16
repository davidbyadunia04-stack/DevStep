import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  
  // On crée le client avec une protection pour éviter les erreurs de build
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <nav className="flex justify-between items-center mb-10 border-b border-white/10 pb-5">
        <h1 className="text-xl font-bold text-blue-500">DEVSTEP</h1>
        <div className="flex gap-6 text-sm text-gray-400">
          <span className="text-white border-b-2 border-blue-500">Aperçu</span>
          <span>Projets</span>
          <span>Paramètres</span>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-10 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold">Le build est réparé ! 🚀</h2>
        <p className="mt-2 opacity-90">Ton site est maintenant prêt pour la production.</p>
      </div>
    </div>
  )
}