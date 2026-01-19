"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // --- LOGIQUE DE CONNEXION AUTOMATIQUE ---
  // Si l'utilisateur a déjà le badge, on l'envoie direct au dashboard
  useEffect(() => {
    if (document.cookie.includes("session=active")) {
      router.push('/dashboard')
    }
  }, [router])

  // --- FONCTION DE CONNEXION ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // 1. On crée le badge de session (valable 24h)
    document.cookie = "session=active; path=/; max-age=86400; SameSite=Lax"

    // 2. Redirection forcée
    setTimeout(() => {
        window.location.href = "/dashboard"
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm">
        
        {/* LOGO DEVSTEP */}
        <div className="flex justify-center mb-8">
            <Link href="/">
              <Image 
                src="/icon.png" 
                alt="Logo" 
                width={60} 
                height={60} 
                className="rounded-full shadow-lg shadow-blue-600/20 hover:scale-110 transition-all" 
              />
            </Link>
        </div>

        <form onSubmit={handleLogin} className="p-8 bg-[#161b26] rounded-[30px] border border-white/5 shadow-2xl">
          <h1 className="text-2xl font-black italic text-blue-600 mb-2 text-center uppercase tracking-tighter">Connexion</h1>
          <p className="text-gray-500 text-[10px] text-center mb-8 font-bold uppercase tracking-widest">Bon retour sur DevStep</p>
          
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-4 bg-[#0b0e14] border border-white/10 rounded-xl text-sm focus:border-blue-500 outline-none transition-all text-white"
              required 
            />
            <input 
              type="password" 
              placeholder="Mot de passe" 
              className="w-full p-4 bg-[#0b0e14] border border-white/10 rounded-xl text-sm focus:border-blue-500 outline-none transition-all text-white"
              required 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-blue-600/20"
          >
            {loading ? "Vérification..." : "Se connecter"}
          </button>
        </form>
        
        <p className="mt-8 text-center text-gray-500 text-[10px] uppercase font-bold tracking-widest">
          Nouveau ici ? <Link href="/register" className="text-blue-500 hover:underline">Créer un compte</Link>
        </p>
      </div>
    </div>
  )
}