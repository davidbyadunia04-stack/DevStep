"use client"
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

// --- TYPES ---
interface Post {
  id: number;
  user: string;
  content: string;
  likes: number;
  views: number;
  isLiked: boolean;
}

interface Reel {
  id: number;
  user: string;
  caption: string;
  likes: number;
  views: number;
  isLiked: boolean;
  videoUrl: string | null;
}

const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
  Camera: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [postText, setPostText] = useState("")
  
  // --- ÉTATS PERSOS (Mémoire) ---
  const [username, setUsername] = useState("Shoncs")
  const [themeColor, setThemeColor] = useState("#3b82f6")
  const [profilePic, setProfilePic] = useState<string | null>(null)

  const [myPosts, setMyPosts] = useState<Post[]>([])

  // CHARGEMENT
  useEffect(() => {
    const savedPosts = localStorage.getItem('ds_posts')
    const savedName = localStorage.getItem('ds_user')
    const savedTheme = localStorage.getItem('ds_theme')
    const savedPic = localStorage.getItem('ds_pic')

    if (savedPosts) setMyPosts(JSON.parse(savedPosts))
    if (savedName) setUsername(savedName)
    if (savedTheme) setThemeColor(savedTheme)
    if (savedPic) setProfilePic(savedPic)
  }, [])

  // SAUVEGARDE
  useEffect(() => {
    localStorage.setItem('ds_posts', JSON.stringify(myPosts))
    localStorage.setItem('ds_user', username)
    localStorage.setItem('ds_theme', themeColor)
    if (profilePic) localStorage.setItem('ds_pic', profilePic)
  }, [myPosts, username, themeColor, profilePic])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePic(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePublish = () => {
    if (postText) {
      const newPost: Post = { id: Date.now(), user: username, content: postText, likes: 0, views: 0, isLiked: false }
      setMyPosts([newPost, ...myPosts]); setActiveTab('home'); setPostText("")
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      
      <main className="max-w-xl mx-auto p-4 pb-32">

        {/* --- PROFIL --- */}
        {activeTab === 'profile' && (
          <div className="animate-in slide-in-from-bottom-10">
            <div className="flex justify-end pt-4">
              <button onClick={() => setActiveTab('settings')} className="p-2 bg-white/5 rounded-full text-gray-400"><Icons.Settings /></button>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-[35px] p-1 mb-4 shadow-xl relative" style={{ backgroundColor: themeColor }}>
                <div className="w-full h-full bg-[#161b22] rounded-[32px] overflow-hidden flex items-center justify-center">
                  {profilePic ? (
                    <img src={profilePic} alt="Profil" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black">{username[0]}</span>
                  )}
                </div>
              </div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">{username}</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8 text-center">
              <div className="bg-[#161b22] p-5 rounded-[30px] border border-white/5">
                <p className="text-[9px] font-black uppercase text-gray-500 mb-1">Posts</p>
                <p className="text-xl font-bold">{myPosts.length}</p>
              </div>
              <div className="bg-[#161b22] p-5 rounded-[30px] border border-white/5">
                <p className="text-[9px] font-black uppercase text-gray-500 mb-1">Points</p>
                <p className="text-xl font-bold">{myPosts.length * 10}</p>
              </div>
            </div>
          </div>
        )}

        {/* --- PARAMÈTRES (PHOTO + PSEUDO + THÈME) --- */}
        {activeTab === 'settings' && (
          <div className="animate-in zoom-in-95 pt-10">
            <h2 className="text-xl font-black uppercase italic mb-8" style={{ color: themeColor }}>Paramètres</h2>
            
            <div className="space-y-6">
              {/* Changement Photo */}
              <div className="bg-[#161b22] p-6 rounded-[35px] border border-white/5 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-black/20 mb-4 flex items-center justify-center overflow-hidden border-2 border-dashed border-white/20">
                   {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <Icons.Camera />}
                </div>
                <label className="cursor-pointer bg-white/5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  Changer la photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              {/* Pseudo */}
              <div className="bg-[#161b22] p-6 rounded-[35px] border border-white/5">
                <label className="text-[10px] font-black uppercase text-gray-500 block mb-4">Ton pseudo</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 outline-none" />
              </div>

              {/* Thème */}
              <div className="bg-[#161b22] p-6 rounded-[35px] border border-white/5">
                <label className="text-[10px] font-black uppercase text-gray-500 block mb-4">Couleur DEVSTEP</label>
                <div className="flex justify-between">
                   {['#3b82f6', '#ef4444', '#10b981', '#a855f7', '#f59e0b'].map(c => (
                     <button key={c} onClick={() => setThemeColor(c)} className={`w-10 h-10 rounded-full ${themeColor === c ? 'ring-4 ring-white' : ''}`} style={{ backgroundColor: c }} />
                   ))}
                </div>
              </div>

              <button onClick={() => setActiveTab('profile')} className="w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] text-white shadow-xl" style={{ backgroundColor: themeColor }}>Enregistrer</button>
            </div>
          </div>
        )}

        {/* --- HOME --- */}
        {activeTab === 'home' && (
          <div className="space-y-6 pt-4">
            <h1 className="text-2xl font-black italic uppercase" style={{ color: themeColor }}>DEVSTEP</h1>
            {myPosts.length === 0 && <p className="text-center py-20 opacity-20 font-black uppercase text-xs">Ton fil est vide</p>}
            {myPosts.map(post => (
              <div key={post.id} className="bg-[#161b22] rounded-[35px] p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-white/5">
                    {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] font-black" style={{ backgroundColor: themeColor }}>{username[0]}</div>}
                  </div>
                  <span className="text-[10px] font-black uppercase italic opacity-50">@{username}</span>
                </div>
                <p className="text-sm leading-relaxed">{post.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="bg-[#161b22] rounded-[40px] p-8 mt-10 shadow-2xl border border-white/5">
            <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Partage ton inspiration..." className="w-full bg-transparent min-h-[150px] outline-none text-lg resize-none mb-6" />
            <button onClick={handlePublish} className="w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl" style={{ backgroundColor: themeColor }}>Publier</button>
          </div>
        )}
      </main>

      {/* NAV BAR */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center z-[100] shadow-2xl">
        <button onClick={() => setActiveTab('home')} className="p-4 transition-all" style={{ color: activeTab === 'home' ? themeColor : '#333' }}><Icons.Home /></button>
        <button onClick={() => setActiveTab('add')} className="w-14 h-14 rounded-full flex items-center justify-center text-3xl font-light shadow-xl" style={{ backgroundColor: themeColor }}>+</button>
        <button onClick={() => setActiveTab('profile')} className="p-4 transition-all" style={{ color: activeTab === 'profile' || activeTab === 'settings' ? themeColor : '#333' }}><Icons.User /></button>
      </div>
    </div>
  )
}