"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function FeedPage() {
  const [postText, setPostText] = useState("")

  // Simulation de posts (On pourra connecter une base de données après)
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Jordan_Dev",
      content: "Je viens de finir l'interface de mon nouveau projet sur DevStep ! 🚀",
      time: "Il y a 2h"
    },
    {
      id: 2,
      user: "Sarah_Code",
      content: "Quelqu'un sait comment optimiser les images sur Next.js ?",
      time: "Il y a 5h"
    }
  ])

  const handlePost = () => {
    if (!postText.trim()) return
    const newPost = {
      id: Date.now(),
      user: "Moi", // Ici on mettra le vrai nom plus tard
      content: postText,
      time: "À l'instant"
    }
    setPosts([newPost, ...posts])
    setPostText("")
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      {/* NAVBAR */}
      <nav className="w-full py-4 px-8 flex justify-between items-center border-b border-white/5 bg-[#0b0e14]/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-black italic text-blue-600 uppercase tracking-tighter">DEVSTEP</span>
        </Link>
        <Link href="/dashboard" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all">
          Retour au Dashboard
        </Link>
      </nav>

      <main className="max-w-2xl mx-auto pt-10 px-4 pb-20">
        <h1 className="text-3xl font-black italic mb-8 tracking-tight">RÉSEAU <span className="text-blue-600">COMMUNAUTÉ</span></h1>

        {/* ZONE DE PUBLICATION */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 mb-10 shadow-xl">
          <textarea 
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Partagez votre progression ou posez une question..."
            className="w-full bg-transparent border-none outline-none text-sm resize-none h-24 placeholder:text-gray-600"
          />
          <div className="flex justify-end mt-4 border-t border-white/5 pt-4">
            <button 
              onClick={handlePost}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Publier
            </button>
          </div>
        </div>

        {/* LISTE DES POSTS */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-all group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest italic">@{post.user}</span>
                <span className="text-gray-600 text-[9px] uppercase font-bold">{post.time}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 font-medium">
                {post.content}
              </p>
              <div className="flex gap-4 opacity-30 group-hover:opacity-100 transition-all">
                <button className="text-[9px] font-bold uppercase hover:text-blue-500">Like</button>
                <button className="text-[9px] font-bold uppercase hover:text-blue-500">Répondre</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}