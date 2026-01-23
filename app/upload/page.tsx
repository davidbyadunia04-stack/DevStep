"use client"
import Link from 'next/link'

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col items-center justify-center p-6">
      <nav className="fixed top-0 w-full p-6 border-b border-white/5 bg-[#0b0e14]/80 backdrop-blur-md flex justify-between">
        <Link href="/" className="font-black italic text-blue-600">DEVSTEP</Link>
        <Link href="/" className="text-[10px] font-bold uppercase opacity-50">Retour</Link>
      </nav>

      <h1 className="text-4xl font-black italic mb-6 mt-20">
        HÉBERGE TON <span className="text-blue-600">PROJET</span>
      </h1>
      
      <div className="w-full max-w-xl p-12 border-2 border-dashed border-white/10 rounded-[40px] bg-white/[0.02] flex flex-col items-center">
        <p className="text-gray-400 text-sm mb-6 uppercase font-bold tracking-widest">Glisse ton dossier ici</p>
        <button className="bg-blue-600 px-8 py-4 rounded-2xl font-black uppercase text-xs transition-transform hover:scale-105">
          Sélectionner les fichiers
        </button>
      </div>
    </div>
  )
}