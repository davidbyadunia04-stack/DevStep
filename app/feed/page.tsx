"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function FeedPage() {
  // 1. ÉTATS (Pour rendre les boutons vivants)
  const [activeTab, setActiveTab] = useState('home')
  const [postText, setPostText] = useState("")
  const [posts, setPosts] = useState([
    { id: 1, user: "Jordan_Dev", content: "Le bot de sécu est enfin en place ! 🛡️", likes: 12, liked: false },
    { id: 2, user: "Sarah_Code", content: "Qui veut tester ma nouvelle API ?", likes: 8, liked: false },
  ])

  // 2. FONCTIONS
  const handlePublish = () => {
    if (!postText.trim()) return
    const newPost = {
      id: Date.now(),
      user: "Moi", // Ici on mettra ton vrai pseudo plus tard
      content: postText,
      likes: 0,
      liked: false
    }
    setPosts([newPost, ...posts])
    setPostText("")
    setActiveTab('home') // Retour au feed après publication
  }

  const toggleLike = (id: number) => {
    setPosts(posts.map(p => 
      p.id === id ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p
    ))
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans pb-32">
      {/* HEADER */}
      <nav className="p-5 flex justify-between items-center sticky top-0 bg-[#0b0e14]/80 backdrop-blur-xl z-50 border-b border-white/5">
        <h1 className="font-black italic text-blue-500 text-xl tracking-tighter">DEVSTEP</h1>
        <div className="flex gap-4 items-center">
           <div className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-bold">Shoncs</div>
           <button className="text-xl relative">💬 <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></span></button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 mt-4">
        
        {/* CONDITIONNEL : AFFICHAGE SELON L'ONGLET */}
        {activeTab === 'add' ? (
          /* ZONE DE PUBLICATION (Quand on clique sur +) */
          <div className="max-w-xl mx-auto animate-in fade-in zoom-in duration-300">
            <div className="bg-[#161b22] border border-white/10 rounded-[40px] p-8">
              <h2 className="text-2xl font-black italic mb-6 uppercase">Nouveau <span className="text-blue-600">Post</span></h2>
              <textarea 
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Partage ton code ou tes idées..."
                className="w-full bg-white/5 rounded-2xl p-4 min-h-[150px] outline-none border border-white/5 focus:border-blue-600/50 transition-all text-sm"
              />
              <button 
                onClick={handlePublish}
                className="w-full mt-6 bg-blue-600 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
              >
                Lancer la publication
              </button>
            </div>
          </div>
        ) : (
          /* LE FEED (Quand on est sur Home) */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-6">
              {/* STORIES */}
              <div className="bg-[#161b22] border border-white/10 rounded-[35px] p-6 flex gap-4 overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('add')} className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-xl">+</button>
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#0b0e14] border-2 border-[#0b0e14]" />
                  </div>
                ))}
              </div>

              {/* LISTE DES POSTS */}
              {posts.map(post => (
                <div key={post.id} className="bg-[#161b22] border border-white/10 rounded-[35px] p-6 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-600/40" />
                      <span className="text-xs font-black italic">@{post.user}</span>
                    </div>
                    <button className="opacity-20 hover:opacity-100">•••</button>
                  </div>
                  <p className="text-sm text-gray-300 mb-6 leading-relaxed">{post.content}</p>
                  <div className="flex gap-6 pt-4 border-t border-white/5">
                    <button onClick={() => toggleLike(post.id)} className={`text-xs font-bold transition-all ${post.liked ? 'text-red-500' : 'opacity-40'}`}>
                      {post.liked ? '❤️' : '🤍'} {post.likes}
                    </button>
                    <button className="text-xs opacity-40 font-bold hover:opacity-100">💬 Commenter</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* BOTTOM NAV BAR FONCTIONNELLE */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center shadow-2xl z-[100]">
        <button onClick={() => setActiveTab('home')} className={`p-4 transition-all ${activeTab === 'home' ? 'text-blue-500 scale-125' : 'opacity-40'}`}>🏠</button>
        <button onClick={() => setActiveTab('search')} className={`p-4 transition-all ${activeTab === 'search' ? 'text-blue-500 scale-125' : 'opacity-40'}`}>🔍</button>
        <button onClick={() => setActiveTab('add')} className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${activeTab === 'add' ? 'bg-blue-600 text-white rotate-45' : 'bg-white text-black'}`}>+</button>
        <button onClick={() => setActiveTab('play')} className={`p-4 transition-all ${activeTab === 'play' ? 'text-blue-600 scale-125' : 'opacity-40'}`}>▶️</button>
        <button onClick={() => setActiveTab('profile')} className={`p-4 transition-all ${activeTab === 'profile' ? 'text-blue-500 scale-125' : 'opacity-40'}`}>👤</button>
      </div>
    </div>
  )
}