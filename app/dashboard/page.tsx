import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const cookieStore = await cookies() // La correction est ici : le mot "await"

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // On ignore l'erreur si on ne peut pas écrire de cookies sur cette route
          }
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Si pas de session, on renvoie à l'accueil
  if (!session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-6">Mon Tableau de Bord</h1>
        
        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold">Heureux de vous revoir ! 👋</h2>
          <p className="opacity-90 mt-2">Vous êtes connecté avec : {session.user.email}</p>
        </div>

        <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-600">Ton site est maintenant sécurisé et ton logo est prêt !</p>
        </div>
      </div>
    </div>
  )
}