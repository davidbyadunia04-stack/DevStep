"use client"
import { useState, useEffect } from 'react'

// --- TOUTES LES ICONES (Vérifie bien que Search et Play sont là) ---
const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
  Camera: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [postText, setPostText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // --- PARAMÈTRES UTILISATEUR ---
  const [username, setUsername] = useState("Shoncs")
  const [themeColor, setThemeColor] = useState("#3b82f6")
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [myPosts, setMyPosts] = useState<any[]>([])

  // 1. CHARGEMENT (Empêche la disparition au refresh)
  useEffect(() => {
    const saved = {
      posts: localStorage.getItem('ds_posts'),
      user: localStorage.getItem('ds_user'),
      theme: localStorage.getItem('ds_theme'),
      pic: localStorage.getItem('ds_pic')
    }
    if (saved.posts) setMyPosts(JSON.parse(saved.posts))
    if (saved.user) setUsername(saved.user)
    if (saved.theme) setThemeColor(saved.theme)
    if (saved.pic) setProfilePic(saved.pic)
  }, [])

  // 2. SAUVEGARDE
  useEffect(() => {
    localStorage.setItem('ds_posts', JSON.stringify(myPosts))
    localStorage.setItem('ds_user', username)
    localStorage.setItem('ds_theme', themeColor)
    if (profilePic) localStorage.setItem('ds_pic', profilePic)
  }, [myPosts, username, themeColor, profilePic])

  const handlePublish = () => {
    if (postText) {
      const newPost = { id: Date.now(), user: username, content: postText, likes: 0, views: 1 }
      setMyPosts([newPost, ...myPosts]); setActiveTab('home'); setPostText("")
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans overflow-x-hidden">
      
      <main className="max-w-xl mx-auto p-4 pb-40">

        {/* --- RECHERCHE --- */}
        {activeTab === 'search' && (
          <div className="pt-6 animate-in fade-in duration-500">
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher kingdumode04..." 
              className="w-full bg-[#161b22] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-500 mb-8"
            />
            <p className="text-center text-xs text-gray-600 font-black uppercase tracking-widest">Résultats pour "{searchQuery}"</p>
          </div>
        )}

        {/* --- HOME --- */}
        {activeTab === 'home' && (
          <div className="space-y-6 pt-4">
            <h1 className="text-2xl font-black italic uppercase" style={{ color: themeColor }}>DEVSTEP</h1>
            {myPosts.map(post => (
              <div key={post.id} className="bg-[#161b22] rounded-[35px] p-6 border border-white/5 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800">
                    {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px]" style={{ backgroundColor: themeColor }}>{username[0]}</div>}
                  </div>
                  <span className="text-[10px] font-black uppercase opacity-50">@{username}</span>
                </div>
                <p className="text-sm leading-relaxed">{post.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* --- SETTINGS (Dans l'onglet Profil) --- */}
        {activeTab === 'settings' && (
          <div className="pt-10 space-y-8 animate-in zoom-in-95">
            <div className="bg-[#161b22] p-6 rounded-[35px] border border-white/5 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-black/20 mb-4 overflow-hidden border-2 border-dashed border-white/20 flex items-center justify-center">
                {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <Icons.Camera />}
              </div>
              <input type="file" accept="image/*" className="hidden" id="pfp" onChange={(e) => {
                const file = e.target.files?.[0]; if(file) {
                  const reader = new FileReader(); reader.onloadend = () => setProfilePic(reader.result as string); reader.readAsDataURL(file);
                }
              }} />
              <label htmlFor="pfp" className="cursor-pointer text-[9px] font-black uppercase bg-white/5 px-4 py-2 rounded-full">Modifier l'image</label>
            </div>
            <div className="bg-[#161b22] p-6 rounded-[35px] border border-white/5">
              <label className="text-[9px] font-black uppercase text-gray-500 block mb-2">Pseudo</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 outline-none" />
            </div>
            <button onClick={() => setActiveTab('profile')} className="w-full py-4 rounded-2xl font-black uppercase text-[10px] text-white" style={{ backgroundColor: themeColor }}>Enregistrer</button>
          </div>
        )}

        {/* --- PROFIL --- */}
        {activeTab === 'profile' && (
          <div className="pt-10 flex flex-col items-center animate-in slide-in-from-bottom-5">
            <div className="w-24 h-24 rounded-[35px] p-1 mb-4" style={{ backgroundColor: themeColor }}>
              <div className="w-full h-full bg-[#161b22] rounded-[32px] overflow-hidden flex items-center justify-center">
                {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <span className="text-3xl font-black">{username[0]}</span>}
              </div>
            </div>
            <h2 className="text-2xl font-black uppercase italic">{username}</h2>
            <button onClick={() => setActiveTab('settings')} className="mt-4 p-3 bg-white/5 rounded-full"><Icons.Settings /></button>
          </div>
        )}

        {/* --- AJOUTER --- */}
        {activeTab === 'add' && (
          <div className="bg-[#161b22] rounded-[40px] p-8 mt-10 border border-white/5">
            <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Quoi de neuf ?" className="w-full bg-transparent min-h-[150px] outline-none text-lg mb-6" />
            <button onClick={handlePublish} className="w-full py-5 rounded-2xl font-black uppercase text-[10px]" style={{ backgroundColor: themeColor }}>Publier</button>
          </div>
        )}

      </main>

      {/* --- LA NAV BAR COMPLÈTE (5 BOUTONS) --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#161b22]/95 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center z-[100] shadow-2xl">
        <button onClick={() => setActiveTab('home')} className={`p-4 transition-all ${activeTab === 'home' ? 'scale-125' : 'opacity-20'}`} style={{ color: activeTab === 'home' ? themeColor : 'white' }}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className={`p-4 transition-all ${activeTab === 'search' ? 'scale-125' : 'opacity-20'}`} style={{ color: activeTab === 'search' ? themeColor : 'white' }}><Icons.Search /></button>
        <button onClick={() => setActiveTab('add')} className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-xl hover:scale-105 active:scale-90 transition-all" style={{ backgroundColor: themeColor }}>+</button>
        <button onClick={() => setActiveTab('play')} className={`p-4 transition-all ${activeTab === 'play' ? 'scale-125' : 'opacity-20'}`} style={{ color: activeTab === 'play' ? themeColor : 'white' }}><Icons.Play /></button>
        <button onClick={() => setActiveTab('profile')} className={`p-4 transition-all ${activeTab === 'profile' || activeTab === 'settings' ? 'scale-125' : 'opacity-20'}`} style={{ color: (activeTab === 'profile' || activeTab === 'settings') ? themeColor : 'white' }}><Icons.User /></button>
      </div>

    </div>
  )
}