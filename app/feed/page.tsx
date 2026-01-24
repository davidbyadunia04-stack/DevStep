"use client"
import { useState } from 'react'
import Link from 'next/link'

// --- COMPOSANT ICONES SVG (Qualité Vectorielle) ---
const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Message: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  X: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Send: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
}

export default function FeedPage() {
  // --- ÉTATS ---
  const [activeTab, setActiveTab] = useState('home')
  const [postText, setPostText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [posts, setPosts] = useState([
    { id: 1, user: "Jordan_Dev", content: "Le mode recherche est enfin en ligne ! Testez la loupe. 🔍", likes: 12 },
    { id: 2, user: "Sarah_Code", content: "Qui build en Next.js ici ? J'ai besoin d'un avis.", likes: 45 },
  ])

  // --- LOGIQUE RECHERCHE ---
  const filteredPosts = posts.filter(p => 
    p.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.user.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans selection:bg-blue-500/30">
      
      {/* HEADER FIXE */}
      <nav className="p-5 flex justify-between items-center sticky top-0 bg-[#0b0e14]/90 backdrop-blur-xl z-[100] border-b border-white/5">
        <h1 className="font-black italic text-blue-500 text-2xl tracking-tighter">DEVSTEP</h1>
        <div className="flex gap-5 items-center">
           <div className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Shoncs</div>
           <button onClick={() => setActiveTab('dms')} className={`transition-all ${activeTab === 'dms' ? 'text-blue-500 scale-110' : 'text-white/40 hover:text-white'}`}>
             <Icons.Message />
           </button>
        </div>
      </nav>

      <main className="max-w-xl mx-auto p-4 pt-8">

        {/* --- ONGLET RECHERCHE --- */}
        {activeTab === 'search' && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300 mb-8">
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20"><Icons.Search /></div>
              <input 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Chercher un dev ou un projet..."
                className="w-full bg-[#161b22] border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-blue-600/50 transition-all text-sm"
              />
            </div>
          </div>
        )}

        {/* --- ONGLET PUBLICATION (+ RETOUR) --- */}
        {activeTab === 'add' && (
          <div className="animate-in zoom-in-95 fade-in duration-300">
            <div className="bg-[#161b22] border border-white/10 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black italic uppercase text-blue-600">Nouveau Post</h2>
                <button onClick={() => {setActiveTab('home'); setPostText("")}} className="p-2 hover:bg-white/5 rounded-full transition-colors opacity-40 hover:opacity-100"><Icons.X /></button>
              </div>
              <textarea 
                autoFocus
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Raconte ton build du jour..."
                className="w-full bg-transparent min-h-[180px] outline-none text-lg leading-relaxed resize-none"
              />
              <button 
                onClick={() => { if(postText) { setPosts([{id: Date.now(), user: "Shoncs", content: postText, likes: 0}, ...posts]); setPostText(""); setActiveTab('home'); } }}
                className="w-full mt-6 bg-blue-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
              >
                Envoyer au monde
              </button>
            </div>
          </div>
        )}

        {/* --- ONGLET MESSAGES (DMs) --- */}
        {activeTab === 'dms' && (
          <div className="text-center pt-20 animate-in slide-in-from-right-10 duration-500">
            <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-600/20 text-blue-500">
              <Icons.Message />
            </div>
            <h2 className="text-2xl font-black italic uppercase mb-2">Pas de <span className="text-blue-600">DMs</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Tes discussions apparaîtront ici.</p>
            <button onClick={() => setActiveTab('home')} className="mt-10 px-6 py-2 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">← Retour</button>
          </div>
        )}

        {/* --- LE FEED (Home & Recherche) --- */}
        {(activeTab === 'home' || activeTab === 'search') && (
          <div className="space-y-6 pb-20">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-[#161b22] border border-white/10 rounded-[35px] p-7 group hover:border-white/20 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 shadow-inner" />
                  <div>
                    <p className="text-xs font-black italic uppercase tracking-wider text-blue-400">@{post.user}</p>
                    <p className="text-[9px] text-white/30 font-bold uppercase tracking-tighter">Membre Pro</p>
                  </div>
                </div>
                <p className="text-[15px] text-gray-200 leading-relaxed font-medium mb-6">{post.content}</p>
                <div className="flex gap-6 pt-5 border-t border-white/5">
                  <button className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-red-500 transition-colors flex items-center gap-2">❤️ {post.likes}</button>
                  <button className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-blue-500 transition-colors flex items-center gap-2">💬 Commenter</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center shadow-2xl z-[100]">
        <button onClick={() => setActiveTab('home')} className={`p-4 transition-all ${activeTab === 'home' ? 'text-blue-500 scale-110' : 'text-white/30 hover:text-white'}`}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className={`p-4 transition-all ${activeTab === 'search' ? 'text-blue-500 scale-110' : 'text-white/30 hover:text-white'}`}><Icons.Search /></button>
        
        {/* BOUTON CENTRAL DYNAMIQUE (+ ou X) */}
        <button 
            onClick={() => activeTab === 'add' ? setActiveTab('home') : setActiveTab('add')} 
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${activeTab === 'add' ? 'bg-red-500 text-white rotate-0' : 'bg-blue-600 text-white hover:scale-105 active:scale-95'}`}
        >
            {activeTab === 'add' ? <Icons.X /> : <span className="text-3xl font-light mb-1">+</span>}
        </button>

        <button onClick={() => setActiveTab('play')} className={`p-4 transition-all ${activeTab === 'play' ? 'text-blue-500 scale-110' : 'text-white/30 hover:text-white'}`}><Icons.Play /></button>
        <button onClick={() => setActiveTab('profile')} className={`p-4 transition-all ${activeTab === 'profile' ? 'text-blue-500 scale-110' : 'text-white/30 hover:text-white'}`}><Icons.User /></button>
      </div>
    </div>
  )
}