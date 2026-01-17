import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#11141d] text-white flex">
      {/* 1. Barre latérale */}
      <aside className="w-64 bg-[#1a1f2b] p-8 border-r border-white/5 flex flex-col">
        <div className="text-blue-500 font-black text-2xl mb-12 italic uppercase">DEVSTEP</div>
        <nav className="flex-1 space-y-6">
          <div className="text-white bg-blue-600/20 p-4 rounded-2xl border border-blue-500/30 font-bold text-sm">📊 Stats</div>
          <Link href="/upload" className="block p-4 text-gray-400 hover:text-white font-bold text-sm">☁️ Mes Fichiers</Link>
        </nav>
        {/* Support en bas de la barre */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <a href="mailto:TON_EMAIL@GMAIL.COM" className="text-[10px] text-red-500 font-black uppercase hover:underline text-center block">
            ⚠️ Signaler un Bug
          </a>
        </div>
      </aside>

      {/* 2. Contenu principal */}
      <main className="flex-1 p-12">
        <div className="flex justify-between items-center mb-12">
           <h1 className="text-4xl font-black italic uppercase tracking-tighter">Tableau de bord</h1>
           <Link href="/" className="text-[10px] font-bold text-gray-500 border border-white/10 px-4 py-2 rounded-full hover:bg-white/5 uppercase">Quitter</Link>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-[#1a1f2b] p-10 rounded-[40px] border border-white/5 shadow-2xl">
            <p className="text-gray-500 text-[10px] font-black uppercase mb-4 tracking-widest">Espace utilisé</p>
            <div className="text-5xl font-black">1.2 <span className="text-blue-500">GB</span></div>
          </div>
          <div className="bg-[#1a1f2b] p-10 rounded-[40px] border border-white/5 shadow-2xl">
            <p className="text-gray-500 text-[10px] font-black uppercase mb-4 tracking-widest">Fichiers totaux</p>
            <div className="text-5xl font-black">24</div>
          </div>
        </div>
      </main> 
      {/* Fin du Main */}
    </div> 
    // Fin du Div principal
  )
}