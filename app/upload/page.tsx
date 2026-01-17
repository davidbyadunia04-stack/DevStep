"use client"
import Link from 'next/link'

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-black italic text-blue-600 mb-10">UPLOAD</h1>
      
      <div className="p-12 border-2 border-dashed border-blue-500/20 bg-[#161b26] rounded-[40px] text-center">
        <p className="mb-6 font-bold text-gray-400">GLISSEZ VOS FICHIERS ICI</p>
        <button className="px-10 py-4 bg-blue-600 rounded-2xl font-black uppercase text-xs">
          Parcourir
        </button>
        <Link href="/" className="block mt-8 text-gray-600 underline text-[10px]">
          Retour à l'accueil 
        </Link>
      </div>
    </div>
  )
}