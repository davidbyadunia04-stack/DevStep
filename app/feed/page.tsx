"use client"
import { useState, useRef } from 'react'

export default function CreatePost() {
  const [postText, setPostText] = useState("")
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePost = async () => {
    if (!postText && !selectedFile) return
    
    // On lance le bot ici si une image est présente
    if (selectedFile) {
      setIsScanning(true)
      // Simulation du scan (puisque l'install npm a buggé)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsScanning(false)
    }

    console.log("Post envoyé !")
    setPostText("")
    setSelectedFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // URL.createObjectURL transforme ton fichier en lien lisible par la balise <img>
      setSelectedFile(URL.createObjectURL(file))
    }
  }

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-[35px] p-6 mb-10">
      <textarea 
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="Quoi de neuf dans le code ?"
        className="w-full bg-transparent border-none outline-none h-16 text-sm text-gray-300 placeholder:opacity-30"
      />

      {selectedFile && (
        <div className="relative mb-4 rounded-2xl overflow-hidden border border-white/5">
          <img src={selectedFile} className={`w-full h-64 object-cover ${isScanning ? 'blur-2xl' : ''}`} />
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Bot Scan en cours...</span>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center border-t border-white/5 pt-4">
        <button 
          type="button"
          onClick={() => fileInputRef.current?.click()} 
          className="text-xl hover:scale-110 transition-transform"
        >
          🖼️
        </button>
        
        <input 
          type="file" 
          hidden 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*"
        />

        <button 
          onClick={handlePost} 
          disabled={isScanning}
          className="bg-blue-600 disabled:bg-gray-700 px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-90"
        >
          {isScanning ? "Analyse..." : "Publier"}
        </button>
      </div>
    </div>
  )
}