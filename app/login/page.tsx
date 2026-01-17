"use client"
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 1. ICI ON CRÉE LE BADGE (Le cookie de session)
    // On lui donne le nom 'session' que ton middleware recherche
    document.cookie = "session=active; path=/; max-age=86400" // expire après 24h

    // 2. ON REDIRIGE VERS LE DASHBOARD
    router.push('/dashboard')
    
    // On force un petit rafraîchissement pour que le middleware voie le cookie
    setTimeout(() => {
        window.location.reload()
    }, 100)
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center p-6">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-8 bg-[#161b26] rounded-[30px] border border-white/5 shadow-2xl">
        <h1 className="text-3xl font-black italic text-blue-600 mb-8 text-center">CONNEXION</h1>
        
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-4 bg-[#0b0e14] border border-white/10 rounded-xl mb-4 text-sm focus:border-blue-500 outline-none transition-all"
          required 
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          className="w-full p-4 bg-[#0b0e14] border border-white/10 rounded-xl mb-6 text-sm focus:border-blue-500 outline-none transition-all"
          required 
        />

        <button 
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-black uppercase text-xs tracking-widest transition-all"
        >
          Se Connecter
        </button>

        <p className="mt-6 text-center text-gray-500 text-[10px] uppercase font-bold tracking-widest">
          Pas de compte ? <span className="text-blue-500 cursor-pointer">S'inscrire</span>
        </p>
      </form>
    </div>
  )
}