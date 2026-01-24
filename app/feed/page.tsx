"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function FeedPage() {
  const [postText, setPostText] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [posts, setPosts] = useState<any[]>([
    { id: 1, user: "DevStep_Bot", content: "Système de protection actif. 🛡️" }
  ])

  const handlePublish = async () => {
    if (!postText.trim()) return
    
    // Le bot scanne le texte (on peut ajouter le scan d'image ici plus tard)
    setIsScanning(true)
    
    // Simulation du scan intelligent
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        user: "Moi",
        content: postText
      }
      setPosts([newPost, ...posts])
      setPostText("")
      setIsScanning(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      <nav className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0b0e14]/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="font-black italic text-blue-600 text-xl tracking-tighter">DEVSTEP</Link>
        {isScanning && <span className="text-[9px] font-black text-blue-400 animate-pulse uppercase tracking-[0.2em]">Bot analyse en cours...</span>}
      </nav>

      <main className="max-w-xl mx-auto pt-10 px-4">
        <div className="bg-white/[0.02] border border-white/10 rounded-[35px] p-6 mb-12">
          <textarea 
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Écris quelque chose..."
            className="w-full bg-transparent border-none outline-none h-20 text-sm text-gray-300 resize-none"
          />
          <div className="flex justify-end border-t border-white/5 pt-4">
            <button 
              onClick={handlePublish}
              disabled={isScanning}
              className={`px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isScanning ? 'bg-gray-800' : 'bg-blue-600 hover:scale-105'}`}
            >
              {isScanning ? "Scan..." : "Publier"}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="border-b border-white/5 pb-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-600/10 border border-blue-600/20" />
                <span className="font-black italic text-[11px] uppercase tracking-wider text-blue-400">@{post.user}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{post.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}