"use client"
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  
  // Fonction pour copier le numéro de don
  const copyNumber = () => {
    navigator.clipboard.writeText("+243995909060")
    alert("Numéro Airtel Money copié !")
  }

  return (
    <div className="min-h-screen w-full bg-[#0b0e14] text-white flex flex-col font-sans">
      
      {/* --- BARRE DE NAVIGATION (NAVBAR) --- */}
      <nav className="w-full py-5 px-10 flex justify-between items-center border-b border-white/5 bg-[#0b0e14]/80 backdrop-blur-md fixed top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/icon.png" alt="DevStep" width={35} height={35} className="rounded-full shadow-lg shadow-blue-500/20" />
          <span className="text-xl font-black italic text-blue-600 tracking-tighter uppercase">DEVSTEP</span>
        </Link>

        <div className="flex gap-8 items-center">
          <Link href="/" className="text-[10px] font-bold uppercase tracking-widest hover:text-blue-500 transition-all">
            Accueil
          </Link>
          
          {/* LE LIEN VERS LE RÉSEAU SOCIAL */}
          <Link href="/feed" className="text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-all italic underline decoration-blue-500/30 underline-offset-4">
            Communauté
          </Link>

          <a href="#donations" className="text-[10px] font-bold uppercase tracking-widest text-yellow-500 hover:text-yellow-400">
            Soutenir
          </a>
          
          <a href="https://discord.gg/MsZ455Yh" target="_blank" className="px-5 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
            Discord
          </a>
        </div>
      </nav>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 mt-32 text-center">
        
        {/* PLAYER VIDÉO PROMO */}
        <div className="mb-12 w-full max-w-2xl overflow-hidden rounded-[40px] border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] bg-black/20">
          <video 
            src="/promo.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-8">
          DEV<span className="text-blue-600">STEP.</span>
        </h1>

        <div className="max-w-2xl mb-16 px-10 py-12 border border-white/5 bg-white/[0.01] rounded-[50px] backdrop-blur-sm">
          <h2 className="text-xl md:text-2xl font-medium text-gray-300 italic leading-relaxed">
            "Hébergez vos projets, partagez votre code, et rejoignez le sanctuaire des développeurs."
          </h2>
        </div>

        {/* BOUTONS D'ACCÈS */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md pb-24">
          <Link href="/upload" className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-105">
            Héberger
          </Link>
          <Link href="/login" className="flex-1 py-5 bg-[#1a1f2b] border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#252c3d] transition-all hover:scale-105">
            Se Connecter
          </Link>
        </div>

        {/* SECTION DONS (RDC & INTERNATIONAL) */}
        <div id="donations" className="max-w-4xl w-full mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <div className="p-10 border border-red-500/20 bg-red-500/[0.02] rounded-[45px] flex flex-col items-center">
            <p className="text-red-500 font-black uppercase text-[10px] mb-4 tracking-widest">Airtel Money (RDC)</p>
            <p className="text-2xl font-mono font-black text-white mb-6">+243 995 909 060</p>
            <button onClick={copyNumber} className="w-full py-4 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
              Copier le numéro
            </button>
          </div>
          
          <div className="p-10 border border-blue-500/20 bg-blue-500/[0.02] rounded-[45px] flex flex-col items-center">
            <p className="text-blue-500 font-black uppercase text-[10px] mb-4 tracking-widest">International</p>
            <p className="text-gray-400 text-[11px] mb-6 italic">Via Taptap Send ou WorldRemit</p>
            <div className="w-full p-4 bg-white/[0.03] rounded-2xl border border-white/5 text-sm font-mono font-bold text-center">
              +243 995 909 060
            </div>
          </div>
        </div>
      </main>
      
      <footer className="p-12 text-center opacity-30 border-t border-white/5">
        <p className="text-[9px] font-bold uppercase tracking-[0.5em]">© DevStep — Lubumbashi — 2026</p>
      </footer>
    </div>
  )
}