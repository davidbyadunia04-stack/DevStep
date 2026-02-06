"use client"
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

// --- PACK D'ICÔNES ULTRA COMPLET (SVG OPTIMISÉS) ---
const Icons = {
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
  Heart: ({ active }: { active?: boolean }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#ff4b63" : "none"} stroke={active ? "#ff4b63" : "currentColor"} strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  Message: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Camera: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Rotate: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  ArrowLeft: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Bell: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Plus: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Send: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
}

export default function FeedPage() {
  // --- ÉTATS SYSTÈME ---
  const [hasId, setHasId] = useState(false)
  const [username, setUsername] = useState("")
  const [themeColor, setThemeColor] = useState("#3b82f6")
  const [activeTab, setActiveTab] = useState('home')
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)

  // --- ÉTATS CONTENU ---
  const [posts, setPosts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState<any[]>([])
  const [showNotifs, setShowNotifs] = useState(false)
  const [selectedPostComments, setSelectedPostComments] = useState<string | null>(null)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState("")

  // --- ÉTATS CRÉATION ---
  const [postText, setPostText] = useState("")
  const [mediaFile, setMediaFile] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<'photo' | 'reel'>('photo')
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  
  // --- REFS ---
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  // --- INITIALISATION ---
  useEffect(() => {
    const savedUser = localStorage.getItem('ds_user')
    const savedColor = localStorage.getItem('ds_theme')
    if (savedUser) { setUsername(savedUser); setHasId(true); }
    if (savedColor) setThemeColor(savedColor)

    fetchPosts()

    // Realtime Pipeline
    const channel = supabase.channel('main_stream')
      .on('postgres_changes' as any, { event: 'INSERT', table: 'devstep_posts', schema: 'public' }, (payload: any) => {
        setPosts(prev => [payload.new, ...prev])
        setNotifications(n => [{ id: Date.now(), text: `@${payload.new.username} a publié un nouveau contenu`, time: new Date().toLocaleTimeString() }, ...n])
      })
      .on('postgres_changes' as any, { event: 'UPDATE', table: 'devstep_posts', schema: 'public' }, (payload: any) => {
        setPosts(prev => prev.map(p => p.id === payload.new.id ? payload.new : p))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  // --- LOGIQUE DATA POSTS ---
  const fetchPosts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('devstep_posts').select('*').order('created_at', { ascending: false })
    if (!error && data) setPosts(data)
    setLoading(false)
  }

  const handlePublish = async () => {
    if (!postText && !mediaFile) return
    setPublishing(true)
    const { error } = await supabase.from('devstep_posts').insert([
      { 
        username, 
        content: postText, 
        media_url: mediaFile, 
        media_type: mediaType, 
        likes: 0 
      }
    ])
    setPublishing(false)
    if (!error) { 
      setPostText(""); setMediaFile(null); setActiveTab('home'); stopCamera(); 
    }
  }

  const addLike = async (postId: string, count: number) => {
    await supabase.from('devstep_posts').update({ likes: count + 1 }).eq('id', postId)
  }

  // --- LOGIQUE COMMENTAIRES ---
  const openComments = async (postId: string) => {
    setSelectedPostComments(postId)
    const { data } = await supabase.from('devstep_comments').select('*').eq('post_id', postId).order('created_at', { ascending: true })
    if (data) setComments(data)
  }

  const postComment = async () => {
    if (!newComment.trim() || !selectedPostComments) return
    const { error } = await supabase.from('devstep_comments').insert([
      { post_id: selectedPostComments, username: username, content: newComment }
    ])
    if (!error) {
      setComments([...comments, { username, content: newComment, created_at: new Date() }])
      setNewComment("")
    }
  }

  // --- LOGIQUE MÉDIA ---
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) { 
        videoRef.current.srcObject = stream; 
        setIsCameraActive(true); 
      }
    } catch (err) { alert("Accès caméra requis.") }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop())
    }
    setIsCameraActive(false); setIsRecording(false)
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0)
      setMediaFile(canvas.toDataURL('image/jpeg', 0.8))
      setMediaType('photo')
      stopCamera()
    }
  }

  const toggleRecording = () => {
    if (!isRecording) {
      const stream = videoRef.current?.srcObject as MediaStream
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      chunksRef.current = []
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/mp4' })
        const reader = new FileReader()
        reader.onloadend = () => {
          setMediaFile(reader.result as string)
          setMediaType('reel')
        }
        reader.readAsDataURL(blob)
      }
      recorder.start()
      setIsRecording(true)
    } else {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
      stopCamera()
    }
  }

  // --- RENDER LOGIN ---
  if (!hasId) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center justify-center p-8 text-white font-sans">
        <div className="w-full max-w-sm space-y-12 text-center animate-in fade-in zoom-in duration-700">
          <div>
            <h1 className="text-6xl font-black italic tracking-tighter text-blue-500 mb-2">DEVSTEP</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold">The Social Core</p>
          </div>
          <div className="bg-[#161b22] p-10 rounded-[50px] border border-white/5 shadow-2xl">
            <input 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Identifiant réseau..." 
              className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl mb-6 outline-none font-bold text-center focus:border-blue-500 transition-all placeholder:opacity-20" 
            />
            <button 
              onClick={() => { if(username.length > 2) { localStorage.setItem('ds_user', username); setHasId(true); } }} 
              className="w-full py-6 bg-white text-black rounded-3xl font-black uppercase text-sm tracking-widest hover:bg-blue-500 hover:text-white transition-all active:scale-95"
            >
              Initialiser
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white selection:bg-blue-500">
      <main className="max-w-xl mx-auto p-4 pb-44 min-h-screen">
        
        {/* TOP BAR */}
        <header className="py-8 mb-6 flex justify-between items-center sticky top-0 bg-[#0b0e14]/80 backdrop-blur-lg z-[100] px-2">
          <div className="group cursor-pointer" onClick={() => setActiveTab('home')}>
            <h1 className="text-3xl font-black italic tracking-tighter group-active:scale-90 transition-all" style={{ color: themeColor }}>DEVSTEP</h1>
            <div className="h-1 w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ backgroundColor: themeColor }}></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-3.5 bg-white/5 rounded-full border border-white/10 active:scale-90 transition-all">
              <Icons.Bell />
              {notifications.length > 0 && <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-4 border-[#0b0e14]"></span>}
            </button>
            <button onClick={() => setActiveTab('settings')} className="p-3.5 bg-white/5 rounded-full border border-white/10 active:scale-90 transition-all"><Icons.Settings /></button>
          </div>

          {showNotifs && (
            <div className="absolute top-24 right-0 w-80 bg-[#1c2128] border border-white/10 rounded-[40px] p-6 shadow-2xl animate-in slide-in-from-top-5 z-[200]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-black uppercase opacity-40 tracking-widest">Flux d'activité</h3>
                <button onClick={() => setNotifications([])} className="text-[9px] font-bold opacity-20 hover:opacity-100 uppercase">Effacer</button>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {notifications.length === 0 ? (
                  <p className="text-center py-10 text-xs opacity-20 italic">Aucune notification</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                      <p className="text-[11px] leading-relaxed">{n.text}</p>
                      <p className="text-[8px] opacity-30 font-bold">{n.time}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </header>

        {/* FEED TAB */}
        {activeTab === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            {loading ? (
              <div className="py-20 flex flex-col items-center opacity-20">
                <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Syncing Core...</p>
              </div>
            ) : posts.map(p => (
              <article key={p.id} className="bg-[#161b22] rounded-[50px] border border-white/5 overflow-hidden shadow-2xl transition-all hover:border-white/10 group">
                <div className="p-7 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center font-black text-sm shadow-lg">
                      {p.username[0].toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-black text-sm tracking-tight">@{p.username}</h4>
                      <p className="text-[9px] font-bold opacity-20 uppercase tracking-tighter">
                        {new Date(p.created_at).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>

                {p.media_url && (
                  <div className="relative bg-black flex items-center justify-center">
                    {p.media_type === 'reel' ? (
                      <video src={p.media_url} controls className="w-full aspect-[4/5] object-cover" />
                    ) : (
                      <img src={p.media_url} alt="Post content" className="w-full object-cover max-h-[600px]" />
                    )}
                  </div>
                )}

                <div className="p-10 pt-8">
                  <p className="text-[15px] leading-[1.6] mb-10 font-medium opacity-80">{p.content}</p>
                  <div className="flex gap-12">
                    <button onClick={() => addLike(p.id, p.likes)} className="flex items-center gap-3 active:scale-125 transition-transform group/like">
                      <Icons.Heart active={p.likes > 0} />
                      <span className={`text-xs font-black ${p.likes > 0 ? 'text-red-500' : 'opacity-20'}`}>{p.likes}</span>
                    </button>
                    <button onClick={() => openComments(p.id)} className="flex items-center gap-3 opacity-20 hover:opacity-100 transition-all">
                      <Icons.Message />
                      <span className="text-xs font-black">Discuter</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* SEARCH TAB */}
        {activeTab === 'search' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-5 bg-[#161b22] p-3 rounded-[35px] border border-white/10 px-8 focus-within:border-blue-500/50 transition-all">
              <Icons.Search />
              <input 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Chercher un profil..." 
                className="bg-transparent flex-1 py-4 outline-none font-bold text-base placeholder:opacity-20" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {posts.filter(p => p.username.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                <div key={p.id} className="aspect-square bg-[#161b22] rounded-[30px] border border-white/5 overflow-hidden relative group">
                  {p.media_url ? (
                    <img src={p.media_url} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-black opacity-10 uppercase tracking-widest px-4 text-center">Texte</div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <p className="text-[10px] font-black bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">@{p.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD TAB */}
        {activeTab === 'add' && (
          <div className="bg-[#161b22] rounded-[60px] p-10 border border-white/5 shadow-3xl animate-in zoom-in-95 duration-500">
            {!isCameraActive && !mediaFile ? (
              <div className="space-y-10">
                <textarea 
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Écrivez quelque chose d'épique..." 
                  className="w-full bg-transparent text-3xl font-black outline-none min-h-[250px] resize-none placeholder:opacity-5 leading-tight" 
                />
                <div className="grid grid-cols-2 gap-6">
                  <button onClick={startCamera} className="py-12 bg-white/5 rounded-[40px] border border-white/10 flex flex-col items-center gap-4 hover:bg-white/10 transition-all group">
                    <Icons.Camera />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Caméra</span>
                  </button>
                  <button 
                    disabled={!postText || publishing}
                    onClick={handlePublish}
                    className="py-12 rounded-[40px] font-black uppercase text-xs tracking-[0.3em] disabled:opacity-20 transition-all flex items-center justify-center"
                    style={{ backgroundColor: themeColor }}
                  >
                    {publishing ? "Diffu..." : "Diffuser"}
                  </button>
                </div>
              </div>
            ) : isCameraActive ? (
              <div className="relative aspect-[3/4] bg-black rounded-[50px] overflow-hidden">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-12">
                   <button onClick={stopCamera} className="p-5 bg-white/10 backdrop-blur-xl rounded-full border border-white/10"><Icons.Rotate /></button>
                   <button onClick={capturePhoto} className="w-24 h-24 rounded-full border-[6px] border-white flex items-center justify-center p-1.5 active:scale-90 transition-all shadow-2xl">
                     <div className="w-full h-full rounded-full bg-white"></div>
                   </button>
                   <button onClick={toggleRecording} className={`p-5 rounded-full border ${isRecording ? 'bg-red-500 border-red-500 animate-pulse' : 'bg-white/10 border-white/10'}`}>
                     <div className="w-6 h-6 rounded-md border-2 border-white"></div>
                   </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in zoom-in-95">
                <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-black">
                  {mediaType === 'photo' ? <img src={mediaFile!} className="w-full h-80 object-cover" /> : <video src={mediaFile!} className="w-full h-80 object-cover" controls />}
                </div>
                <textarea 
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Légende..." 
                  className="w-full bg-transparent text-xl font-bold outline-none" 
                />
                <button onClick={handlePublish} className="w-full py-8 rounded-[35px] font-black uppercase text-sm tracking-widest shadow-2xl" style={{ backgroundColor: themeColor }}>Confirmer</button>
                <button onClick={() => setMediaFile(null)} className="w-full text-center text-[10px] font-black opacity-30 uppercase">Annuler</button>
              </div>
            )}
          </div>
        )}

        {/* REELS (PLAY) TAB */}
        {activeTab === 'play' && (
          <div className="fixed inset-0 bg-black z-[200] animate-in fade-in overflow-y-scroll snap-y snap-mandatory scrollbar-hide pb-20">
            {posts.filter(p => p.media_type === 'reel').length === 0 ? (
               <div className="h-screen flex items-center justify-center flex-col gap-4">
                  <p className="opacity-30 text-[10px] font-black uppercase tracking-widest">Aucun Reel disponible</p>
                  <button onClick={() => setActiveTab('add')} className="px-6 py-3 bg-white text-black font-black text-xs rounded-full">En créer un</button>
               </div>
            ) : posts.filter(p => p.media_type === 'reel').map(p => (
              <div key={p.id} className="w-full h-screen snap-start relative flex items-center justify-center">
                <video src={p.media_url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-40 left-8 right-20">
                  <h4 className="font-black text-xl mb-3 flex items-center gap-2">@{p.username} <div className="w-3 h-3 bg-blue-500 rounded-full"></div></h4>
                  <p className="text-sm opacity-80 line-clamp-2 leading-relaxed">{p.content}</p>
                </div>
                <div className="absolute right-6 bottom-40 flex flex-col gap-10 items-center">
                  <button onClick={() => addLike(p.id, p.likes)} className="flex flex-col items-center gap-2 group">
                    <div className="p-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 group-active:scale-150 transition-transform"><Icons.Heart active={p.likes > 0} /></div>
                    <span className="text-[10px] font-black">{p.likes}</span>
                  </button>
                  <button onClick={() => openComments(p.id)} className="flex flex-col items-center gap-2">
                    <div className="p-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10"><Icons.Message /></div>
                    <span className="text-[10px] font-black">Chat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in duration-1000">
            <div className="flex flex-col items-center py-12">
              <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#1c2128] to-[#2d333b] flex items-center justify-center text-5xl font-black italic border-4 border-white/5 shadow-3xl mb-8">
                {username[0].toUpperCase()}
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter mb-10">@{username}</h2>
              <div className="flex justify-center gap-20 text-center w-full max-w-sm mb-16 bg-[#161b22] p-10 rounded-[40px] border border-white/5">
                 <div><p className="text-4xl font-black mb-1">128</p><p className="text-[9px] uppercase opacity-20 font-black tracking-widest">Followers</p></div>
                 <div><p className="text-4xl font-black mb-1" style={{ color: themeColor }}>{posts.filter(p => p.username === username).length}</p><p className="text-[9px] uppercase opacity-20 font-black tracking-widest">Posts</p></div>
              </div>
              <div className="w-full grid grid-cols-3 gap-2">
                {posts.filter(p => p.username === username).map(p => (
                  <div key={p.id} className="aspect-square bg-[#161b22] rounded-2xl overflow-hidden border border-white/5">
                    {p.media_url && <img src={p.media_url} className="w-full h-full object-cover" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="bg-[#161b22] rounded-[60px] p-12 border border-white/5 space-y-12 animate-in zoom-in-95 shadow-3xl">
            <h2 className="text-3xl font-black italic tracking-tighter">Paramètres</h2>
            <div className="space-y-10">
               <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase opacity-20 ml-4 tracking-[0.4em]">Couleur d'accent</p>
                 <div className="grid grid-cols-4 gap-4 p-6 bg-white/5 rounded-[35px] border border-white/5">
                    {['#3b82f6', '#ec4899', '#8b5cf6', '#10b981'].map(color => (
                      <button 
                        key={color} 
                        onClick={() => { setThemeColor(color); localStorage.setItem('ds_theme', color); }}
                        className="aspect-square rounded-2xl border-4 transition-all"
                        style={{ backgroundColor: color, borderColor: themeColor === color ? 'white' : 'transparent' }}
                      />
                    ))}
                 </div>
               </div>
               <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase opacity-20 ml-4 tracking-[0.4em]">Identité</p>
                 <input 
                    value={username} 
                    onChange={(e) => { setUsername(e.target.value); localStorage.setItem('ds_user', e.target.value); }}
                    className="w-full bg-white/5 border border-white/5 p-6 rounded-[30px] outline-none font-black text-lg" 
                 />
               </div>
            </div>
            <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="w-full py-6 text-red-500/40 font-black uppercase text-[9px] tracking-[0.5em]">Formatage des données</button>
          </div>
        )}

      </main>

      {/* MODAL COMMENTAIRES (VÉRITABLE LOGIQUE) */}
      {selectedPostComments && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[600] flex items-end animate-in fade-in slide-in-from-bottom-10">
          <div className="w-full bg-[#161b22] rounded-t-[60px] h-[85vh] flex flex-col border-t border-white/10 shadow-3xl">
            <div className="p-10 flex justify-between items-center border-b border-white/5">
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Discussions en direct</h3>
               <button onClick={() => setSelectedPostComments(null)} className="p-4 bg-white/5 rounded-full"><Icons.ArrowLeft /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
               {comments.map((c, i) => (
                 <div key={i} className="flex gap-4 animate-in slide-in-from-left-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black">{c.username[0].toUpperCase()}</div>
                    <div className="flex-1">
                       <p className="text-[10px] font-black mb-1 opacity-20">@{c.username}</p>
                       <p className="bg-white/5 p-4 rounded-[25px] rounded-tl-none text-sm border border-white/5 leading-relaxed">{c.content}</p>
                    </div>
                 </div>
               ))}
               {comments.length === 0 && <p className="text-center py-20 opacity-20 italic text-xs">Aucun message pour l'instant...</p>}
            </div>
            <div className="p-8 bg-[#0b0e14]/50 border-t border-white/5 flex gap-4 items-center">
               <input 
                  value={newComment} 
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Écrire un message..." 
                  className="bg-white/5 border border-white/5 flex-1 p-5 rounded-full outline-none font-bold text-sm focus:border-blue-500/30 transition-all"
               />
               <button onClick={postComment} className="p-5 rounded-full text-black shadow-lg active:scale-90 transition-all" style={{ backgroundColor: themeColor }}>
                  <Icons.Send />
               </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVIGATION BAR (FIXE) */}
      <nav className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#161b22]/70 backdrop-blur-3xl border border-white/10 rounded-[60px] p-5 flex justify-around items-center z-[500] shadow-2xl">
        <button onClick={() => setActiveTab('home')} className="p-4 transition-all" style={{ color: activeTab === 'home' ? themeColor : 'white', opacity: activeTab === 'home' ? 1 : 0.15 }}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className="p-4 transition-all" style={{ color: activeTab === 'search' ? themeColor : 'white', opacity: activeTab === 'search' ? 1 : 0.15 }}><Icons.Search /></button>
        <button 
          onClick={() => { setActiveTab('add'); if(!isCameraActive) startCamera(); }} 
          className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl transform -translate-y-10 active:scale-90 transition-all z-[501]"
          style={{ backgroundColor: themeColor, boxShadow: `0 20px 40px ${themeColor}44` }}
        >
          <Icons.Plus />
        </button>
        <button onClick={() => setActiveTab('play')} className="p-4 transition-all" style={{ color: activeTab === 'play' ? themeColor : 'white', opacity: activeTab === 'play' ? 1 : 0.15 }}><Icons.Play /></button>
        <button onClick={() => setActiveTab('profile')} className="p-4 transition-all" style={{ color: activeTab === 'profile' ? themeColor : 'white', opacity: activeTab === 'profile' ? 1 : 0.15 }}><Icons.User /></button>
      </nav>

      {/* OVERLAY CHARGEMENT */}
      {publishing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1000] flex flex-col items-center justify-center animate-in fade-in">
           <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin mb-6"></div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Publication en cours...</p>
        </div>
      )}
    </div>
  )
}