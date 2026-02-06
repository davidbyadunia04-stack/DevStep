"use client"
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// --- 1. TYPES ---
interface Comment { id: number; userId: string; text: string; }
interface Post {
  id: number;
  userId: string;
  content: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  comments: Comment[];
  media?: string;
  type?: 'image' | 'video';
}

// --- 2. ICÔNES (Correction TypeScript intégrée) ---
const Icons = {
  Home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Message: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Heart: ({ fill }: { fill: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "#ef4444" : "none"} stroke={fill ? "#ef4444" : "currentColor"} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Share: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Save: ({ fill }: { fill: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
    </svg>
  ),
  Comment: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Camera: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  X: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [currentUser, setCurrentUser] = useState("")
  const [showNamingPage, setShowNamingPage] = useState(true)
  
  // --- ÉTATS AVEC PERSISTANCE ---
  const [posts, setPosts] = useState<Post[]>([])
  const [following, setFollowing] = useState<string[]>([])
  const [savedPosts, setSavedPosts] = useState<number[]>([])

  // Caméra et Médias
  const [tempMedia, setTempMedia] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<any>(null)

  // --- CHARGEMENT INITIAL (LocalStorage) ---
  useEffect(() => {
    const name = localStorage.getItem('devstep_user')
    const localPosts = localStorage.getItem('devstep_posts')
    const localFollowing = localStorage.getItem('devstep_following')

    if (name) { setCurrentUser(name); setShowNamingPage(false); }
    if (localPosts) setPosts(JSON.parse(localPosts))
    if (localFollowing) setFollowing(JSON.parse(localFollowing))
  }, [])

  // --- SAUVEGARDE AUTOMATIQUE ---
  useEffect(() => {
    if (posts.length > 0) localStorage.setItem('devstep_posts', JSON.stringify(posts))
    localStorage.setItem('devstep_following', JSON.stringify(following))
  }, [posts, following])

  // --- LOGIQUE CAMÉRA (Max 60s) ---
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) videoRef.current.srcObject = stream
      
      const recorder = new (window as any).MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      let chunks: any[] = []

      recorder.ondataavailable = (e: any) => chunks.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' })
        const reader = new FileReader()
        reader.readAsDataURL(blob) 
        reader.onloadend = () => setTempMedia(reader.result as string) // On stocke en Base64 pour le LocalStorage
        stream.getTracks().forEach(track => track.stop())
      }

      recorder.start()
      setIsRecording(true)
      setTimeout(() => { if(recorder.state === "recording") { recorder.stop(); setIsRecording(false); } }, 60000)
    } catch (err) { alert("Caméra inaccessible") }
  }

  // --- ACTIONS ---
  const handlePublish = (text: string) => {
    const newPost: Post = {
      id: Date.now(),
      userId: currentUser,
      content: text,
      likes: 0,
      isLiked: false,
      isSaved: false,
      comments: [],
      media: tempMedia || undefined
    }
    setPosts([newPost, ...posts])
    setTempMedia(null)
    setActiveTab('home')
  }

  const toggleLike = (id: number) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p))
  }

  if (showNamingPage) {
    return (
      <div className="h-screen bg-[#06090f] flex items-center justify-center p-6 font-sans">
        <div className="max-w-sm w-full space-y-8 text-center">
          <h1 className="text-5xl font-black italic text-blue-600 tracking-tighter uppercase">Devstep</h1>
          <div className="space-y-4">
            <input id="uIn" placeholder="@ton_pseudo" className="w-full bg-[#10141d] border border-blue-500/20 rounded-[25px] py-5 px-6 outline-none focus:border-blue-500 transition-all text-center font-bold text-xl" />
            <button onClick={() => {
              const v = (document.getElementById('uIn') as HTMLInputElement).value
              if(v.length > 2) { localStorage.setItem('devstep_user', v); setCurrentUser(v); setShowNamingPage(false); }
            }} className="w-full bg-blue-600 py-4 rounded-[25px] font-black uppercase text-xs tracking-[0.3em] shadow-xl shadow-blue-600/20">Entrer dans le feed</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#06090f] text-white font-sans pb-40">
      
      {/* HEADER NAV */}
      <nav className="max-w-4xl mx-auto p-6 flex justify-between items-center sticky top-0 bg-[#06090f]/90 backdrop-blur-2xl z-[100] border-b border-white/5">
        <h1 className="text-2xl font-black italic text-blue-500">DEVSTEP</h1>
        <div className="flex gap-4 items-center">
           <button onClick={() => setActiveTab('dms')} className="p-2.5 bg-white/5 rounded-full border border-white/5 hover:bg-blue-600/20 transition-all"><Icons.Message /></button>
           <div className="h-8 w-[1px] bg-white/10" />
           <span className="text-[10px] font-black bg-blue-600 text-white px-4 py-1.5 rounded-full uppercase tracking-widest">@{currentUser}</span>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-4 mt-8">
        
        {/* PUBLICATION */}
        {activeTab === 'add' && (
          <div className="bg-[#10141d] border border-white/10 rounded-[40px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
             <textarea id="postText" placeholder="De quoi veut tu parler au monde ?" className="w-full bg-transparent min-h-[120px] outline-none text-xl font-medium mb-6 resize-none" />
             
             <div className="aspect-square bg-black rounded-[30px] mb-6 relative overflow-hidden border border-white/5 shadow-inner">
                {!tempMedia ? (
                  <>
                    <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <button onClick={isRecording ? () => mediaRecorderRef.current.stop() : startCamera} className={`p-8 rounded-full transition-all ${isRecording ? 'bg-red-600 animate-pulse scale-110' : 'bg-blue-600 hover:scale-105'}`}>
                        {isRecording ? <Icons.X /> : <Icons.Camera />}
                      </button>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{isRecording ? "Enregistrement..." : "Appuie pour filmer"}</span>
                    </div>
                  </>
                ) : (
                  <div className="relative h-full w-full">
                    {tempMedia.startsWith('data:video') ? <video src={tempMedia} controls className="w-full h-full object-cover" /> : <img src={tempMedia} className="w-full h-full object-cover" />}
                    <button onClick={() => setTempMedia(null)} className="absolute top-4 right-4 p-3 bg-black/60 rounded-full backdrop-blur-md"><Icons.X /></button>
                  </div>
                )}
             </div>

             <button onClick={() => handlePublish((document.getElementById('postText') as HTMLTextAreaElement).value)} className="w-full bg-blue-600 py-5 rounded-[25px] font-black uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">Publier maintenant</button>
          </div>
        )}

        {/* FEED */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            {posts.length === 0 && (
              <div className="text-center py-32 space-y-4 opacity-20">
                <div className="text-6xl">🌍</div>
                <p className="font-black uppercase tracking-[0.4em] text-xs">Le monde attend ton premier post</p>
              </div>
            )}
            {posts.map(post => (
              <div key={post.id} className="bg-[#10141d] border border-white/5 rounded-[45px] p-3 pb-8 overflow-hidden transition-transform hover:scale-[1.01]">
                <div className="flex justify-between items-center p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-800 border-2 border-white/5 shadow-lg" />
                    <span className="font-black italic text-blue-400 tracking-tight">@{post.userId}</span>
                  </div>
                  {post.userId !== currentUser && (
                    <button onClick={() => setFollowing(prev => prev.includes(post.userId) ? prev.filter(u => u !== post.userId) : [...prev, post.userId])} className={`text-[10px] font-black uppercase px-6 py-2.5 rounded-full border transition-all ${following.includes(post.userId) ? 'bg-white text-black border-white' : 'border-white/10 text-white hover:bg-white/5'}`}>
                      {following.includes(post.userId) ? 'Abonné' : 'S\'abonner'}
                    </button>
                  )}
                </div>

                {post.media && (
                  <div className="mx-3 rounded-[35px] overflow-hidden border border-white/5 shadow-2xl aspect-square">
                    {post.media.startsWith('data:video') ? <video src={post.media} controls className="w-full h-full object-cover" /> : <img src={post.media} className="w-full h-full object-cover" />}
                  </div>
                )}
                
                <div className="px-8 py-6">
                  <p className="text-gray-200 text-lg leading-relaxed font-medium">{post.content}</p>
                </div>

                {/* BARRE D'ACTIONS (Fidèle à ton image) */}
                <div className="flex justify-between items-center px-8">
                   <div className="flex gap-8">
                      <button onClick={() => toggleLike(post.id)} className={`transition-all active:scale-150 ${post.isLiked ? 'text-red-500' : 'text-white'}`}><Icons.Heart fill={post.isLiked} /></button>
                      <button className="hover:text-blue-400 transition-colors"><Icons.Share /></button>
                      <button className="hover:text-blue-400 transition-colors"><Icons.Comment /></button>
                   </div>
                   <button onClick={() => setPosts(posts.map(p => p.id === post.id ? {...p, isSaved: !p.isSaved} : p))} className={`transition-all ${post.isSaved ? 'text-blue-500' : 'text-white'}`}><Icons.Save fill={post.isSaved} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* NAVIGATION BASSE BAR (image_838085.png) */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-[#10141d]/80 backdrop-blur-3xl border border-white/10 rounded-[50px] p-4 flex justify-around items-center z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <button onClick={() => setActiveTab('home')} className={`p-4 transition-all ${activeTab === 'home' ? 'text-blue-500 scale-110' : 'text-white/20 hover:text-white/40'}`}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className="p-4 text-white/20"><Icons.Search /></button>
        <button onClick={() => setActiveTab('add')} className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:scale-110 active:scale-90 transition-all border-4 border-[#06090f]">
          <span className="text-4xl font-light text-white mb-1">+</span>
        </button>
        <button onClick={() => setActiveTab('play')} className="p-4 text-white/20"><Icons.Play /></button>
        <button onClick={() => setActiveTab('profile')} className="p-4 text-white/20"><Icons.User /></button>
      </div>

    </div>
  )
}