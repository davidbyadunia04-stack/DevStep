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
      <aside className="w-64 bg-[#11141d] border-r border-white/5 p-6 space-y-8">
        <div className="text-xl font-black text-blue-500 tracking-tighter">DEVSTEP</div>
        <nav className="space-y-4 text-sm font-bold text-gray-400">
          <div className="text-white bg-blue-600/20 p-3 rounded-xl">📊 Analytics</div>
          <div className="p-3 hover:text-white cursor-pointer transition-colors">💬 Espace Com</div>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-black italic mb-10">TABLEAU DE BORD</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#11141d] p-8 rounded-[40px] border border-white/5 shadow-2xl">
            <p className="text-gray-500 text-xs font-bold uppercase mb-2">Vues Profil</p>
            <div className="text-5xl font-black">1.482</div>
          </div>
          <div className="bg-[#11141d] p-8 rounded-[40px] border border-white/5 shadow-2xl">
            <p className="text-gray-500 text-xs font-bold uppercase mb-2">Commentaires</p>
            <div className="text-5xl font-black text-blue-500">24</div>
          </div>
        </div>
      </main>
    </div>
  )
}