"use client"
import { useState } from 'react'
import Link from 'next/link'

// --- COMPOSANT ICONES SVG (Zéro pixels, que du vecteur) ---
const Icons = {
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Message: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  X: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [postText, setPostText] = useState("")
  const [posts, setPosts] = useState([
    { id: 1, user: "Jordan_Dev", content: "Design vectoriel activé ! Exit les pixels. 🚀", likes: 12, liked: false },
    { id: 2, user: "Sarah_Code", content: "Les DMs arrivent bientôt sur le main branch.", likes: 8, liked: false },
  ])

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans pb-32">
      {/* HEADER */}
      <nav className="p-5 flex justify-between items-center sticky top-0 bg-[#0b0e14]/80 backdrop-blur-xl z-50 border-b border-white/5">
        <h1 className="font-black italic text-blue-500 text-xl tracking-tighter">DEVSTEP</h1>
        <div className="flex gap-4 items-center">
           <div className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">Shoncs</div>
           <button 
            onClick={() => setActiveTab('dms')} 
            className={`transition-all ${activeTab === 'dms' ? 'text-blue-500' : 'text-white/60 hover:text-white'}`}
           >
             <Icons.Message />
           </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4">
        
        {/* INTERFACE DE PUBLICATION */}
        {activeTab === 'add' && (
          <div className="max-w-xl mx-auto animate-in fade-in zoom-in duration-300 pt-10">
            <div className="bg-[#161b22] border border-white/10 rounded-[40px] p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black italic uppercase tracking-tighter text-blue-600">Nouveau Post</h2>
                {/* BOUTON RETOUR */}
                <button 
                  onClick={() => {setActiveTab('home'); setPostText("");}}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <Icons.X />
                </button>
              </div>
              <textarea 
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Qu'est-ce qu'on build aujourd'hui ?"
                className="w-full bg-transparent min-h-[150px] outline-none text-lg text-gray-300 resize-none"
              />
              <button 
                onClick={() => {
                    if(postText) {
                        setPosts([{id: Date.now(), user: "Shoncs", content: postText, likes: 0, liked: false}, ...posts]);
                        setPostText(""); setActiveTab('home');
                    }
                }}
                className="w-full mt-8 bg-blue-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
              >
                Publier sur le Feed
              </button>
            </div>
          </div>
        )}

        {/* INTERFACE DMS (VIDE POUR L'INSTANT) */}
        {activeTab === 'dms' && (
          <div className="max-w-xl mx-auto text-center pt-20 animate-in slide-in-from-right-10 duration-300">
            <h2 className="text-3xl font-black italic mb-2 uppercase">Messages <span className="text-blue-600">Privés</span></h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Aucune discussion pour le moment.</p>
            <button onClick={() => setActiveTab('home')} className="mt-10 text-blue-500 font-black text-[10px] uppercase tracking-widest">← Retour au flux</button>
          </div>
        )}

        {/* LE FEED */}
        {activeTab === 'home' && (
          <div className="max-w-2xl mx-auto space-y-6 pt-6">
            {posts.map(post => (
              <div key={post.id} className="bg-[#161b22] border border-white/10 rounded-[35px] p-6 animate-in fade-in duration-700">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/10" />
                    <span className="text-xs font-black italic uppercase text-blue-400 tracking-wider">@{post.user}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed font-medium">{post.content}</p>
                <div className="mt-6 pt-4 border-t border-white/5 flex gap-6">
                  <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">❤️ {post.likes}</button>
                  <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">💬 Commenter</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* BOTTOM NAV BAR (VECTORIELLE) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center shadow-2xl z-[100]">
        <button onClick={() => setActiveTab('home')} className={`p-4 transition-all ${activeTab === 'home' ? 'text-blue-500' : 'text-white/40'}`}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className={`p-4 transition-all ${activeTab === 'search' ? 'text-blue-500' : 'text-white/40'}`}><Icons.Search /></button>
        <button 
            onClick={() => setActiveTab('add')} 
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl ${activeTab === 'add' ? 'bg-red-500 text-white rotate-0' : 'bg-blue-600 text-white'}`}
        >
            {activeTab === 'add' ? <Icons.X /> : <span className="text-2xl font-light">+</span>}
        </button>
        <button onClick={() => setActiveTab('play')} className={`p-4 transition-all ${activeTab === 'play' ? 'text-blue-500' : 'text-white/40'}`}><Icons.Play /></button>
        <button onClick={() => setActiveTab('profile')} className={`p-4 transition-all ${activeTab === 'profile' ? 'text-blue-500' : 'text-white/40'}`}><Icons.User /></button>
      </div>
    </div>
  )
}