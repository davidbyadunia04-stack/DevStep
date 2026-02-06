"use client"
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// --- TYPES ---
interface UserProfile {
  country: string;
  color: string;
  bio: string;
  displayName?: string;
}

interface Post {
  id: number;
  userId: string;
  content: string;
  likes: number;
  lang: string;
  media?: string; // Pour stocker l'URL de l'image/vidéo
}

const Icons = {
  Home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Camera: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  X: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Globe: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
}

export default function FeedPage() {
  // --- ÉTATS DYNAMIQUES ---
  const [activeTab, setActiveTab] = useState('home')
  const [currentUser, setCurrentUser] = useState<string>("") // Pseudo vide au départ
  const [showNamingPage, setShowNamingPage] = useState(true)
  const [tempMedia, setTempMedia] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [posts, setPosts] = useState<Post[]>([
    { id: 1, userId: "Admin", content: "Bienvenue sur DEVSTEP !", likes: 99, lang: "FR" }
  ])

  // --- PERSISTANCE DU PSEUDO ---
  useEffect(() => {
    const savedName = localStorage.getItem('devstep_user')
    if (savedName) {
      setCurrentUser(savedName)
      setShowNamingPage(false)
    }
  }, [])

  const saveUsername = (name: string) => {
    if (name.length > 2) {
      localStorage.setItem('devstep_user', name)
      setCurrentUser(name)
      setShowNamingPage(false)
    }
  }

  // --- GESTION MÉDIA ---
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setTempMedia(url)
    }
  }

  // --- PAGE D'ONBOARDING (CHOIX DU PSEUDO) ---
  if (showNamingPage) {
    return (
      <div className="h-screen bg-[#06090f] flex items-center justify-center p-6 text-center">
        <div className="max-w-sm w-full space-y-8 animate-in fade-in zoom-in duration-500">
          <h1 className="text-4xl font-black italic text-blue-500 italic tracking-tighter">DEVSTEP</h1>
          <div className="space-y-4">
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Choisis ton identité</p>
            <input 
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && saveUsername((e.target as HTMLInputElement).value)}
              placeholder="@pseudo..." 
              className="w-full bg-[#10141d] border border-blue-500/30 rounded-2xl py-5 px-6 outline-none focus:border-blue-500 transition-all text-center text-xl font-bold"
            />
            <button 
              onClick={() => {
                const input = document.querySelector('input')?.value
                if(input) saveUsername(input)
              }}
              className="w-full bg-blue-600 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-600/20"
            >
              Entrer dans le Sanctuaire
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#06090f] text-white font-sans overflow-x-hidden pb-40">
      
      {/* HEADER AVEC PSEUDO ACTUEL */}
      <nav className="max-w-4xl mx-auto p-6 flex justify-between items-center sticky top-0 bg-[#06090f]/80 backdrop-blur-xl z-[100]">
        <h1 className="text-2xl font-black italic text-blue-500">DEVSTEP</h1>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
            @{currentUser}
          </span>
          <button onClick={() => { localStorage.removeItem('devstep_user'); setShowNamingPage(true); }} className="p-2 opacity-20 hover:opacity-100 transition-opacity">
            <Icons.X />
          </button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4">

        {/* ZONE DE PUBLICATION (PHOTO/VIDEO) */}
        {activeTab === 'add' && (
          <div className="mb-10 animate-in slide-in-from-bottom-5 duration-300">
            <div className="bg-[#10141d] border border-white/10 rounded-[30px] p-6">
              <textarea 
                autoFocus
                onChange={(e) => (window as any).postContent = e.target.value}
                placeholder={`Quoi de neuf, ${currentUser} ?`} 
                className="w-full bg-transparent min-h-[100px] outline-none resize-none text-lg"
              />
              
              {/* APERÇU DU MÉDIA */}
              {tempMedia && (
                <div className="relative mt-4 rounded-2xl overflow-hidden border border-white/10 max-h-60">
                   <img src={tempMedia} className="w-full h-full object-cover" alt="preview" />
                   <button onClick={() => setTempMedia(null)} className="absolute top-2 right-2 bg-black/50 p-2 rounded-full"><Icons.X /></button>
                </div>
              )}

              <div className="flex justify-between items-center mt-6">
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase"
                >
                  <Icons.Camera /> Photo / Vidéo
                </button>
                <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleMediaUpload} />
                
                <button 
                  onClick={() => {
                    const content = (window as any).postContent
                    if(content || tempMedia) {
                      setPosts([{id: Date.now(), userId: currentUser, content: content || "", likes: 0, lang: "FR", media: tempMedia || undefined}, ...posts])
                      setTempMedia(null)
                      setActiveTab('home')
                    }
                  }}
                  className="px-8 py-3 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg"
                >
                  Diffuser
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FEED AVEC MÉDIA ÉTENDU */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-[#10141d] border border-white/5 rounded-[30px] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-800" />
                <span className="text-xs font-black uppercase italic text-blue-400">@{post.userId}</span>
              </div>
              <p className="text-gray-300 mb-4">{post.content}</p>
              {post.media && (
                <div className="rounded-2xl overflow-hidden border border-white/5 mb-4 shadow-2xl">
                   <img src={post.media} className="w-full object-cover" alt="post media" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* NAVIGATION BAR */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-[#10141d]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-3 flex justify-around items-center z-[100]">
        <button onClick={() => setActiveTab('home')} className={`p-4 transition-all ${activeTab === 'home' ? 'text-blue-500' : 'text-white/20'}`}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className={`p-4 transition-all ${activeTab === 'search' ? 'text-blue-500' : 'text-white/20'}`}><Icons.Search /></button>
        <button onClick={() => setActiveTab('add')} className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all"><span className="text-3xl font-light mb-1">+</span></button>
        <button onClick={() => setActiveTab('play')} className={`p-4 transition-all ${activeTab === 'play' ? 'text-blue-500' : 'text-white/20'}`}><Icons.Play /></button>
        <Link href="/profile" className="p-4 text-white/20"><Icons.User /></Link>
      </div>

    </div>
  )
}