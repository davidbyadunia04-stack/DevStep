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
  ArrowLeft: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  UserPlus: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>,
  Rotate: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
}

export default function FeedPage() {
  // --- AUTH & USER ---
  const [hasId, setHasId] = useState(false)
  const [username, setUsername] = useState("")
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [themeColor, setThemeColor] = useState("#3b82f6")

  // --- APP STATE ---
  const [activeTab, setActiveTab] = useState('home')
  const [myPosts, setMyPosts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifs, setShowNotifs] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [followers, setFollowers] = useState(0)
  const [isFollowed, setIsFollowed] = useState(false)
  const [showCommentsFor, setShowCommentsFor] = useState<number | null>(null)
  const [commentInput, setCommentInput] = useState("")

  // --- CAMERA STATE ---
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
      setHasId(true); setUsername(savedUser); setProfilePic(localStorage.getItem('ds_pic'));
      setThemeColor(localStorage.getItem('ds_theme') || "#3b82f6");
      setFollowers(parseInt(localStorage.getItem('ds_fols') || "0"));
      setIsFollowed(localStorage.getItem('ds_isfol') === 'true');
      const posts = localStorage.getItem('ds_posts'); if (posts) setMyPosts(JSON.parse(posts));
      const notifs = localStorage.getItem('ds_notifs'); if (notifs) setNotifications(JSON.parse(notifs));
    }
  }, [])

  useEffect(() => {
    if (hasId) {
      localStorage.setItem('ds_user', username); localStorage.setItem('ds_theme', themeColor);
      localStorage.setItem('ds_fols', followers.toString()); localStorage.setItem('ds_isfol', isFollowed.toString());
      localStorage.setItem('ds_posts', JSON.stringify(myPosts)); localStorage.setItem('ds_notifs', JSON.stringify(notifications));
      if (profilePic) localStorage.setItem('ds_pic', profilePic)
    }
  }, [username, themeColor, followers, isFollowed, profilePic, myPosts, notifications, hasId])

  // --- ACTIONS ---
  const backToHome = () => { setActiveTab('home'); stopCamera(); setPostText(""); setMediaFile(null); setShowNotifs(false); setSearchQuery(""); }

  const handleFollowToggle = (e: any) => {
    e.stopPropagation(); if (isFollowed) { setFollowers(prev => Math.max(0, prev - 1)); setIsFollowed(false); } 
    else { setFollowers(prev => prev + 1); setIsFollowed(true); setNotifications([{ id: Date.now(), text: "Nouveau follower !" }, ...notifications]); }
  }

  const toggleLike = (id: number) => {
    setMyPosts(prev => prev.map(p => p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? (p.likes || 1) - 1 : (p.likes || 0) + 1 } : p))
  }

  const addComment = (postId: number) => {
    if (!commentInput.trim()) return
    setMyPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: [...(p.comments || []), { id: Date.now(), text: commentInput, user: username }] } : p))
    setCommentInput("")
  }

  // --- CAMERA LOGIC ---
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
    const recorder = new MediaRecorder(stream); mediaRecorderRef.current = recorder; const chunks: Blob[] = []
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
    setMyPosts([newPost, ...myPosts]); backToHome()
  }

  const totalViews = myPosts.reduce((acc, p) => acc + (p.views || 0), 0)
  const totalLikes = myPosts.reduce((acc, p) => acc + (p.likes || 0), 0)
  const filteredPosts = myPosts.filter(p => p.content.toLowerCase().includes(searchQuery.toLowerCase()) || p.user.toLowerCase().includes(searchQuery.toLowerCase()))

  // --- RENDER : FORMULAIRE D'ACCÈS ---
  if (!hasId) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center p-6 text-white font-sans">
        <div className="w-full max-w-sm bg-[#161b22] rounded-[40px] p-10 border border-white/5 shadow-2xl animate-in zoom-in-95 text-center">
          <h1 className="text-4xl font-black italic mb-2 tracking-tighter text-blue-500">DEVSTEP</h1>
          <p className="text-xs opacity-40 mb-10 font-black uppercase tracking-widest">Créer ton Identifiant Spécial</p>
          <form onSubmit={(e) => { e.preventDefault(); if(username) setHasId(true) }} className="space-y-6 text-left">
            <div className="flex flex-col items-center gap-4">
               <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center relative overflow-hidden">
                 {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <Icons.User />}
                 <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e:any) => {
                   const r = new FileReader(); r.onloadend = () => setProfilePic(r.result as string); r.readAsDataURL(e.target.files[0])
                 }} />
               </div>
            </div>
            <input required placeholder="Pseudo unique..." value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none font-bold" />
            <button type="submit" className="w-full py-5 rounded-2xl font-black uppercase bg-white text-black shadow-lg">Lancer l'aventure</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      <main className="max-w-xl mx-auto p-4 pb-40">
        
        {/* HEADER AVEC NOUVEAU BOUTON RECHERCHE AMI */}
        <div className="pt-6 mb-10 flex justify-between items-center relative">
          <button onClick={backToHome} className="text-3xl font-black italic uppercase transition-all active:scale-95" style={{ color: themeColor }}>DEVSTEP</button>
          
          <div className="flex gap-3 items-center">
            {/* Bouton Recherche Ami */}
            <button 
              onClick={() => setActiveTab('search')} 
              className="p-2.5 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
              title="Chercher des amis"
            >
              <Icons.UserPlus />
            </button>

            {/* Notifications */}
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2.5 bg-white/5 rounded-full border border-white/10">
              <Icons.Bell />
              {notifications.length > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0b0e14]"></span>}
            </button>
          </div>

          {showNotifs && (
            <div className="absolute top-16 right-0 w-64 bg-[#161b22] border border-white/10 rounded-3xl p-5 z-[200] shadow-2xl animate-in slide-in-from-top-2">
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {notifications.length > 0 ? notifications.map(n => <div key={n.id} className="text-[11px] bg-white/5 p-3 rounded-xl border-l-2" style={{ borderLeftColor: themeColor }}>{n.text}</div>) : <p className="text-[10px] opacity-20 text-center">Pas de notifs</p>}
              </div>
            </div>
          )}
        </div>

        {/* FEED HOME (Vérification et affichage du flux) */}
        {activeTab === 'home' && (
          <div className="space-y-10 animate-in fade-in">
            {myPosts.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 opacity-20">
                  <Icons.Plus />
                </div>
                <p className="text-sm font-black uppercase tracking-widest opacity-20">Le sanctuaire est vide</p>
                <button onClick={() => {setActiveTab('add'); startCamera();}} className="mt-6 text-[10px] font-black uppercase py-3 px-6 rounded-full border border-white/10 opacity-40 hover:opacity-100 transition-opacity">Poster mon premier chef-d'œuvre</button>
              </div>
            ) : (
              myPosts.map(post => (
                <div key={post.id} className="bg-[#161b22] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
                  <div className="p-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-white/10">
                        {profilePic && <img src={profilePic} className="w-full h-full object-cover" />}
                      </div>
                      <span className="font-bold text-sm">@{post.user}</span>
                    </div>
                    <button onClick={handleFollowToggle} className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest ${isFollowed ? 'bg-white/5 text-gray-500' : 'bg-white text-black'}`}>
                      {isFollowed ? 'ABONNÉ' : 'SUIVRE'}
                    </button>
                  </div>
                  
                  {post.media && (
                    <div className="relative w-full bg-black flex items-center justify-center">
                      {post.type === 'reel' ? (
                        <video src={post.media} controls className="w-full max-h-[500px] object-contain" />
                      ) : (
                        <img src={post.media} className="w-full max-h-[500px] object-contain" />
                      )}
                    </div>
                  )}

                  <div className="p-7">
                    <p className="text-sm mb-6 font-medium leading-relaxed">{post.content}</p>
                    <div className="flex gap-8">
                      <button onClick={() => toggleLike(post.id)} className="flex items-center gap-2 group">
                        <Icons.Heart active={post.isLiked} />
                        <span className={`text-xs font-bold ${post.isLiked ? 'text-red-500' : 'opacity-30'}`}>{post.likes}</span>
                      </button>
                      <button onClick={() => setShowCommentsFor(showCommentsFor === post.id ? null : post.id)} className="flex items-center gap-2">
                        <Icons.Message />
                        <span className="text-xs font-bold opacity-30">{post.comments?.length || 0}</span>
                      </button>
                    </div>

                    {showCommentsFor === post.id && (
                      <div className="mt-6 pt-6 border-t border-white/5 space-y-4 animate-in slide-in-from-bottom-2">
                        {post.comments?.map((c: any) => (
                          <div key={c.id} className="text-xs bg-white/5 p-4 rounded-2xl flex flex-col gap-1">
                            <span className="font-black text-blue-400">@{c.user}</span>
                            <span className="opacity-80">{c.text}</span>
                          </div>
                        ))}
                        <div className="flex gap-3 mt-2">
                          <input 
                            value={commentInput} 
                            onChange={(e) => setCommentInput(e.target.value)} 
                            placeholder="Ajouter un commentaire..." 
                            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-xs outline-none focus:border-white/30 transition-all" 
                          />
                          <button onClick={() => addComment(post.id)} className="w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg" style={{ backgroundColor: themeColor }}>➤</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* RECHERCHE (Ami ou Post) */}
        {activeTab === 'search' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="flex items-center gap-4">
               <button onClick={backToHome} className="p-3 bg-white/5 rounded-full"><Icons.ArrowLeft /></button>
               <div className="flex-1 relative">
                 <input 
                   autoFocus 
                   value={searchQuery} 
                   onChange={(e) => setSearchQuery(e.target.value)} 
                   placeholder="Chercher un ami (@) ou un post..." 
                   className="w-full bg-[#161b22] p-5 pl-12 rounded-3xl outline-none border border-white/10 focus:border-blue-500 transition-all" 
                 />
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30"><Icons.Search /></div>
               </div>
             </div>
             <div className="space-y-4">
               {filteredPosts.length > 0 ? filteredPosts.map(p => (
                 <div key={p.id} className="bg-[#161b22]/40 p-5 rounded-3xl flex items-center justify-between border border-white/5 hover:bg-[#161b22]/80 transition-all">
                   <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-gray-800 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                        {p.media ? <img src={p.media} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><Icons.User /></div>}
                     </div>
                     <div>
                       <p className="font-black text-sm">@{p.user}</p>
                       <p className="text-xs opacity-50 truncate w-40">{p.content}</p>
                     </div>
                   </div>
                   <button className="px-5 py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase shadow-lg">Voir</button>
                 </div>
               )) : searchQuery && (
                 <div className="text-center py-20 opacity-20 italic">Aucun membre ou post trouvé pour "{searchQuery}"</div>
               )}
             </div>
          </div>
        )}

        {/* AJOUTER / CAMERA */}
        {activeTab === 'add' && (
          <div className="bg-[#161b22] rounded-[45px] p-8 border border-white/5 shadow-2xl">
             <button onClick={backToHome} className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity"><Icons.ArrowLeft /> Annuler</button>
            {!isCameraActive ? (
              <div className="space-y-8">
                <textarea 
                  value={postText} 
                  onChange={(e) => setPostText(e.target.value)} 
                  placeholder="Qu'as-tu en tête ?" 
                  className="w-full bg-transparent outline-none text-2xl font-black min-h-[140px] placeholder:opacity-10" 
                />
                {mediaFile && (
                  <div className="rounded-[30px] overflow-hidden border border-white/10 shadow-2xl relative group">
                    {isReel ? <video src={mediaFile} className="w-full h-60 object-cover" /> : <img src={mediaFile} className="w-full h-60 object-cover" />}
                    <button onClick={() => setMediaFile(null)} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={startCamera} className="py-8 rounded-[30px] bg-white/5 border border-white/10 flex flex-col items-center gap-3 hover:bg-white/10 transition-all">
                    <Icons.Camera /> 
                    <span className="text-[10px] font-black tracking-widest opacity-40">OUVRIR CAMÉRA</span>
                  </button>
                  <button 
                    onClick={handlePublish} 
                    disabled={!postText && !mediaFile}
                    className="py-8 rounded-[30px] font-black uppercase shadow-2xl transition-all active:scale-95 disabled:opacity-20" 
                    style={{ backgroundColor: themeColor }}
                  >
                    PUBLIER
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[3/4] bg-black rounded-[40px] overflow-hidden shadow-2xl">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6 items-center px-10">
                   <button onClick={stopCamera} className="p-4 bg-white/10 rounded-full backdrop-blur-md"><Icons.Rotate /></button>
                   <button onClick={takePhoto} className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-transform active:scale-90 shadow-2xl">
                     <div className="w-16 h-16 bg-white rounded-full"></div>
                   </button>
                   <button 
                     onClick={isRecording ? stopRecording : startRecording} 
                     className={`w-14 h-14 rounded-full border-2 border-white flex items-center justify-center transition-all ${isRecording ? 'animate-pulse bg-red-600/20' : ''}`}
                   >
                      <div className={`transition-all duration-300 ${isRecording ? 'w-6 h-6 rounded-md bg-red-600' : 'w-10 h-10 rounded-full bg-red-600'}`}></div>
                   </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROFIL / SETTINGS REGROUPÉS */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in">
             <div className="flex justify-between items-center mb-8">
               <button onClick={backToHome} className="p-3 bg-white/5 rounded-full"><Icons.ArrowLeft /></button>
               <button onClick={() => setActiveTab('settings')} className="p-3 bg-white/5 rounded-full"><Icons.Settings /></button>
             </div>
            <div className="flex flex-col items-center mb-10">
              <div className="w-32 h-32 rounded-full border-4 border-white/5 p-1 mb-5 shadow-2xl relative group">
                <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden flex items-center justify-center">
                  {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <span className="text-4xl font-black">{username[0]}</span>}
                </div>
              </div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">@{username}</h2>
            </div>
            <div className="flex justify-center gap-14 mb-12 text-center">
               <div><p className="text-2xl font-black">{totalViews}</p><p className="text-[10px] uppercase opacity-30 font-black tracking-widest">Vues</p></div>
               <div><p className="text-2xl font-black">{totalLikes}</p><p className="text-[10px] uppercase opacity-30 font-black tracking-widest">Likes</p></div>
               <div className="cursor-pointer active:scale-95 transition-all">
                 <p className="text-2xl font-black" style={{ color: themeColor }}>{followers}</p>
                 <p className="text-[10px] uppercase opacity-30 font-black tracking-widest">Fans</p>
               </div>
            </div>
            <div className="grid grid-cols-3 gap-1 rounded-3xl overflow-hidden border border-white/5">
              {myPosts.map(p => (
                <div key={p.id} className="aspect-[3/4] bg-[#161b22] overflow-hidden relative group">
                  {p.media && (p.type === 'reel' ? <video src={p.media} className="w-full h-full object-cover" /> : <img src={p.media} className="w-full h-full object-cover" />)}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-xs font-black">❤️ {p.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-[#161b22] rounded-[40px] p-8 border border-white/5 space-y-6 animate-in zoom-in-95">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-black uppercase italic">Réglages</h2>
               <button onClick={() => setActiveTab('profile')} className="p-3 bg-white/5 rounded-full"><Icons.ArrowLeft /></button>
             </div>
            <div>
              <p className="text-[10px] font-black uppercase opacity-40 mb-3 ml-2 tracking-widest">Ton Identifiant</p>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none font-bold focus:border-white/30 transition-all" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase opacity-40 mb-3 ml-2 tracking-widest">Couleur du Sanctuaire</p>
              <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-full h-16 bg-transparent cursor-pointer rounded-2xl" />
            </div>
            <button onClick={backToHome} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-xs shadow-2xl tracking-widest active:scale-95 transition-all">Sauvegarder & Retour</button>
          </div>
        )}

      </main>

      {/* NAV BAR FIXE */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[94%] max-w-md bg-[#161b22]/90 backdrop-blur-3xl border border-white/10 rounded-[40px] p-3 flex justify-around items-center z-[100] shadow-2xl">
        <button onClick={backToHome} className="p-4 transition-all" style={{ color: activeTab === 'home' ? themeColor : 'white', opacity: activeTab === 'home' ? 1 : 0.2 }}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className="p-4 transition-all" style={{ color: activeTab === 'search' ? themeColor : 'white', opacity: activeTab === 'search' ? 1 : 0.2 }}><Icons.Search /></button>
        <button onClick={() => { setActiveTab('add'); if(!isCameraActive) startCamera(); }} className="w-16 h-16 rounded-full flex items-center justify-center text-4xl text-white shadow-2xl active:scale-90 transition-all transform -translate-y-2" style={{ backgroundColor: themeColor }}>+</button>
        <button onClick={() => setActiveTab('play')} className="p-4 transition-all" style={{ color: activeTab === 'play' ? themeColor : 'white', opacity: activeTab === 'play' ? 1 : 0.2 }}><Icons.Play /></button>
        <button onClick={() => setActiveTab('profile')} className="p-4 transition-all" style={{ color: (activeTab === 'profile' || activeTab === 'settings') ? themeColor : 'white', opacity: (activeTab === 'profile' || activeTab === 'settings') ? 1 : 0.2 }}><Icons.User /></button>
      </div>
    </div>
  )
}