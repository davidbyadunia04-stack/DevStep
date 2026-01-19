"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // LA FONCTION QUI COMMANDE LE BOUTON
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault() // Empêche le rechargement de la page
    setLoading(true)
    
    // 1. ON CRÉE LE BADGE DE SESSION DIRECTEMENT
    document.cookie = "session=active; path=/; max-age=86400; SameSite=Lax"

    // 2. PETIT DÉLAI POUR LE STYLE ET REDIRECTION
    setTimeout(() => {
        window.location.href = "/dashboard" // Utiliser window.location force le rafraîchissement global
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm">
        
        {/* LOGO */}
        <div className="flex justify-center mb-8">
            <Image src="/icon.png" alt="Logo" width={60} height={60} className="rounded-full shadow-lg shadow-blue-600/20" />
        </div>

        <form onSubmit={handleRegister} className="p-8 bg-[#161b26] rounded-[30px] border border-white/5 shadow-2xl">
          <h1 className="text-2xl font-black italic text-blue-600 mb-2 text-center uppercase tracking-tighter">Inscription</h1>
          <p className="text-gray-500 text-[10px] text-center mb-8 font-bold uppercase tracking-widest">Rejoignez DevStep</p>
          
          <input 
            type="text" 
            placeholder="Nom complet" 
            className="w-full p-4 bg-[#0b0e14] border border-white/10 rounded-xl mb-4 text-sm focus:border-blue-500 outline-none transition-all text-white"
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-4 bg-[#0b0e14] border border-white/10 rounded-xl mb-4 text-sm focus:border-blue-500 outline-none transition-all text-white"
            required 
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            className="w-full p-4 bg-[#0b0e14] border border-white/10 rounded-xl mb-6 text-sm focus:border-blue-500 outline-none transition-all text-white"
            required 
          />

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-blue-600/20"
          >
            {loading ? "Création du compte..." : "S'inscrire"}
          </button>
        </form>
        
        <p className="mt-8 text-center text-gray-500 text-[10px] uppercase font-bold tracking-widest">
          Déjà un membre ? <Link href="/login" className="text-blue-500 hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}