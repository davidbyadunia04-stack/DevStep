"use client"
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isDeploying, setIsDeploying] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Simulation du chargement
  useEffect(() => {
    if (isDeploying && progress < 100) {
      const timer = setTimeout(() => setProgress(prev => prev + 1), 40)
      return () => clearTimeout(timer)
    }
  }, [isDeploying, progress])

  const handleFile = (e: any) => {
    const selected = e.target.files || e.dataTransfer.files
    if (selected) setFiles(Array.from(selected))
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col items-center justify-center p-6 font-sans">
      <nav className="fixed top-0 w-full p-6 border-b border-white/5 bg-[#0b0e14]/80 backdrop-blur-md flex justify-between items-center z-50">
        <Link href="/" className="font-black italic text-blue-600 uppercase text-xl">DEVSTEP</Link>
        <Link href="/" className="text-[10px] font-black uppercase opacity-50 hover:opacity-100 tracking-widest">Annuler</Link>
      </nav>

      <main className="max-w-xl w-full text-center mt-20">
        <h1 className="text-5xl font-black italic mb-2 tracking-tighter uppercase">Deploy <span className="text-blue-600">Now.</span></h1>
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] mb-12 italic">Hébergement sécurisé par bot</p>

        {!isDeploying ? (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e) }}
            onClick={() => fileInputRef.current?.click()}
            className={`p-20 border-2 border-dashed rounded-[40px] transition-all cursor-pointer bg-white/[0.01] ${isDragging ? 'border-blue-600 scale-95 bg-blue-600/5' : 'border-white/10 hover:border-white/20'}`}
          >
            <input type="file" multiple hidden ref={fileInputRef} onChange={handleFile} />
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-4">📂</span>
              <p className="text-[10px] font-black uppercase tracking-widest">
                {files.length > 0 ? `${files.length} fichiers sélectionnés` : "Glisse ton dossier ici"}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-12 border border-white/10 rounded-[40px] bg-white/[0.02] backdrop-blur-md">
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-8">
              <div style={{ width: `${progress}%` }} className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all duration-300" />
            </div>
            <div className="text-4xl font-black italic mb-2">{progress}%</div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Scan du bot en cours...</p>
          </div>
        )}

        {files.length > 0 && !isDeploying && (
          <button 
            onClick={() => setIsDeploying(true)}
            className="w-full mt-8 py-5 bg-blue-600 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-blue-600/20 hover:scale-105 transition-all"
          >
            Lancer le déploiement
          </button>
        )}

        {progress === 100 && (
          <div className="mt-8">
            <p className="text-green-500 font-black text-[10px] uppercase mb-4">Projet en ligne ! 🚀</p>
            <Link href="/" className="text-white/50 hover:text-white font-black text-[10px] uppercase tracking-widest border-b border-white/20 pb-1">Retour au Feed</Link>
          </div>
        )}
      </main>
    </div>
  )
}