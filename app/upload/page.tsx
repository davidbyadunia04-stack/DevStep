"use client"
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion' // Assure-toi d'avoir installé framer-motion

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isDeploying, setIsDeploying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Initialisation...")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Simulation de déploiement
  const startDeployment = () => {
    setIsDeploying(true)
    setProgress(0)
  }

  useEffect(() => {
    if (isDeploying && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => prev + 1)
        
        // Changement de message selon le %
        if (progress === 10) setStatus("Lecture des fichiers...")
        if (progress === 30) setStatus("Compression du bundle...")
        if (progress === 60) setStatus("Téléchargement vers le serveur...")
        if (progress === 90) setStatus("Finalisation du lien SSL...")
      }, 50) // Vitesse de la barre
      return () => clearTimeout(timer)
    } else if (progress === 100) {
      setStatus("DÉPLOYÉ AVEC SUCCÈS ! 🚀")
    }
  }, [isDeploying, progress])

  // Fonctions Drag & Drop (Gardées de l'étape précédente)
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    if (e.dataTransfer.files) setFiles(Array.from(e.dataTransfer.files))
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col items-center justify-center p-6 font-sans">
      
      {/* NAV (Comme avant) */}
      <nav className="fixed top-0 w-full p-6 border-b border-white/5 bg-[#0b0e14]/80 backdrop-blur-md flex justify-between items-center z-50">
        <Link href="/" className="font-black italic text-blue-600 uppercase tracking-tighter text-xl">DEVSTEP</Link>
        <Link href="/" className="text-[10px] font-black uppercase opacity-50 hover:opacity-100 tracking-[0.2em]">Annuler</Link>
      </nav>

      <main className="max-w-xl w-full text-center mt-20">
        <h1 className="text-5xl font-black italic mb-2 tracking-tighter uppercase italic">Deploy <span className="text-blue-600">Now.</span></h1>
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] mb-12">Hébergement ultra-rapide</p>

        {!isDeploying ? (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-20 border-2 border-dashed rounded-[40px] transition-all cursor-pointer bg-white/[0.01] ${isDragging ? 'border-blue-600 scale-95 bg-blue-600/5' : 'border-white/10 hover:border-white/20'}`}
          >
            <input type="file" multiple hidden ref={fileInputRef} onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))} />
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-4">📂</span>
              <p className="text-xs font-black uppercase tracking-widest">{files.length > 0 ? `${files.length} FICHIERS PRÊTS` : "DÉPOSE TON PROJET"}</p>
            </div>
          </div>
        ) : (
          <div className="p-12 border border-white/10 rounded-[40px] bg-white/[0.02] backdrop-blur-md">
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6">{status}</p>
            
            {/* LA BARRE DE PROGRESSION */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-8">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
              />
            </div>

            <div className="text-4xl font-black italic mb-2">{progress}%</div>
          </div>
        )}

        {files.length > 0 && !isDeploying && (
          <button 
            onClick={startDeployment}
            className="w-full mt-8 py-5 bg-blue-600 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-blue-600/20 hover:scale-105 transition-all"
          >
            Lancer le déploiement
          </button>
        )}

        {progress === 100 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <Link href="/" className="text-blue-500 font-black text-[10px] uppercase tracking-widest border-b border-blue-500/30 pb-1">
              Voir mon site en direct →
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  )
}