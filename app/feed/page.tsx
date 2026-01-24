"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function FeedPage() {
  const [postText, setPostText] = useState("")
  // On initialise avec un tableau vide pour éviter l'écran blanc
  const [posts, setPosts] = useState<any[]>([
    { id: 1, user: "DevStep_Bot", content: "Bienvenue sur le nouveau feed ! 🚀" }
  ])

  const handlePublish = () => {
    if (!postText.trim()) return
    const newPost = {
      id: Date.now(),
      user: "Moi",
      content: postText
    }
    setPosts([newPost, ...posts])
    setPostText("")
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      {/* NAV BAR */}
      <nav className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0b0e14]/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="font-black italic text-blue-600 text-xl tracking-tighter">DEVSTEP</Link>
        <Link href="/" className="text-[10px] font-black uppercase opacity-50 tracking-widest">Quitter</Link>
      </nav>

      <main className="max-w-xl mx-auto pt-10 px-4">
        {/* ZONE DE PUBLICATION */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[35px] p-6 mb-12">
          <textarea 
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Quoi de neuf ?"
            className="w-full bg-transparent border-none outline-none h-20 text-sm text-gray-300 resize-none"
          />
          <div className="flex justify-end border-t border-white/5 pt-4 mt-2">
            <button 
              onClick={handlePublish}
              className="bg-blue-600 px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
            >
              Publier
            </button>
          </div>
        </div>

        {/* LISTE DES POSTS */}
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="border-b border-white/5 pb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-600/30" />
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