"use client"
import { useState, useRef } from 'react'
import Link from 'next/link'

// --- TOUTES LES ICONES (SANS COUPURE) ---
const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Message: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  X: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Heart: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  Share: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState("")
  const [postText, setPostText] = useState("")
  
  const [posts, setPosts] = useState([
    { id: 1, user: "Jordan_Dev", content: "L'implémentation des Réels avance bien sur DEVSTEP ! 🚀", likes: 128 },
    { id: 2, user: "Sarah_Code", content: "Est-ce qu'on ajoute un mode sombre encore plus profond ? 😎", likes: 64 },
    { id: 3, user: "TechVibe", content: "Le trio Git (add, commit, push) c'est la vie.", likes: 256 }
  ])

  const [reels] = useState([
    { id: 1, user: "DevStep_Official", caption: "Le futur du code est ici 💻 #dev #nextjs", likes: "12.5k" },
    { id: 2, user: "UI_Master", caption: "Design de l'année 2026 ! ✨ #design", likes: "8.2k" },
    { id: 3, user: "CodeNinja", caption: "Tips pour Git ultra rapides ⚡ #coding", likes: "5.1k" }
  ])

  const filteredPosts = posts.filter(p => p.content.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* HEADER (Caché en mode Reels pour l'immersion totale) */}
      {activeTab !== 'play' && (
        <nav className="p-5 flex justify-between items-center sticky top-0 bg-[#0b0e14]/90 backdrop-blur-xl z-[100] border-b border-white/5 transition-all duration-300">
          <Link href="/" className="font-black italic text-blue-500 text-2xl tracking-tighter hover:scale-105 transition-transform">
            DEVSTEP
          </Link>
          <div className="flex gap-5 items-center">
             <div className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Shoncs</div>
             <button onClick={() => setActiveTab('dms')} className={`transition-all ${activeTab === 'dms' ? 'text-blue-500' : 'text-white/40'}`}>
               <Icons.Message />
             </button>
          </div>
        </nav>
      )}

      <main className={`${activeTab === 'play' ? 'h-screen' : 'max-w-xl mx-auto p-4 pt-8'}`}>

        {/* --- RECHERCHE --- */}
        {activeTab === 'search' && (
          <div className="animate-in slide-in-from-top-4 duration-300 mb-8">
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20"><Icons.Search /></div>
              <input 
                autoFocus 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Rechercher un post..." 
                className="w-full bg-[#161b22] border border-white/10 rounded-2xl py-5 pl-14 outline-none focus:border-blue-600/50 transition-all shadow-2xl placeholder:text-white/10" 
              />
            </div>
          </div>
        )}

        {/* --- NOUVEAU POST --- */}
        {activeTab === 'add' && (
          <div className="animate-in zoom-in-95 duration-300">
            <div className="bg-[#161b22] border border-white/10 rounded-[40px] p-8 relative shadow-2xl">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-black italic uppercase text-blue-600">Nouveau Post</h2>
                 <button onClick={() => {setActiveTab('home'); setPostText("")}} className="opacity-40 hover:opacity-100 transition-opacity"><Icons.X /></button>
               </div>
               <textarea 
                  autoFocus 
                  value={postText} 
                  onChange={(e) => setPostText(e.target.value)} 
                  placeholder="Partage ton code ou tes idées..." 
                  className="w-full bg-transparent min-h-[150px] outline-none text-lg resize-none placeholder:text-white/5" 
               />
               <button 
                  onClick={() => { if(postText) { setPosts([{id: Date.now(), user: "Shoncs", content: postText, likes: 0}, ...posts]); setPostText(""); setActiveTab('home'); } }} 
                  className="w-full mt-4 bg-blue-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-colors"
               >
                  Publier sur le feed
               </button>
            </div>
          </div>
        )}

        {/* --- SECTION REELS (SNAP SCROLL) --- */}
        {activeTab === 'play' && (
          <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black relative">
            {reels.map(reel => (
              <div key={reel.id} className="h-screen w-full snap-start relative flex flex-col justify-end pb-32 p-6 overflow-hidden">
                {/* Simulation de Vidéo (Gradient dynamique) */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-black z-0 flex items-center justify-center">
                    <div className="opacity-10 scale-[3] rotate-12 font-black italic select-none">REEL CONTENT</div>
                    <div className="absolute w-24 h-24 border-2 border-white/5 rounded-full flex items-center justify-center animate-pulse">
                        <Icons.Play />
                    </div>
                </div>

                {/* Contenu du Reel (Bas) */}
                <div className="relative z-10 space-y-4 max-w-[80%] animate-in slide-in-from-bottom-10 duration-700">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-white shadow-xl" />
                        <span className="font-black italic text-sm tracking-tighter uppercase">@{reel.user}</span>
                        <button className="bg-white text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase ml-2 hover:bg-blue-500 hover:text-white transition-colors">Suivre</button>
                    </div>
                    <p className="text-sm font-medium leading-relaxed drop-shadow-2xl text-gray-100">{reel.caption}</p>
                </div>

                {/* Boutons Actions (Droite) */}
                <div className="absolute right-4 bottom-32 z-20 flex flex-col gap-8 items-center">
                    <button className="group flex flex-col items-center gap-1.5">
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-red-500/80 transition-all duration-300">
                           <Icons.Heart />
                        </div>
                        <span className="text-[10px] font-black">{reel.likes}</span>
                    </button>
                    <button className="group flex flex-col items-center gap-1.5">
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-blue-500/80 transition-all">
                           <Icons.Message />
                        </div>
                        <span className="text-[10px] font-black">Commenter</span>
                    </button>
                    <button className="group flex flex-col items-center gap-1.5">
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-green-500/80 transition-all">
                           <Icons.Share />
                        </div>
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- FEED CLASSIQUE --- */}
        {(activeTab === 'home' || activeTab === 'search') && (
          <div className="space-y-6 pb-32 animate-in fade-in duration-500">
            {filteredPosts.length > 0 ? filteredPosts.map(post => (
              <div key={post.id} className="bg-[#161b22] border border-white/10 rounded-[35px] p-6 hover:border-white/20 transition-all shadow-sm group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 shadow-md group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black italic uppercase tracking-wider text-blue-400">@{post.user}</span>
                </div>
                <p className="text-sm text-gray-300 font-medium leading-relaxed">{post.content}</p>
                <div className="mt-5 pt-4 border-t border-white/5 flex gap-6 text-[10px] font-black uppercase tracking-widest text-white/30">
                  <button className="hover:text-red-500 flex items-center gap-2 transition-colors">❤️ {post.likes}</button>
                  <button className="hover:text-blue-500 flex items-center gap-2 transition-colors">💬 {Math.floor(post.likes / 3)}</button>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 opacity-20 font-black italic uppercase">Aucun post trouvé</div>
            )}
          </div>
        )}
      </main>

      {/* --- BOTTOM BAR (LA MEME QUE SUR TOUTES LES PAGES) --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center shadow-2xl z-[100]">
        <button onClick={() => setActiveTab('home')} className={`p-4 transition-all ${activeTab === 'home' ? 'text-blue-500 scale-110' : 'text-white/30 hover:text-white'}`}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className={`p-4 transition-all ${activeTab === 'search' ? 'text-blue-500 scale-110' : 'text-white/30 hover:text-white'}`}><Icons.Search /></button>
        
        <button onClick={() => activeTab === 'add' ? setActiveTab('home') : setActiveTab('add')} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${activeTab === 'add' ? 'bg-red-500 rotate-0' : 'bg-blue-600 hover:scale-105 active:scale-95'}`}>
          {activeTab === 'add' ? <Icons.X /> : <span className="text-3xl font-light mb-1">+</span>}
        </button>

        <button onClick={() => setActiveTab('play')} className={`p-4 transition-all ${activeTab === 'play' ? 'text-blue-500 scale-110' : 'text-white/30 hover:text-white'}`}><Icons.Play /></button>
        
        <Link href="/profile" className="p-4 transition-all text-white/30 hover:text-white hover:scale-110">
          <Icons.User />
        </Link>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}