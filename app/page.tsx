import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[#0b0e14] text-white flex flex-col font-sans">
      
      {/* --- MENU NAVBAR --- */}
      <nav className="w-full py-5 px-10 flex justify-between items-center border-b border-white/5 bg-[#0b0e14]/80 backdrop-blur-md fixed top-0 z-50">
        <div className="text-xl font-black italic text-blue-600 tracking-tighter">DEVSTEP</div>
        
        <div className="flex gap-10 items-center">
          <Link href="/" className="text-[11px] font-bold uppercase tracking-widest hover:text-blue-500 transition-all">
            Accueil
          </Link>

          <Link href="mailto:TON_EMAIL@GMAIL.COM" className="text-[11px] font-bold uppercase tracking-widest hover:text-blue-500 transition-all">
            Support
          </Link>

          <a 
            href="https://discord.gg/MsZ455Yh" 
            target="_blank" 
            className="px-5 py-2 bg-[#5865F2] hover:bg-[#4752C4] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(88,101,242,0.3)]"
          >
            Rejoindre Discord
          </a>
        </div>
      </nav>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 mt-20 text-center">
        
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white mb-6">
          DEV<span className="text-blue-600">STEP.</span>
        </h1>

        {/* SECTION COMMUNAUTÉ */}
        <div className="max-w-2xl mb-12 px-6 py-8 border border-white/5 bg-white/[0.02] rounded-[40px] backdrop-blur-sm">
          <p className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4">La Communauté</p>
          <h2 className="text-lg md:text-xl font-medium text-gray-300 italic leading-relaxed">
            "Rejoignez une communauté qui sera toujours à l'écoute de vos demandes ; sainte et respectueuse."
          </h2>
        </div>

        {/* BOUTONS D'ACTION */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <Link href="/upload" className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-[0_10px_30px_rgba(37,99,235,0.2)] transition-all">
            Héberger un fichier
          </Link>
          <Link href="/login" className="flex-1 py-5 bg-[#1a1f2b] border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all">
            Mon Espace
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="p-8 text-center opacity-30">
        <p className="text-[9px] font-bold uppercase tracking-[0.5em]">© DevStep Cloud Storage</p>
      </footer>

    </div>
  )
}