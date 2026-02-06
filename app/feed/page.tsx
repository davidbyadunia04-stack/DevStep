"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

// --- TYPESCRIPT INTERFACES (Pour supprimer tes erreurs rouges) ---
interface UserProfile {
  country: string;
  color: string;
  bio: string;
}

interface Post {
  id: number;
  userId: string;
  content: string;
  likes: number;
  lang: string;
}

// --- ICONES ---
const Icons = {
  Home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  UserPlus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>,
  Back: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg>,
  X: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
}

// --- DATABASE SIMULÉE (Avec Index Signature pour corriger l'erreur de ton image) ---
const GLOBAL_USERS: Record<string, UserProfile> = {
  "Shoncs": { country: "FR", color: "from-blue-600 to-indigo-600", bio: "Admin" },
  "Alex_NY": { country: "USA", color: "from-red-500 to-orange-500", bio: "Developer" },
  "Yuki_Tokyo": { country: "JP", color: "from-pink-500 to-purple-500", bio: "Designer" }
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState("")
  const [postText, setPostText] = useState("")
  
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, userId: "Shoncs", content: "Bienvenue sur la version fonctionnelle de DEVSTEP ! ✨", likes: 12, lang: "FR" },
    { id: 2, userId: "Alex_NY", content: "The UI looks amazing with this glassmorphism bar.", likes: 8, lang: "EN" }
  ])

  const filteredPosts = posts.filter(p => 
    p.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.userId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#06090f] text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
      
      {/* --- HEADER (Identique à ton screen) --- */}
      <nav className="max-w-4xl mx-auto p-6 flex justify-between items-center">
        <h1 className="text-3xl font-black italic text-blue-500 tracking-tighter">DEVSTEP</h1>
        <div className="flex gap-3">
          <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5"><Icons.UserPlus /></button>
          <button className="p-2.5 bg-white/10 rounded-full border border-white/10"><Icons.Bell /></button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 pb-40">
        
        {/* --- BARRE DE RECHERCHE (Identique à ton screen) --- */}
        <div className="flex items-center gap-4 mt-4 mb-10">
          <button onClick={() => setSearchQuery("")} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5">
            <Icons.Back />
          </button>
          <div className="relative flex-1 group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors">
              <Icons.Search />
            </div>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Chercher un ami (@) ou un post..." 
              className="w-full bg-[#10141d] border border-white/5 rounded-full py-4 pl-14 pr-6 outline-none focus:border-blue-500/50 focus:bg-[#121825] transition-all text-sm placeholder:text-white/20"
            />
          </div>
        </div>

        {/* --- ZONE D'ÉCRITURE (Conditionnelle) --- */}
        {activeTab === 'add' && (
          <div className="mb-10 animate-in zoom-in-95 duration-300">
            <div className="bg-[#10141d] border border-white/10 rounded-[30px] p-6 shadow-2xl">
              <textarea 
                autoFocus
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Exprime-toi..." 
                className="w-full bg-transparent min-h-[120px] outline-none resize-none text-lg"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setActiveTab('home')} className="px-6 py-2 rounded-full text-xs font-bold uppercase text-white/40">Annuler</button>
                <button 
                  onClick={() => {
                    if(postText) {
                      setPosts([{id: Date.now(), userId: "Shoncs", content: postText, likes: 0, lang: "FR"}, ...posts]);
                      setPostText("");
                      setActiveTab('home');
                    }
                  }}
                  className="px-8 py-2 bg-blue-600 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-colors"
                >
                  Publier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- LISTE DES POSTS --- */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? filteredPosts.map(post => (
            <div key={post.id} className="bg-[#10141d] border border-white/5 rounded-[30px] p-6 hover:border-white/10 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${GLOBAL_USERS[post.userId]?.color || 'from-gray-700 to-gray-800'}`} />
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase italic text-blue-400">@{post.userId}</span>
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{GLOBAL_USERS[post.userId]?.country || 'Unknown'}</span>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">{post.content}</p>
            </div>
          )) : (
            <div className="text-center py-20 opacity-10 font-black italic uppercase tracking-[0.3em]">Aucun résultat</div>
          )}
        </div>
      </main>

      {/* --- BOTTOM BAR (Exactement comme ton screen) --- */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-[#10141d]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-3 flex justify-around items-center shadow-2xl z-[100]">
        <button onClick={() => setActiveTab('home')} className={`p-4 transition-all ${activeTab === 'home' ? 'text-blue-500' : 'text-white/20 hover:text-white'}`}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className={`p-4 transition-all ${activeTab === 'search' ? 'text-blue-500' : 'text-white/20 hover:text-white'}`}><Icons.Search /></button>
        
        {/* BOUTON CENTRAL + */}
        <button 
          onClick={() => activeTab === 'add' ? setActiveTab('home') : setActiveTab('add')}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl shadow-blue-600/20 ${activeTab === 'add' ? 'bg-red-500 rotate-0' : 'bg-blue-600 hover:scale-110 active:scale-95'}`}
        >
          {activeTab === 'add' ? <Icons.X /> : <span className="text-3xl font-light mb-1">+</span>}
        </button>

        <button onClick={() => setActiveTab('play')} className={`p-4 transition-all ${activeTab === 'play' ? 'text-blue-500' : 'text-white/20 hover:text-white'}`}><Icons.Play /></button>
        
        <Link href="/profile" className="p-4 transition-all text-white/20 hover:text-white">
          <Icons.User />
        </Link>
      </div>

    </div>
  )
}