"use client"
import { useState, useRef } from 'react'
import Link from 'next/link'

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Gestion du Drag & Drop
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = () => setIsDragging(false)

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col items-center justify-center p-6 font-sans">
      
      {/* HEADER NAVIGATION */}
      <nav className="fixed top-0 w-full p-6 border-b border-white/5 bg-[#0b0e14]/80 backdrop-blur-md flex justify-between items-center z-50">
        <Link href="/" className="font-black italic text-blue-600 uppercase tracking-tighter">DEVSTEP</Link>
        <Link href="/" className="text-[10px] font-bold uppercase opacity-50 hover:opacity-100 transition-all tracking-widest">Annuler</Link>
      </nav>

      <div className="max-w-2xl w-full text-center mt-20">
        <h1 className="text-4xl md:text-5xl font-black italic mb-4 tracking-tighter">
          DÉPLOIE TON <span className="text-blue-600">CODE</span>
        </h1>
        <p className="text-gray-500 text-sm mb-12 font-medium uppercase tracking-widest">
          Propulse tes fichiers sur le web en quelques secondes.
        </p>

        {/* ZONE DE DRAG & DROP */}
        <div 
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative w-full p-16 border-2 border-dashed rounded-[40px] transition-all cursor-pointer
            ${isDragging 
              ? 'border-blue-500 bg-blue-500/5 scale-[1.02]' 
              : 'border-white/10 bg-white/[0.02] hover:border-white/20'}
          `}
        >
          <input 
            type="file" 
            multiple 
            hidden 
            ref={fileInputRef} 
            onChange={handleFileSelect}
          />
          
          <div className="flex flex-col items-center">
            <span className="text-5xl mb-6">📁</span>
            <p className="text-lg font-bold mb-2">
              {files.length > 0 ? `${files.length} fichiers sélectionnés` : "Glisse tes fichiers ici"}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
              Ou clique pour parcourir ton ordinateur
            </p>
          </div>
        </div>

        {/* LISTE DES FICHIERS (Si sélectionnés) */}
        {files.length > 0 && (
          <div className="mt-8 text-left bg-white/[0.01] border border-white/5 rounded-3xl p-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4">Fichiers prêts :</h3>
            <ul className="space-y-2">
              {files.slice(0, 3).map((file, i) => (
                <li key={i} className="text-xs text-gray-400 truncate flex items-center gap-2">
                  <span className="opacity-30">•</span> {file.name}
                </li>
              ))}
              {files.length > 3 && <li className="text-[9px] text-gray-600 italic">...et {files.length - 3} autres fichiers</li>}
            </ul>
            <button className="w-full mt-6 py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
              Lancer le déploiement
            </button>
          </div>
        )}
      </div>

    </div>
  )
}