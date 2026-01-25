"use client"
import { useState, useEffect } from 'react'

const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
  Heart: ({ active }: { active?: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#ff4b63" : "none"} stroke={active ? "#ff4b63" : "currentColor"} strokeWidth="2">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  Message: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
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
  
  // États pour les commentaires
  const [showCommentsFor, setShowCommentsFor] = useState<number | null>(null)
  const [commentInput, setCommentInput] = useState("")

  // Persistence
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
        views: Math.floor(Math.random() * 10), // Simule quelques vues au début
        isLiked: false,
        comments: []
      }
      setMyPosts([newPost, ...myPosts]); setActiveTab('home'); setPostText(""); setMediaFile(null); setIsReel(false)
    }
  }

  const addComment = (postId: number) => {
    if (!commentInput.trim()) return
    setMyPosts(myPosts.map(p => 
      p.id === postId ? { ...p, comments: [...(p.comments || []), { id: Date.now(), text: commentInput, user: username }] } : p
    ))
    setCommentInput("")
  }

  const toggleLike = (id: number) => {
    setMyPosts(myPosts.map(p => 
      p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p
    ))
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white">
      <main className="max-w-xl mx-auto p-4 pb-40">

        {/* --- HOME FEED --- */}
        {activeTab === 'home' && (
          <div className="space-y-8 pt-4">
            <h1 className="text-2xl font-black italic uppercase" style={{ color: themeColor }}>DEVSTEP</h1>
            {myPosts.map(post => (
              <div key={post.id} className="bg-[#161b22] rounded-[35px] border border-white/5 overflow-hidden">
                <div className="p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden">
                    {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold" style={{ backgroundColor: themeColor }}>{username[0]}</div>}
                  </div>
                  <span className="font-bold text-sm">@{post.user}</span>
                </div>

                {post.media && (
                  post.type === 'reel' 
                  ? <video src={post.media} controls className="w-full h-auto max-h-[500px] object-cover" />
                  : <img src={post.media} className="w-full h-auto max-h-[500px] object-cover" />
                )}

                <div className="p-6">
                  <p className="text-sm mb-6">{post.content}</p>
                  <div className="flex gap-8 items-center mb-4">
                    <button onClick={() => toggleLike(post.id)} className="flex flex-col items-center gap-1"><Icons.Heart active={post.isLiked} /><span className="text-[10px] font-bold">{post.likes}</span></button>
                    <button onClick={() => setShowCommentsFor(showCommentsFor === post.id ? null : post.id)} className="flex flex-col items-center gap-1"><Icons.Message /><span className="text-[10px] font-bold">{post.comments?.length || 0}</span></button>
                  </div>
                  
                  {/* Section Commentaires */}
                  {showCommentsFor === post.id && (
                    <div className="mt-4 pt-4 border-t border-white/5 space-y-3 animate-in slide-in-from-top-2">
                      {post.comments?.map((c: any) => (
                        <div key={c.id} className="text-xs bg-white/5 p-3 rounded-2xl">
                          <span className="font-bold text-blue-400 mr-2">@{c.user}</span> {c.text}
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder="Ajouter un commentaire..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs outline-none focus:border-blue-500" />
                        <button onClick={() => addComment(post.id)} className="p-2 rounded-full" style={{ backgroundColor: themeColor }}>➤</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PROFIL STYLE TIKTOK --- */}
        {activeTab === 'profile' && (
          <div className="pt-8">
            <div className="flex justify-end mb-6"><button onClick={() => setActiveTab('settings')} className="p-2 bg-white/5 rounded-full"><Icons.Settings /></button></div>
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full p-1 mb-4 shadow-2xl" style={{ backgroundColor: themeColor }}>
                <div className="w-full h-full bg-[#161b22] rounded-full overflow-hidden flex items-center justify-center border-4 border-[#0b0e14]">
                  {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <span className="text-3xl font-black">{username[0]}</span>}
                </div>
              </div>
              <h2 className="text-xl font-bold italic">@{username}</h2>
            </div>
            
            {/* Stats globales */}
            <div className="flex justify-center gap-12 mb-10 text-center">
               <div><p className="text-xl font-black">{totalViews}</p><p className="text-[9px] uppercase text-gray-500 font-bold">Vues</p></div>
               <div><p className="text-xl font-black">{totalLikes}</p><p className="text-[9px] uppercase text-gray-500 font-bold">Likes</p></div>
            </div>

            {/* GRILLE TIKTOK STYLE */}
            <div className="grid grid-cols-3 gap-1">
              {myPosts.map(p => (
                <div key={p.id} className="aspect-[3/4] bg-[#161b22] relative overflow-hidden group">
                  {p.media ? (
                    p.type === 'reel' 
                    ? <video src={p.media} className="w-full h-full object-cover" />
                    : <img src={p.media} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-2 text-[8px] text-center opacity-40">{p.content}</div>
                  )}
                  {/* Overlay avec les vues */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-[10px] font-bold shadow-black drop-shadow-lg">
                    <Icons.Eye /> {p.views}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- AJOUTER --- */}
        {activeTab === 'add' && (
          <div className="bg-[#161b22] rounded-[40px] p-8 mt-10 border border-white/5">
            <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Une vidéo ? Une photo ?" className="w-full bg-transparent min-h-[120px] outline-none text-lg mb-6" />
            <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 mb-6 text-center relative hover:bg-white/5 transition-all">
               <input type="file" accept="image/*,video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e: any) => {
                 const file = e.target.files?.[0]; if(file) {
                   const reader = new FileReader(); reader.onloadend = () => { setMediaFile(reader.result as string); if(file.type.includes('video')) setIsReel(true); }; reader.readAsDataURL(file);
                 }
               }} />
               <p className="text-xs font-bold opacity-40">{mediaFile ? "Média sélectionné ✅" : "Ajouter Photo ou Vidéo"}</p>
            </div>
            <button onClick={handlePublish} className="w-full py-5 rounded-2xl font-black uppercase text-[10px]" style={{ backgroundColor: themeColor }}>Publier maintenant</button>
          </div>
        )}

      </main>

      {/* --- NAV BAR 5 BOUTONS --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#161b22]/95 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center z-[100] shadow-2xl">
        <button onClick={() => setActiveTab('home')} className="p-4" style={{ color: activeTab === 'home' ? themeColor : 'white', opacity: activeTab === 'home' ? 1 : 0.2 }}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className="p-4" style={{ color: activeTab === 'search' ? themeColor : 'white', opacity: activeTab === 'search' ? 1 : 0.2 }}><Icons.Search /></button>
        <button onClick={() => setActiveTab('add')} className="w-14 h-14 rounded-full flex items-center justify-center text-3xl text-white" style={{ backgroundColor: themeColor }}>+</button>
        <button onClick={() => setActiveTab('play')} className="p-4" style={{ color: activeTab === 'play' ? themeColor : 'white', opacity: activeTab === 'play' ? 1 : 0.2 }}><Icons.Play /></button>
        <button onClick={() => setActiveTab('profile')} className="p-4" style={{ color: (activeTab === 'profile' || activeTab === 'settings') ? themeColor : 'white', opacity: (activeTab === 'profile' || activeTab === 'settings') ? 1 : 0.2 }}><Icons.User /></button>
      </div>
    </div>
  )
}