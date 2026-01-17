import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#11141d] border-r border-white/5 p-6 space-y-8">
        <div className="text-xl font-black text-blue-500 italic">DEVSTEP</div>
        <nav className="space-y-4 text-sm font-bold text-gray-500">
          <div className="text-white bg-blue-600/10 p-3 rounded-xl border border-blue-500/20">📊 Statistiques</div>
          <div className="p-3 hover:text-white cursor-pointer transition-all">💬 Communauté</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-black italic mb-10 tracking-widest text-blue-400">ANALYTICS</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-[#11141d] p-8 rounded-[40px] border border-white/5 shadow-2xl">
            <p className="text-gray-500 text-xs font-bold uppercase mb-2">Vues Totales</p>
            <div className="text-5xl font-black">1.482</div>
          </div>
          <div className="bg-[#11141d] p-8 rounded-[40px] border border-white/5 shadow-2xl">
            <p className="text-gray-500 text-xs font-bold uppercase mb-2">Commentaires</p>
            <div className="text-5xl font-black text-blue-500">24</div>
          </div>
        </div>

        {/* Espace Com */}
        <div className="bg-[#11141d] rounded-[40px] border border-white/5 p-8">
          <h2 className="text-lg font-bold mb-6 text-gray-300">Espace Com</h2>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 italic text-gray-400 text-sm">
            "Projet très propre, j'adore le style sombre !" — Anonyme_Dev
          </div>
          <input 
            type="text" 
            placeholder="Écris un message..." 
            className="w-full mt-6 bg-[#0b0e14] border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </main>
    </div>
  )
}