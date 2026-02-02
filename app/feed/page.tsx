"use client"
import { useState, useEffect, useRef } from 'react'

// --- ICONS ---
const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
  Heart: ({ active }: { active?: boolean }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#ff4b63" : "none"} stroke={active ? "#ff4b63" : "currentColor"} strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  Message: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Camera: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Bell: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  Rotate: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
}

export default function FeedPage() {
  // --- ÉTATS AUTH ---
  const [hasId, setHasId] = useState(false)
  const [username, setUsername] = useState("")
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [themeColor, setThemeColor] = useState("#3b82f6")

  // --- ÉTATS FEED & UI ---
  const [activeTab, setActiveTab] = useState('home')
  const [myPosts, setMyPosts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifs, setShowNotifs] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [followers, setFollowers] = useState(0)
  const [isFollowed, setIsFollowed] = useState(false)
  const [showCommentsFor, setShowCommentsFor] = useState<number | null>(null)
  const [commentInput, setCommentInput] = useState("")

  // --- ÉTATS CAMÉRA ---
  const [postText, setPostText] = useState("")
  const [mediaFile, setMediaFile] = useState<string | null>(null)
  const [isReel, setIsReel] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = useState(false)

  // --- PERSISTENCE ---
  useEffect(() => {
    const savedUser = localStorage.getItem('ds_user')
    if (savedUser) {
      setHasId(true)
      setUsername(savedUser)
      setProfilePic(localStorage.getItem('ds_pic'))
      setThemeColor(localStorage.getItem('ds_theme') || "#3b82f6")
      setFollowers(parseInt(localStorage.getItem('ds_fols') || "0"))
      setIsFollowed(localStorage.getItem('ds_isfol') === 'true')
      const posts = localStorage.getItem('ds_posts')
      if (posts) setMyPosts(JSON.parse(posts))
      const notifs = localStorage.getItem('ds_notifs')
      if (notifs) setNotifications(JSON.parse(notifs))
    }
  }, [])

  useEffect(() => {
    if (hasId) {
      localStorage.setItem('ds_user', username)
      localStorage.setItem('ds_theme', themeColor)
      localStorage.setItem('ds_fols', followers.toString())
      localStorage.setItem('ds_isfol', isFollowed.toString())
      localStorage.setItem('ds_posts', JSON.stringify(myPosts))
      localStorage.setItem('ds_notifs', JSON.stringify(notifications))
      if (profilePic) localStorage.setItem('ds_pic', profilePic)
    }
  }, [username, themeColor, followers, isFollowed, profilePic, myPosts, notifications, hasId])

  // --- ACTIONS ---
  const handleFollowToggle = (e: any) => {
    e.stopPropagation()
    if (isFollowed) {
      setFollowers(prev => Math.max(0, prev - 1))
      setIsFollowed(false)
    } else {
      setFollowers(prev => prev + 1)
      setIsFollowed(true)
      setNotifications([{ id: Date.now(), text: "Nouveau follower !" }, ...notifications])
    }
  }

  const toggleLike = (id: number) => {
    setMyPosts(prev => prev.map(p => p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? (p.likes || 1) - 1 : (p.likes || 0) + 1 } : p))
  }

  const addComment = (postId: number) => {
    if (!commentInput.trim()) return
    setMyPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: [...(p.comments || []), { id: Date.now(), text: commentInput, user: username }] } : p))
    setCommentInput("")
  }

  // --- CAMÉRA ---
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) { videoRef.current.srcObject = stream; setIsCameraActive(true); }
    } catch (err) { alert("Accès caméra refusé") }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop())
    setIsCameraActive(false)
  }

  const takePhoto = () => {
    const canvas = document.createElement('canvas')
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth; canvas.height = videoRef.current.videoHeight
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0)
      setMediaFile(canvas.toDataURL('image/png')); setIsReel(false); stopCamera()
    }
  }

  const startRecording = () => {
    const stream = videoRef.current?.srcObject as MediaStream
    const recorder = new MediaRecorder(stream)
    mediaRecorderRef.current = recorder
    const chunks: Blob[] = []
    recorder.ondataavailable = (e) => chunks.push(e.data)
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/mp4' })
      const reader = new FileReader(); reader.onloadend = () => { setMediaFile(reader.result as string); setIsReel(true) }; reader.readAsDataURL(blob)
    }
    recorder.start(); setIsRecording(true)
  }

  const stopRecording = () => { mediaRecorderRef.current?.stop(); setIsRecording(false); stopCamera() }

  const handlePublish = () => {
    const newPost = { id: Date.now(), user: username, content: postText, media: mediaFile, type: isReel ? 'reel' : 'photo', likes: 0, views: 0, isLiked: false, comments: [] }
    setMyPosts([newPost, ...myPosts]); setPostText(""); setMediaFile(null); setActiveTab('home')
  }

  const totalViews = myPosts.reduce((acc, p) => acc + (p.views || 0), 0)
  const totalLikes = myPosts.reduce((acc, p) => acc + (p.likes || 0), 0)

  // --- FILTRE RECHERCHE ---
  const filteredPosts = myPosts.filter(p => p.content.toLowerCase().includes(searchQuery.toLowerCase()) || p.user.toLowerCase().includes(searchQuery.toLowerCase()))

  // --- RENDER : FORMULAIRE ---
  if (!hasId) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center p-6 text-white font-sans">
        <div className="w-full max-w-sm bg-[#161b22] rounded-[40px] p-10 border border-white/5 shadow-2xl animate-in zoom-in-95">
          <h1 className="text-4xl font-black italic mb-2 tracking-tighter" style={{ color: themeColor }}>DEVSTEP</h1>
          <p className="text-sm opacity-40 mb-10 font-black uppercase">Crée ton Identifiant Communauté</p>
          <form onSubmit={(e) => { e.preventDefault(); if(username) setHasId(true) }} className="space-y-6">
            <div className="flex flex-col items-center gap-4">
               <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center relative overflow-hidden">
                 {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <Icons.User />}
                 <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e:any) => {
                   const r = new FileReader(); r.onloadend = () => setProfilePic(r.result as string); r.readAsDataURL(e.target.files[0])
                 }} />
               </div>
            </div>
            <input required placeholder="Ton Pseudo..." value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none font-bold focus:border-blue-500" />
            <button type="submit" className="w-full py-5 rounded-2xl font-black uppercase bg-white text-black">Entrer</button>
          </form>
        </div>
      </div>
    )
  }

  // --- RENDER : APP ---
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      <main className="max-w-xl mx-auto p-4 pb-40">
        
        {/* HEADER */}
        <div className="pt-6 mb-10 flex justify-between items-center relative">
          <button onClick={() => setActiveTab('home')} className="text-3xl font-black italic uppercase" style={{ color: themeColor }}>DEVSTEP</button>
          <div className="flex gap-4 items-center">
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 bg-white/5 rounded-full">
              <Icons.Bell />
              {notifications.length > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>}
            </button>
            <button onClick={() => setActiveTab('settings')} className="p-2 bg-white/5 rounded-full"><Icons.Settings /></button>
          </div>
          {showNotifs && (
            <div className="absolute top-16 right-0 w-64 bg-[#161b22] border border-white/10 rounded-3xl p-5 z-[200] shadow-2xl">
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {notifications.map(n => <div key={n.id} className="text-[11px] bg-white/5 p-3 rounded-xl border-l-2" style={{ borderLeftColor: themeColor }}>{n.text}</div>)}
              </div>
            </div>
          )}
        </div>

        {/* RECHERCHE */}
        {activeTab === 'search' && (
          <div className="space-y-6 animate-in fade-in">
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Chercher un post ou un @identifiant..." className="w-full bg-[#161b22] p-6 rounded-3xl outline-none border border-white/10" />
            <div className="space-y-4">
              {filteredPosts.map(p => (
                <div key={p.id} className="bg-[#161b22]/40 p-5 rounded-3xl flex items-center gap-4 border border-white/5">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl overflow-hidden shrink-0">{p.media && <img src={p.media} className="w-full h-full object-cover" />}</div>
                  <div><p className="font-bold text-sm">@{p.user}</p><p className="text-xs opacity-50">{p.content}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FEED HOME */}
        {activeTab === 'home' && (
          <div className="space-y-10 animate-in fade-in">
            {myPosts.map(post => (
              <div key={post.id} className="bg-[#161b22] rounded-[40px] border border-white/5 overflow-hidden">
                <div className="p-6 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">{profilePic && <img src={profilePic} className="w-full h-full object-cover" />}</div>
                    <span className="font-bold">@{post.user}</span>
                  </div>
                  <button onClick={handleFollowToggle} className={`px-4 py-2 rounded-full text-[10px] font-black ${isFollowed ? 'bg-white/5 text-gray-500' : 'bg-white text-black'}`}>
                    {isFollowed ? 'ABONNÉ' : 'SUIVRE'}
                  </button>
                </div>
                {post.media && (post.type === 'reel' ? <video src={post.media} controls className="w-full" /> : <img src={post.media} className="w-full" />)}
                <div className="p-7">
                  <p className="text-sm mb-6">{post.content}</p>
                  <div className="flex gap-8">
                    <button onClick={() => toggleLike(post.id)}><Icons.Heart active={post.isLiked} /></button>
                    <button onClick={() => setShowCommentsFor(showCommentsFor === post.id ? null : post.id)}><Icons.Message /></button>
                  </div>
                  {showCommentsFor === post.id && (
                    <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                      {post.comments?.map((c: any) => <div key={c.id} className="text-xs bg-white/5 p-3 rounded-xl"><span className="font-bold mr-2">@{c.user}</span> {c.text}</div>)}
                      <div className="flex gap-2">
                        <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder="Commente..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs outline-none" />
                        <button onClick={() => addComment(post.id)} className="p-2 rounded-full" style={{ backgroundColor: themeColor }}>➤</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AJOUTER / CAMÉRA */}
        {activeTab === 'add' && (
          <div className="bg-[#161b22] rounded-[45px] p-8 border border-white/5">
            {!isCameraActive ? (
              <div className="space-y-6">
                <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Quoi de neuf ?" className="w-full bg-transparent outline-none text-2xl font-bold min-h-[120px]" />
                {mediaFile && <div className="rounded-2xl overflow-hidden border border-white/10">{isReel ? <video src={mediaFile} className="w-full h-40 object-cover" /> : <img src={mediaFile} className="w-full h-40 object-cover" />}</div>}
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={startCamera} className="py-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center gap-2"><Icons.Camera /> CAMÉRA</button>
                  <button onClick={handlePublish} className="py-8 rounded-3xl font-black uppercase" style={{ backgroundColor: themeColor }}>PUBLIER</button>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[3/4] bg-black rounded-3xl overflow-hidden">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 items-center px-10">
                   <button onClick={stopCamera} className="p-3 bg-white/10 rounded-full"><Icons.Rotate /></button>
                   <button onClick={takePhoto} className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center"><div className="w-12 h-12 bg-white rounded-full"></div></button>
                   <button onClick={isRecording ? stopRecording : startRecording} className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center ${isRecording ? 'animate-pulse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full bg-red-600 ${isRecording ? 'scale-75' : ''}`}></div>
                   </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROFIL */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in">
            <div className="flex flex-col items-center mb-10">
              <div className="w-28 h-28 rounded-full border-4 border-white/5 p-1 mb-4">
                <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden flex items-center justify-center">
                  {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <span className="text-3xl font-black">{username[0]}</span>}
                </div>
              </div>
              <h2 className="text-2xl font-black italic">@{username}</h2>
            </div>
            <div className="flex justify-center gap-12 mb-10 text-center">
               <div><p className="text-2xl font-black">{totalViews}</p><p className="text-[10px] uppercase opacity-40">Vues</p></div>
               <div><p className="text-2xl font-black">{totalLikes}</p><p className="text-[10px] uppercase opacity-40">Likes</p></div>
               <div onClick={handleFollowToggle} className="cursor-pointer">
                 <p className="text-2xl font-black" style={{ color: themeColor }}>{followers}</p>
                 <p className="text-[10px] uppercase opacity-40">Abonnés</p>
               </div>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {myPosts.map(p => <div key={p.id} className="aspect-[3/4] bg-[#161b22] overflow-hidden">{p.media && (p.type === 'reel' ? <video src={p.media} className="w-full h-full object-cover" /> : <img src={p.media} className="w-full h-full object-cover" />)}</div>)}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-[#161b22] rounded-[40px] p-8 border border-white/5 space-y-6">
            <h2 className="text-xl font-black uppercase">Réglages</h2>
            <div><p className="text-[10px] font-black uppercase opacity-40 mb-2">Pseudo</p><input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none" /></div>
            <div><p className="text-[10px] font-black uppercase opacity-40 mb-2">Couleur Thème</p><input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-full h-12 bg-transparent cursor-pointer" /></div>
            <button onClick={() => setActiveTab('profile')} className="w-full py-4 bg-white text-black rounded-xl font-black uppercase text-xs">Sauvegarder</button>
          </div>
        )}

      </main>

      {/* NAV BAR */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#161b22]/90 backdrop-blur-3xl border border-white/10 rounded-[40px] p-3 flex justify-around items-center z-[100] shadow-2xl">
        <button onClick={() => setActiveTab('home')} className="p-4" style={{ color: activeTab === 'home' ? themeColor : 'white', opacity: activeTab === 'home' ? 1 : 0.3 }}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className="p-4" style={{ color: activeTab === 'search' ? themeColor : 'white', opacity: activeTab === 'search' ? 1 : 0.3 }}><Icons.Search /></button>
        <button onClick={() => { setActiveTab('add'); if(!isCameraActive) startCamera(); }} className="w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white shadow-xl" style={{ backgroundColor: themeColor }}>+</button>
        <button onClick={() => setActiveTab('play')} className="p-4" style={{ color: activeTab === 'play' ? themeColor : 'white', opacity: activeTab === 'play' ? 1 : 0.3 }}><Icons.Play /></button>
        <button onClick={() => setActiveTab('profile')} className="p-4" style={{ color: (activeTab === 'profile' || activeTab === 'settings') ? themeColor : 'white', opacity: (activeTab === 'profile' || activeTab === 'settings') ? 1 : 0.3 }}><Icons.User /></button>
      </div>
    </div>
  )
}