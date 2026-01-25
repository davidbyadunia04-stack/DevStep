"use client"
import { useState, useEffect } from 'react'

const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
  Heart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  Eye: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [postText, setPostText] = useState("")
  const [mediaFile, setMediaFile] = useState<string | null>(null)
  const [isReel, setIsReel] = useState(false)
  const [username, setUsername] = useState("Shoncs")
  const [themeColor, setThemeColor] = useState("#3b82f6")
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [myPosts, setMyPosts] = useState<any[]>([])

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

  useEffect(() => {
    localStorage.setItem('ds_posts', JSON.stringify(myPosts))
    localStorage.setItem('ds_user', username)
    localStorage.setItem('ds_theme', themeColor)
    if (profilePic) localStorage.setItem('ds_pic', profilePic)
  }, [myPosts, username, themeColor, profilePic])

  // Stats réelles basées sur tes posts
  const totalViews = myPosts.reduce((acc, p) => acc + (p.views || 0), 0)
  const totalLikes = myPosts.reduce((acc, p) => acc + (p.likes || 0), 0)

  const handlePublish = () => {
    if (postText || mediaFile) {
      const newPost = {
        id: Date.now(),
        user: username,
        content: postText,
        media: mediaFile,
        type: isReel ? 'reel' : 'photo',
        likes: 0,
        views: 1
      }
      setMyPosts([newPost, ...myPosts])
      setActiveTab('home')
      setPostText(""); setMediaFile(null); setIsReel(false)
    }
  }

  const handleFileUpload = (e: any, type: 'pfp' | 'post') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === 'pfp') setProfilePic(reader.result as string)
        else {
          setMediaFile(reader.result as string)
          if (file.type.includes('video')) setIsReel(true)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      <main className="max-w-xl mx-auto p-4 pb-40">

        {/* --- PROFIL AVEC STATS RÉELLES --- */}
        {activeTab === 'profile' && (
          <div className="animate-in slide-in-from-bottom-10 pt-6">
            <div className="flex justify-end mb-4">
              <button onClick={() => setActiveTab('settings')} className="p-2 bg-white/5 rounded-full"><Icons.Settings /></button>
            </div>
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-[35px] p-1 mb-4" style={{ backgroundColor: themeColor }}>
                <div className="w-full h-full bg-[#161b22] rounded-[32px] overflow-hidden flex items-center justify-center">
                  {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <span className="text-3xl font-black">{username[0]}</span>}
                </div>
              </div>
              <h2 className="text-2xl font-black uppercase italic">{username}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-[#161b22] p-5 rounded-[30px] border border-white/5">
                <div className="flex items-center gap-2 text-gray-500 mb-1"><Icons.Eye /> <span className="text-[9px] font-black uppercase">Vues</span></div>
                <p className="text-xl font-bold">{totalViews}</p>
              </div>
              <div className="bg-[#161b22] p-5 rounded-[30px] border border-white/5">
                <div className="flex items-center gap-2 text-gray-500 mb-1"><Icons.Heart /> <span className="text-[9px] font-black uppercase">Likes</span></div>
                <p className="text-xl font-bold">{totalLikes}</p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest">Mes Posts</h3>
              {myPosts.map(p => (
                <div key={p.id} className="bg-[#161b22]/50 p-4 rounded-3xl flex justify-between items-center border border-white/5 text-xs">
                  <span className="truncate max-w-[150px]">{p.content || "Média"}</span>
                  <span className="font-black text-blue-400">{p.views} 👀</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- AJOUTER (VIDEO/PHOTO/TEXTE) --- */}
        {activeTab === 'add' && (
          <div className="bg-[#161b22] rounded-[40px] p-8 mt-10 border border-white/5 shadow-2xl">
            <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Quoi de neuf ?" className="w-full bg-transparent min-h-[120px] outline-none text-lg mb-6" />
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 mb-6 text-center relative">
              <input type="file" accept="image/*,video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'post')} />
              <p className="text-[10px] font-black uppercase text-gray-500">{mediaFile ? "Média prêt !" : "Ajouter Photo ou Vidéo"}</p>
            </div>
            <button onClick={handlePublish} className="w-full py-5 rounded-2xl font-black uppercase text-[10px] text-white" style={{ backgroundColor: themeColor }}>Publier</button>
          </div>
        )}

        {/* --- PARAMÈTRES --- */}
        {activeTab === 'settings' && (
          <div className="pt-10 space-y-6 animate-in zoom-in-95">
            <div className="bg-[#161b22] p-6 rounded-[35px] border border-white/5">
               <label className="text-[9px] font-black uppercase text-gray-500 block mb-4">Photo de profil</label>
               <input type="file" onChange={(e) => handleFileUpload(e, 'pfp')} className="text-xs" />
            </div>
            <div className="bg-[#161b22] p-6 rounded-[35px] border border-white/5">
               <label className="text-[9px] font-black uppercase text-gray-500 block mb-2">Pseudo</label>
               <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 outline-none" />
            </div>
            <button onClick={() => setActiveTab('profile')} className="w-full py-4 rounded-2xl font-black uppercase text-[10px] text-white" style={{ backgroundColor: themeColor }}>Sauvegarder</button>
          </div>
        )}

        {/* --- HOME --- */}
        {activeTab === 'home' && (
          <div className="space-y-6 pt-4">
            <h1 className="text-2xl font-black italic uppercase" style={{ color: themeColor }}>DEVSTEP</h1>
            {myPosts.map(post => (
              <div key={post.id} className="bg-[#161b22] rounded-[35px] p-6 border border-white/5 shadow-xl">
                <p className="text-[10px] font-black uppercase italic mb-4 opacity-30">@{post.user}</p>
                {post.media && (
                  post.type === 'reel' 
                  ? <video src={post.media} controls className="w-full rounded-2xl mb-4" />
                  : <img src={post.media} className="w-full rounded-2xl mb-4" />
                )}
                <p className="text-sm">{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- BARRE DE NAVIGATION 5 BOUTONS --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#161b22]/95 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center z-[100] shadow-2xl">
        <button onClick={() => setActiveTab('home')} className="p-4" style={{ color: activeTab === 'home' ? themeColor : 'white', opacity: activeTab === 'home' ? 1 : 0.3 }}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className="p-4" style={{ color: activeTab === 'search' ? themeColor : 'white', opacity: activeTab === 'search' ? 1 : 0.3 }}><Icons.Search /></button>
        <button onClick={() => setActiveTab('add')} className="w-14 h-14 rounded-full flex items-center justify-center text-3xl text-white shadow-xl" style={{ backgroundColor: themeColor }}>+</button>
        <button onClick={() => setActiveTab('play')} className="p-4" style={{ color: activeTab === 'play' ? themeColor : 'white', opacity: activeTab === 'play' ? 1 : 0.3 }}><Icons.Play /></button>
        <button onClick={() => setActiveTab('profile')} className="p-4" style={{ color: (activeTab === 'profile' || activeTab === 'settings') ? themeColor : 'white', opacity: (activeTab === 'profile' || activeTab === 'settings') ? 1 : 0.3 }}><Icons.User /></button>
      </div>
    </div>
  )
}