"use client"
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  // Fonction pour copier le numéro Airtel
  const copyNumber = () => {
    navigator.clipboard.writeText("+243995909060")
    alert("Numéro Airtel Money copié !")
  }

  return (
    <div className="min-h-screen w-full bg-[#0b0e14] text-white flex flex-col font-sans">
      
      {/* --- BARRE DE NAVIGATION --- */}
      <nav className="w-full py-5 px-10 flex justify-between items-center border-b border-white/5 bg-[#0b0e14]/80 backdrop-blur-md fixed top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          {/* Ton logo DS */}
          <Image 
            src="/icon.png" 
            alt="DevStep" 
            width={35} 
            height={35} 
            className="rounded-full"
          />
          <span className="text-xl font-black italic text-blue-600 tracking-tighter uppercase">DEVSTEP</span>
        </Link>
        
        <div className="flex gap-8 items-center">
          <Link href="/" className="text-[10px] font-bold uppercase tracking-widest hover:text-blue-500 transition-all">Accueil</Link>
          <a href="#donations" className="text-[10px] font-bold uppercase tracking-widest text-yellow-500 hover:text-yellow-400 transition-all">Soutenir</a>
          <a href="https://discord.gg/MsZ455Yh" target="_blank" className="px-5 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Discord</a>
        </div>
      </nav>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 mt-32 text-center">
        
        {/* LOGO CENTRAL (Celui qu'on voit sur ta capture) */}
        <div className="mb-8">
          <Image 
            src="/icon.png" 
            alt="DevStep Logo Large" 
            width={120} 
            height={120} 
            className="rounded-full shadow-[0_0_50px_rgba(59,130,246,0.3)] border-2 border-white/5"
          />
        </div>

        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white mb-8">
          DEV<span className="text-blue-600">STEP.</span>
        </h1>

        {/* SECTION PHILOSOPHIE */}
        <div className="max-w-2xl mb-16 px-10 py-12 border border-white/5 bg-white/[0.01] rounded-[50px] backdrop-blur-sm">
          <h2 className="text-xl md:text-2xl font-medium text-gray-300 italic leading-relaxed">
            "Rejoignez une communauté qui sera toujours à l'écoute de vos demandes ; sainte et respectueuse."
          </h2>
        </div>

        {/* --- SECTION DONS (RDC & INTERNATIONAL) --- */}
        <div id="donations" className="max-w-4xl w-full mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          
          {/* CARTE RDC */}
          <div className="p-10 border border-red-500/20 bg-red-500/[0.02] rounded-[45px] flex flex-col items-center">
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-600/20">
              <span className="text-white font-black italic text-[10px]">airtel</span>
            </div>
            <p className="text-red-500 font-black uppercase tracking-widest text-[10px] mb-4">Soutien Local (RDC)</p>
            <p className="text-2xl font-mono font-black text-white mb-6">+243 995 909 060</p>
            <button 
              onClick={copyNumber} 
              className="w-full py-4 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95"
            >
              Copier le numéro
            </button>
          </div>

          {/* CARTE INTERNATIONAL */}
          <div className="p-10 border border-blue-500/20 bg-blue-500/[0.02] rounded-[45px] flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 text-xl shadow-lg shadow-blue-600/20">
              🌍
            </div>
            <p className="text-blue-500 font-black uppercase tracking-widest text-[10px] mb-4">International (Europe)</p>
            <p className="text-gray-400 text-[11px] mb-6 leading-relaxed italic px-4">
              Envoyez via <span className="text-white font-bold">Taptap Send</span> ou <span className="text-white font-bold">WorldRemit</span> vers notre numéro Airtel.
            </p>
            <div className="w-full p-4 bg-white/[0.03] rounded-2xl border border-white/5">
              <p className="text-sm font-mono font-bold text-white tracking-widest">+243 995 909 060</p>
            </div>
          </div>

        </div>

        {/* BOUTONS D'ACCÈS RAPIDE */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md pb-20">
          <Link href="/upload" className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:translate-y-[-2px] shadow-xl shadow-blue-600/20">
            Héberger
          </Link>
          <Link href="/login" className="flex-1 py-5 bg-[#1a1f2b] border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#252c3d] transition-all">
            Mon Espace
          </Link>
        </div>
      </main>

      <footer className="p-12 text-center opacity-30 border-t border-white/5">
        <p className="text-[9px] font-bold uppercase tracking-[0.5em]">© DevStep Cloud — Lubumbashi</p>
      </footer>

    </div>
  )
}