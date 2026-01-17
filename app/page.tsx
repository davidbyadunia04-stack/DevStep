"use client"
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[#0b0e14] text-white flex flex-col font-sans">
      
      {/* --- MENU NAVBAR --- */}
      <nav className="w-full py-5 px-10 flex justify-between items-center border-b border-white/5 bg-[#0b0e14]/80 backdrop-blur-md fixed top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/icon.png" 
            alt="DevStep" 
            width={35} 
            height={35} 
            className="rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]"
          />
          <span className="text-xl font-black italic text-blue-600 tracking-tighter">DEVSTEP</span>
        </Link>
        
        <div className="flex gap-10 items-center">
          <Link href="/" className="text-[11px] font-bold uppercase tracking-widest hover:text-blue-500 transition-all">
            Accueil
          </Link>
          <a 
            href="https://discord.gg/MsZ455Yh" 
            target="_blank" 
            className="px-5 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg"
          >
            Discord
          </a>
        </div>
      </nav>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 mt-32 text-center">
        
        {/* LE LOGO CENTRAL */}
        <div className="mb-6 animate-bounce-slow">
          <Image 
            src="/icon.png" 
            alt="DevStep Logo Large" 
            width={120} 
            height={120} 
            className="rounded-full shadow-[0_0_40px_rgba(59,130,246,0.4)] border-4 border-blue-600/20"
          />
        </div>

        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white mb-6">
          DEV<span className="text-blue-600 text-shadow-glow">STEP.</span>
        </h1>

        {/* SECTION COMMUNAUTÉ */}
        <div className="max-w-2xl mb-12 px-8 py-10 border border-white/5 bg-white/[0.02] rounded-[40px] backdrop-blur-sm shadow-2xl">
          <h2 className="text-xl md:text-2xl font-medium text-gray-200 italic leading-relaxed">
            "Rejoignez une communauté qui sera toujours à l'écoute de vos demandes ; sainte et respectueuse."
          </h2>
        </div>

        {/* BOUTONS D'ACTION */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <Link href="/upload" className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-[0_10px_30px_rgba(37,99,235,0.2)] transition-all hover:scale-105">
            Démarrer un dépôt
          </Link>
          <Link href="/login" className="flex-1 py-5 bg-[#1a1f2b] border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all hover:scale-105">
            Mon Espace
          </Link>
        </div>
      </main>

      <footer className="p-10 text-center opacity-20">
        <p className="text-[9px] font-bold uppercase tracking-[0.4em]">© DevStep Cloud Storage — Lubumbashi</p>
      </footer>

    </div>
  )
}