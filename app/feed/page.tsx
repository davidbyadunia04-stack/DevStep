"use client"
import { useState, useEffect } from 'react'

// --- ICONS ---
const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
  Heart: ({ active }: { active?: boolean }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#ff4b63" : "none"} stroke={active ? "#ff4b63" : "currentColor"} strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  Message: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  Camera: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Bell: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
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
  const [searchQuery, setSearchQuery] = useState("")
  const [showCommentsFor, setShowCommentsFor] = useState<number | null>(null)
  const [commentInput, setCommentInput] = useState("")
  
  // États Abonnés et Notifications
  const [followers, setFollowers] = useState(0)
  const [notifications, setNotifications] = useState<any[]>([])
  const [showNotifs, setShowNotifs] = useState(false)
  const [isFollowed, setIsFollowed] = useState(false) // Bloque les abonnements multiples

  useEffect(() => {
    const saved = {
      posts: localStorage.getItem('ds_posts'),
      user: localStorage.getItem('ds_user'),
      theme: localStorage.getItem('ds_theme'),
      pic: localStorage.getItem('ds_pic'),
      fols: localStorage.getItem('ds_fols'),
      notifs: localStorage.getItem('ds_notifs'),
      isfol: localStorage.getItem('ds_isfol')
    }
    if (saved.posts) setMyPosts(JSON.parse(saved.posts))
    if (saved.user) setUsername(saved.user)
    if (saved.theme) setThemeColor(saved.theme)
    if (saved.pic) setProfilePic(saved.pic)
    if (saved.fols) setFollowers(parseInt(saved.fols))
    if (saved.notifs) setNotifications(JSON.parse(saved.notifs))
    if (saved.isfol) setIsFollowed(saved.isfol === 'true')
  }, [])

  useEffect(() => {
    localStorage.setItem('ds_posts', JSON.stringify(myPosts))
    localStorage.setItem('ds_user', username)
    localStorage.setItem('ds_theme', themeColor)
    localStorage.setItem('ds_fols', followers.toString())
    localStorage.setItem('ds_notifs', JSON.stringify(notifications))
    localStorage.setItem('ds_isfol', isFollowed.toString())
    if (profilePic) localStorage.setItem('ds_pic', profilePic)
  }, [myPosts, username, themeColor, profilePic, followers, notifications, isFollowed])

  const addNotification = (text: string) => {
    const newNotif = { id: Date.now(), text, time: 'À l\'instant' }
    setNotifications([newNotif, ...notifications])
  }

  const handleFollow = (e: any) => {
    e.stopPropagation()
    if (!isFollowed) {
      setFollowers(prev => prev + 1)
      setIsFollowed(true)
      addNotification("Un nouvel utilisateur s'est abonné à votre profil ! 🚀")
    }
  }

  const toggleLike = (id: number) => {
    setMyPosts(prev => prev.map(p => 
      p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? (p.likes || 1) - 1 : (p.likes || 0) + 1 } : p
    ))
  }

  const addComment = (postId: number) => {
    if (!commentInput.trim()) return
    setMyPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, comments: [...(p.comments || []), { id: Date.now(), text: commentInput, user: username }] } : p
    ))
    setCommentInput("")
  }

  const handlePublish = () => {
    if (postText || mediaFile) {
      const newPost = {
        id: Date.now(),
        user: username,
        content: postText,
        media: mediaFile,
        type: isReel ? 'reel' : 'photo',
        likes: 0,
        views: 0,
        isLiked: false,
        comments: []
      }
      setMyPosts([newPost, ...myPosts]); setActiveTab('home'); setPostText(""); setMediaFile(null); setIsReel(false)
    }
  }

  const renderText = (text: string) => {
    return text.split(' ').map((word, i) => (
      word.startsWith('#') 
      ? <span key={i} className="font-bold cursor-pointer" style={{ color: themeColor }} onClick={() => { setSearchQuery(word); setActiveTab('search'); }}>{word} </span> 
      : word + ' '
    ))
  }

  const totalViews = myPosts.reduce((acc, p) => acc + (p.views || 0), 0)
  const totalLikes = myPosts.reduce((acc, p) => acc + (p.likes || 0), 0)

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      <main className="max-w-xl mx-auto p-4 pb-40">

        {/* --- HEADER --- */}
        <div className="pt-6 mb-10 flex justify-between items-center relative">
          <a href="https://dev-step.vercel.app/" className="text-3xl font-black italic uppercase" style={{ color: themeColor }}>DEVSTEP</a>
          
          <div className="flex gap-4 items-center">
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <Icons.Bell />
              {notifications.length > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0b0e14]"></span>}
            </button>
            {(activeTab === 'profile' || activeTab === 'settings') && (
              <button onClick={() => setActiveTab('settings')} className="p-2 bg-white/5 rounded-full"><Icons.Settings /></button>
            )}
          </div>

          {/* NOTIFS DROPDOWN */}
          {showNotifs && (
            <div className="absolute top-16 right-0 w-64 bg-[#161b22] border border-white/10 rounded-3xl p-5 z-[200] shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[10px] font-black uppercase opacity-40">Notifications</h3>
                <button onClick={() => setNotifications([])} className="text-[9px] uppercase font-bold opacity-30 hover:opacity-100">Effacer</button>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {notifications.length > 0 ? notifications.map(n => (
                  <div key={n.id} className="text-[11px] bg-white/5 p-3 rounded-xl border-l-2" style={{ borderLeftColor: themeColor }}>{n.text}</div>
                )) : <p className="text-center py-4 text-[10px] opacity-30 italic">Aucune nouveauté</p>}
              </div>
            </div>
          )}
        </div>

        {/* --- RECHERCHE --- */}
        {activeTab === 'search' && (
          <div className="animate-in fade-in">
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher #hashtag..." className="w-full bg-[#161b22] border border-white/10 rounded-2xl py-5 px-6 mb-8 outline-none focus:border-blue-500" />
            <div className="space-y-4">
              {myPosts.filter(p => p.content.toLowerCase().includes(searchQuery.toLowerCase())).map(post => (
                <div key={post.id} className="bg-[#161b22]/40 p-5 rounded-[25px] flex gap-4 items-center">
                   <div className="w-12 h-12 rounded-xl bg-gray-800 overflow-hidden shrink-0">{post.media && <img src={post.media} className="w-full h-full object-cover" />}</div>
                   <div><p className="font-bold text-sm">@{post.user}</p><p className="text-xs opacity-50 truncate">{post.content}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- REELS --- */}
        {activeTab === 'play' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold italic">RÉELS</h2>
            {myPosts.filter(p => p.type === 'reel').map(reel => (
              <div key={reel.id} className="relative aspect-[9/16] bg-black rounded-[50px] overflow-hidden shadow-2xl border border-white/5">
                <video src={reel.media} autoPlay loop muted className="w-full h-full object-cover" />
                
                <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center">
                  <button onClick={() => toggleLike(reel.id)} className="flex flex-col items-center gap-1 active:scale-150 transition-transform">
                    <Icons.Heart active={reel.isLiked} />
                    <span className="text-[10px] font-bold">{reel.likes || 0}</span>
                  </button>
                  <button onClick={() => setShowCommentsFor(reel.id)} className="flex flex-col items-center gap-1">
                    <Icons.Message />
                    <span className="text-[10px] font-bold">{reel.comments?.length || 0}</span>
                  </button>
                  <button 
                    onClick={handleFollow} 
                    disabled={isFollowed}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isFollowed ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
                  >
                    {isFollowed ? <Icons.Check /> : <Icons.Plus />}
                  </button>
                </div>

                <div className="absolute bottom-10 left-8 right-16">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-600">S</div>}
                    </div>
                    <span className="font-black text-lg shadow-black drop-shadow-lg">@{reel.user}</span>
                  </div>
                  <p className="text-sm shadow-black drop-shadow-lg leading-relaxed">{renderText(reel.content)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- HOME FEED --- */}
        {activeTab === 'home' && (
          <div className="space-y-10 animate-in fade-in">
            {myPosts.map(post => (
              <div key={post.id} className="bg-[#161b22] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gray-800 overflow-hidden border-2" style={{ borderColor: themeColor }}>
                      {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold" style={{ backgroundColor: themeColor }}>{username[0]}</div>}
                    </div>
                    <span className="font-bold text-sm">@{post.user}</span>
                  </div>
                  <button 
                    onClick={handleFollow} 
                    disabled={isFollowed}
                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase transition-all flex items-center gap-2 ${isFollowed ? 'bg-white/5 text-gray-500 cursor-default' : 'bg-white text-black hover:scale-105 active:scale-95'}`}
                  >
                    {isFollowed ? <><Icons.Check /> Abonné</> : "S'abonner"}
                  </button>
                </div>

                {post.media && (post.type === 'reel' ? <video src={post.media} controls className="w-full" /> : <img src={post.media} className="w-full" />)}

                <div className="p-7">
                  <div className="text-sm mb-8 leading-relaxed text-gray-200">{renderText(post.content)}</div>
                  <div className="flex gap-10 items-center">
                    <button onClick={() => toggleLike(post.id)} className="flex flex-col items-center gap-2 active:scale-150 transition-transform">
                      <Icons.Heart active={post.isLiked} /><span className="text-[10px] font-black opacity-60">{post.likes || 0}</span>
                    </button>
                    <button onClick={() => setShowCommentsFor(showCommentsFor === post.id ? null : post.id)} className="flex flex-col items-center gap-2">
                      <Icons.Message /><span className="text-[10px] font-black opacity-60">{post.comments?.length || 0}</span>
                    </button>
                  </div>

                  {showCommentsFor === post.id && (
                    <div className="mt-8 pt-6 border-t border-white/5 space-y-4 animate-in slide-in-from-top-2">
                      {post.comments?.map((c: any) => (
                        <div key={c.id} className="text-xs bg-white/5 p-4 rounded-2xl"><span className="font-bold mr-2" style={{ color: themeColor }}>@{c.user}</span> {c.text}</div>
                      ))}
                      <div className="flex gap-3">
                        <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder="Ajouter un commentaire..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs outline-none focus:border-blue-500" />
                        <button onClick={() => addComment(post.id)} className="p-3 rounded-full text-white" style={{ backgroundColor: themeColor }}>➤</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PROFIL --- */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col items-center mb-12">
              <div className="w-28 h-28 rounded-full p-1 mb-6 shadow-2xl" style={{ backgroundColor: themeColor }}>
                <div className="w-full h-full bg-[#161b22] rounded-full overflow-hidden flex items-center justify-center border-4 border-[#0b0e14]">
                  {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <span className="text-4xl font-black">{username[0]}</span>}
                </div>
              </div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">@{username}</h2>
            </div>
            
            <div className="flex justify-center gap-10 mb-12 text-center">
               <div className="px-4"><p className="text-2xl font-black">{totalViews}</p><p className="text-[9px] uppercase text-gray-500 font-black tracking-widest">Vues</p></div>
               <div className="px-4"><p className="text-2xl font-black">{totalLikes}</p><p className="text-[9px] uppercase text-gray-500 font-black tracking-widest">Likes</p></div>
               <div className="px-4"><p className="text-2xl font-black" style={{ color: themeColor }}>{followers}</p><p className="text-[9px] uppercase text-gray-500 font-black tracking-widest">Abonnés</p></div>
            </div>

            <div className="grid grid-cols-3 gap-1 rounded-3xl overflow-hidden border border-white/5 bg-white/5 p-1">
              {myPosts.map(p => (
                <div key={p.id} className="aspect-[3/4] bg-[#0b0e14] relative overflow-hidden group">
                  {p.media ? (p.type === 'reel' ? <video src={p.media} className="w-full h-full object-cover" /> : <img src={p.media} className="w-full h-full object-cover" />) : <div className="p-3 text-[8px] opacity-20">{p.content}</div>}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-[11px] font-black drop-shadow-md"><Icons.Eye /> {p.views || 0}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- AJOUTER --- */}
        {activeTab === 'add' && (
          <div className="bg-[#161b22] rounded-[45px] p-10 mt-6 border border-white/5">
            <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Exprimez-vous... #dev #step" className="w-full bg-transparent min-h-[150px] outline-none text-xl mb-8" />
            <div className="border-2 border-dashed border-white/10 rounded-[30px] p-12 mb-10 text-center relative hover:bg-white/5 transition-all">
               <input type="file" accept="image/*,video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e: any) => {
                 const file = e.target.files?.[0]; if(file) {
                   const reader = new FileReader(); reader.onloadend = () => { setMediaFile(reader.result as string); setIsReel(file.type.includes('video')) }; reader.readAsDataURL(file);
                 }
               }} />
               <p className="text-xs font-black uppercase tracking-widest opacity-30">{mediaFile ? "Média prêt ✅" : "Photo / Vidéo"}</p>
            </div>
            <button onClick={handlePublish} className="w-full py-6 rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-xl" style={{ backgroundColor: themeColor }}>Publier</button>
          </div>
        )}

        {/* --- SETTINGS --- */}
        {activeTab === 'settings' && (
          <div className="bg-[#161b22] rounded-[40px] p-10 border border-white/5 space-y-8 animate-in zoom-in-95">
            <h2 className="text-xl font-black uppercase tracking-widest">Réglages</h2>
            <div className="flex flex-col items-center gap-4 py-4 border-b border-white/5">
              <div className="w-20 h-20 rounded-full bg-gray-800 overflow-hidden relative border-2 border-dashed border-white/20">
                {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-30"><Icons.Camera /></div>}
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e: any) => {
                  const file = e.target.files?.[0]; if(file) {
                    const reader = new FileReader(); reader.onloadend = () => setProfilePic(reader.result as string); reader.readAsDataURL(file);
                  }
                }} />
              </div>
              <p className="text-[10px] font-black uppercase opacity-60">Changer ma photo</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase opacity-40 mb-4">Nom d'utilisateur</p>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase opacity-40 mb-4">Couleur du thème</p>
              <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-full h-16 rounded-2xl bg-transparent cursor-pointer" />
            </div>
            <div className="space-y-4">
              <button onClick={() => setActiveTab('profile')} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px]">Sauvegarder</button>
              <p className="text-center text-[11px] font-bold italic opacity-70" style={{ color: themeColor }}>Bientôt des nouveaux thèmes PREMIUM seront dispo.</p>
            </div>
          </div>
        )}

      </main>

      {/* --- NAV BAR --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#161b22]/90 backdrop-blur-3xl border border-white/10 rounded-[40px] p-3 flex justify-around items-center z-[100] shadow-2xl">
        <button onClick={() => setActiveTab('home')} className="p-4 transition-all" style={{ color: activeTab === 'home' ? themeColor : 'white', opacity: activeTab === 'home' ? 1 : 0.3 }}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className="p-4 transition-all" style={{ color: activeTab === 'search' ? themeColor : 'white', opacity: activeTab === 'search' ? 1 : 0.3 }}><Icons.Search /></button>
        <button onClick={() => setActiveTab('add')} className="w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white shadow-xl active:scale-90" style={{ backgroundColor: themeColor }}>+</button>
        <button onClick={() => setActiveTab('play')} className="p-4 transition-all" style={{ color: activeTab === 'play' ? themeColor : 'white', opacity: activeTab === 'play' ? 1 : 0.3 }}><Icons.Play /></button>
        <button onClick={() => setActiveTab('profile')} className="p-4 transition-all" style={{ color: (activeTab === 'profile' || activeTab === 'settings') ? themeColor : 'white', opacity: (activeTab === 'profile' || activeTab === 'settings') ? 1 : 0.3 }}><Icons.User /></button>
      </div>
    </div>
  )
}