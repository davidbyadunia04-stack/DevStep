"use client"
import Link from 'next/link' // <-- C'EST CETTE LIGNE QUI MANQUE !
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[#0b0e14] text-white flex flex-col font-sans">
      
      {/* ... le reste de ton code (Nav, Vidéo, Devise) ... */}

      {/* SECTION BOUTONS (Retapée pour être sûr) */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md pb-24 z-20 relative">
        <Link 
          href="/upload" 
          className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center shadow-lg shadow-blue-500/20"
        >
          Héberger
        </Link>

        <Link 
          href="/login" 
          className="flex-1 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center hover:bg-white/10"
        >
          Se Connecter
        </Link>
      </div>

    </div>
  )
}