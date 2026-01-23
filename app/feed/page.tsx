"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function FeedPage() {
  const [postText, setPostText] = useState("")
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "System",
      content: "Bienvenue sur le réseau DevStep ! Ici, on partage du code et de l'entraide. 🚀",
      time: "Maintenant"
    }
  ])

  // FONCTION POUR PUBLIER
  const publishPost = () => {
    if (postText.trim() === "") return

    const newPost = {
      id: Date.now(),
      user: "Programmeur", // On changera ça quand on aura les profils
      content: postText,
      time: "À l'instant"
    }

    setPosts([newPost, ...posts]) // Met le nouveau post tout en haut
    setPostText("") // Vide la zone de texte
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      
      {/* --- NAVBAR DU FEED --- */}
      <nav className="w-full py-4 px-8 flex justify-between items-center border-b border-white/5 bg-[#0b0e14]/90 backdrop-blur-xl fixed top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icon.png" alt="Logo" width={30} height={30} className="rounded-full" />
          <span className="text-lg font-black italic text-blue-600 tracking-tighter uppercase">DEVSTEP</span>
        </Link>
        <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 transition-all">
          Mon Cloud
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto pt-24 pb-12 px-4">
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Communauté</h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">Échangez avec d'autres programmeurs</p>
        </div>

        {/* --- ZONE DE PUBLICATION --- */}
        <div className="mb-12 p-6 bg-[#161b26] rounded-[35px] border border-white/5 shadow-2xl">
          <textarea 
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Un bug ? Une astuce ? Partagez ici..." 
            className="w-full h-32 bg-transparent border-none outline-none text-sm resize-none text-gray-200 placeholder:text-gray-600 font-medium"
          />
          <div className="flex justify-end pt-4 border-t border-white/5">
            <button 
              onClick={publishPost}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
            >
              Publier le post
            </button>
          </div>
        </div>

        {/* --- LISTE DES POSTS --- */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="p-8 bg-[#161b26]/50 rounded-[40px] border border-white/5 hover:border-blue-500/20 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-500 font-bold text-xs">
                    {post.user[0]}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-blue-400">@{post.user}</p>
                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter">{post.time}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-sm font-medium">
                {post.content}
              </p>

              <div className="mt-6 pt-4 border-t border-white/5 flex gap-6">
                <button className="text-[10px] font-bold text-gray-600 hover:text-red-500 transition-colors uppercase">❤️ Like</button>
                <button className="text-[10px] font-bold text-gray-600 hover:text-blue-500 transition-colors uppercase">💬 Répondre</button>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}