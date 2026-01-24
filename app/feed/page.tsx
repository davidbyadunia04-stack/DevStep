"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function FeedPage() {
  const [posts, setPosts] = useState([
    { id: 1, user: "Jordan_Dev", content: "Je viens de refaire le design, c'est propre non ? ✨", likes: 12 },
    { id: 2, user: "Sarah_Code", content: "Quelqu'un a testé le nouveau bot de sécu ?", likes: 8 },
  ])

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans pb-32">
      {/* HEADER TOP */}
      <nav className="p-5 flex justify-between items-center sticky top-0 bg-[#0b0e14]/80 backdrop-blur-xl z-50 border-b border-white/5">
        <h1 className="font-black italic text-blue-500 text-xl tracking-tighter">DEVSTEP</h1>
        <div className="flex gap-4 items-center">
           <div className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-bold">Shoncs</div>
           <span className="text-xl">💬</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 p-4 mt-4">
        
        {/* COLONNE GAUCHE (Desktop seulement) */}
        <div className="hidden md:block md:col-span-4 space-y-6">
          <div className="bg-[#161b22] border border-white/10 rounded-[30px] p-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 flex justify-between">
              Publication <span>✕</span>
            </h3>
            <div className="flex gap-3 mb-4">
               <div className="w-10 h-10 rounded-full bg-gray-700" />
               <input placeholder="Quoi de neuf ?" className="bg-transparent border-none outline-none text-sm w-full" />
            </div>
            <div className="flex gap-4 mb-6 opacity-50">
               <span>❤️</span><span>💬</span><span>📁</span>
            </div>
            <button className="w-full bg-blue-600 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-600/20">
              Publier
            </button>
          </div>
        </div>

        {/* COLONNE CENTRALE (Feed + Stories) */}
        <div className="md:col-span-8 space-y-6">
          
          {/* STORIES */}
          <div className="bg-[#161b22] border border-white/10 rounded-[30px] p-6 overflow-hidden">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Stories</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-xl">+</div>
                <span className="text-[8px] font-bold uppercase opacity-50">Ta Story</span>
              </div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#0b0e14] border-2 border-[#0b0e14]" />
                  </div>
                  <span className="text-[8px] font-bold uppercase opacity-50">Sarah {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* POSTS */}
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="bg-[#161b22] border border-white/10 rounded-[30px] p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-800" />
                    <div>
                      <p className="text-xs font-black italic">@{post.user}</p>
                      <p className="text-[10px] text-blue-500 font-bold">@Sarah_Code</p>
                    </div>
                  </div>
                  <span className="opacity-30">•••</span>
                </div>
                <p className="text-sm text-gray-300 mb-6">{post.content}</p>
                <div className="flex gap-6 items-center pt-4 border-t border-white/5">
                  <span className="text-xs opacity-50">❤️ {post.likes}</span>
                  <span className="text-xs opacity-50">💬 Commenter</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* BOTTOM NAV BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 rounded-full p-4 flex justify-around items-center shadow-2xl z-[100]">
        <button className="text-xl">🏠</button>
        <button className="text-xl opacity-40">🔍</button>
        <button className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold">+</button>
        <button className="text-xl opacity-40">▶️</button>
        <button className="text-xl opacity-40">👤</button>
      </div>
    </div>
  )
}