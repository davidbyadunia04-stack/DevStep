"use client"
import { useState, useEffect, useRef } from 'react'

// --- ICONS (Inspiré Minimalist UX) ---
const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
  Heart: ({ active }: { active?: boolean }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#ff4b63" : "none"} stroke={active ? "#ff4b63" : "currentColor"} strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  Message: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  Camera: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Bell: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  Rotate: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
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
  
  // États Abonnés / Notifs
  const [followers, setFollowers] = useState(0)
  const [notifications, setNotifications] = useState<any[]>([])
  const [showNotifs, setShowNotifs] = useState(false)
  const [isFollowed, setIsFollowed] = useState(false)

  // États Caméra
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = useState(false)

  // --- CHARGEMENT ---
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

  // --- SAUVEGARDE ---
  useEffect(() => {
    localStorage.setItem('ds_posts', JSON.stringify(myPosts))
    localStorage.setItem('ds_user', username)
    localStorage.setItem('ds_theme', themeColor)
    localStorage.setItem('ds_fols', followers.toString())
    localStorage.setItem('ds_notifs', JSON.stringify(notifications))
    localStorage.setItem('ds_isfol', isFollowed.toString())
    if (profilePic) localStorage.setItem('ds_pic', profilePic)
  }, [myPosts, username, themeColor, profilePic, followers, notifications, isFollowed])

  // --- LOGIQUE FOLLOW / UNFOLLOW ---
  const handleFollowToggle = () => {
    if (isFollowed) {
      setFollowers(prev => Math.max(0, prev - 1))
      setIsFollowed(false)
    } else {
      setFollowers(prev => prev + 1)
      setIsFollowed(true)
      setNotifications([{ id: Date.now(), text: "Un nouvel abonné ! 🚀" }, ...notifications])
    }
  }

  // --- LOGIQUE CAMÉRA ---
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) { videoRef.current.srcObject = stream; setIsCameraActive(true); }
    } catch (err) { alert("Accès caméra refusé") }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop())
    }
    setIsCameraActive(false)
  }

  const takePhoto = () => {
    const canvas = document.createElement('canvas')
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth; canvas.height = videoRef.current.videoHeight
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0)
      setMediaFile(canvas.toDataURL('image/png')); setIsReel(false); stopCamera();
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

  const stopRecording = () => { mediaRecorderRef.current?.stop(); setIsRecording(false); stopCamera(); }

  // --- CALCULS (POUR FIXER L'ERREUR VS CODE) ---
  const totalViews = myPosts.reduce((acc, p) => acc + (p.views || 0), 0)
  const totalLikes = myPosts.reduce((acc, p) => acc + (p.likes || 0), 0)

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      <main className="max-w-xl mx-auto p-4 pb-40">
        
        {/* --- HEADER --- */}
        <div className="pt-6 mb-10 flex justify-between items-center relative">
          <button onClick={() => setActiveTab('home')} className="text-3xl font-black italic uppercase" style={{ color: themeColor }}>DEVSTEP</button>
          <div className="flex gap-4">
            <button onClick={() => setShowNotifs(!showNotifs)} className="relative p-2 bg-white/5 rounded-full">
              <Icons.Bell />
              {notifications.length > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>}
            </button>
            <button onClick={() => setActiveTab('settings')} className="p-2 bg-white/5 rounded-full"><Icons.Settings /></button>
          </div>
        </div>

        {/* --- HOME FEED --- */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {myPosts.map(post => (
              <div key={post.id} className="bg-[#161b22] rounded-[30px] overflow-hidden border border-white/5 shadow-xl">
                <div className="p-5 flex justify-between items-center">
                  <span className="font-bold text-sm">@{post.user}</span>
                  <button onClick={handleFollowToggle} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${isFollowed ? 'bg-white/5 text-gray-400' : 'bg-white text-black'}`}>
                    {isFollowed ? "Abonné" : "S'abonner"}
                  </button>
                </div>
                {post.media && (post.type === 'reel' ? <video src={post.media} controls className="w-full" /> : <img src={post.media} className="w-full" />)}
              </div>
            ))}
          </div>
        )}

        {/* --- CAMERA INTERFACE --- */}
        {activeTab === 'add' && (
          <div className="bg-[#161b22] rounded-[40px] p-8 border border-white/5">
            {!isCameraActive ? (
              <div className="space-y-6">
                <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Quoi de neuf ?" className="w-full bg-transparent outline-none text-xl min-h-[100px]" />
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={startCamera} className="py-10 bg-white/5 rounded-3xl border border-dashed border-white/10 flex flex-col items-center gap-2"><Icons.Camera /> CAMÉRA</button>
                  <button onClick={() => setActiveTab('home')} className="py-10 bg-white/5 rounded-3xl border border-dashed border-white/10 flex flex-col items-center gap-2">ANNULER</button>
                </div>
                {mediaFile && <div className="text-center text-xs text-green-500 font-bold">MÉDIA PRÊT À PUBLIER ✅</div>}
                <button onClick={() => {
                  const newPost = { id: Date.now(), user: username, content: postText, media: mediaFile, type: isReel ? 'reel' : 'photo', likes: 0, views: 0 };
                  setMyPosts([newPost, ...myPosts]); setActiveTab('home'); setMediaFile(null);
                }} className="w-full py-5 rounded-2xl font-black" style={{ backgroundColor: themeColor }}>PUBLIER</button>
              </div>
            ) : (
              <div className="relative aspect-[3/4] bg-black rounded-3xl overflow-hidden">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 items-center">
                  <button onClick={takePhoto} className="w-16 h-16 rounded-full border-4 border-white bg-white/20"></button>
                  <button onClick={isRecording ? stopRecording : startRecording} className={`w-12 h-12 rounded-full border-2 border-white ${isRecording ? 'bg-red-600 animate-pulse' : 'bg-red-600/20'}`}></button>
                  <button onClick={stopCamera} className="p-3 bg-white/10 rounded-full text-xs">QUITTER</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- PROFIL --- */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in">
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gray-800 overflow-hidden mb-4 border-2" style={{ borderColor: themeColor }}>
                {profilePic && <img src={profilePic} className="w-full h-full object-cover" />}
              </div>
              <h2 className="text-xl font-black italic">@{username}</h2>
            </div>
            <div className="flex justify-around mb-10 text-center">
              <div><p className="text-2xl font-black">{totalViews}</p><p className="text-[10px] opacity-40">VUES</p></div>
              <div className="cursor-pointer" onClick={handleFollowToggle}>
                <p className="text-2xl font-black" style={{ color: themeColor }}>{followers}</p>
                <p className="text-[10px] opacity-40 uppercase tracking-widest">{isFollowed ? 'Abonné' : 'Abonnés'}</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- NAV BAR --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#161b22]/90 backdrop-blur-3xl border border-white/10 rounded-[40px] p-3 flex justify-around items-center z-[100]">
        <button onClick={() => setActiveTab('home')} className="p-4" style={{ color: activeTab === 'home' ? themeColor : 'white', opacity: activeTab === 'home' ? 1 : 0.4 }}><Icons.Home /></button>
        <button onClick={() => { setActiveTab('add'); startCamera(); }} className="w-14 h-14 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: themeColor }}><Icons.Plus /></button>
        <button onClick={() => setActiveTab('profile')} className="p-4" style={{ color: activeTab === 'profile' ? themeColor : 'white', opacity: activeTab === 'profile' ? 1 : 0.4 }}><Icons.User /></button>
      </div>
    </div>
  )
}