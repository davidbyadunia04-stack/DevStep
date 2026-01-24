"use client"
import { useState, useRef } from 'react'
import Link from 'next/link'

// --- TYPES (Règle les erreurs de tes captures d'écran) ---
interface Post {
  id: number;
  user: string;
  content: string;
  likes: number;
  isLiked: boolean;
  isFollowed: boolean;
  comments: string[];
}

interface Reel {
  id: number;
  user: string;
  caption: string;
  likes: number;
  isLiked: boolean;
  videoUrl: string | null;
}

// --- ICONES ---
const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Message: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  X: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Heart: ({ filled }: { filled?: boolean }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  Video: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>,
  Pause: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [postText, setPostText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // --- DONNÉES ---
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, user: "Jordan_Dev", content: "Bienvenue sur DEVSTEP ! 🚀", likes: 24, isLiked: false, isFollowed: false, comments: ["Stylé !"] },
    { id: 2, user: "Sarah_Code", content: "L'upload vidéo est OK.", likes: 15, isLiked: false, isFollowed: false, comments: [] }
  ])

  const [reels, setReels] = useState<Reel[]>([
    { id: 1, user: "DesignMaster", caption: "Mon setup 2026 💻", likes: 1200, isLiked: false, videoUrl: null }
  ])

  // --- ACTIONS ---
  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const handleLikePost = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked } : p))
  }

  const handleLikeReel = (id: number) => {
    setReels(reels.map(r => r.id === id ? { ...r, likes: r.isLiked ? r.likes - 1 : r.likes + 1, isLiked: !r.isLiked } : r))
  }

  const handleFollow = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, isFollowed: !p.isFollowed } : p))
  }

  const handlePublish = () => {
    if (videoFile) {
      const newReel: Reel = { id: Date.now(), user: "Shoncs", caption: postText, likes: 0, isLiked: false, videoUrl: URL.createObjectURL(videoFile) }
      setReels([newReel, ...reels]); setActiveTab('play')
    } else if (postText) {
      const newPost: Post = { id: Date.now(), user: "Shoncs", content: postText, likes: 0, isLiked: false, isFollowed: false, comments: [] }
      setPosts([newPost, ...posts]); setActiveTab('home')
    }
    setPostText(""); setVideoFile(null)
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans overflow-x-hidden">
      
      {/* HEADER (Navigation DM comprise) */}
      {activeTab !== 'play' && (
        <nav className="p-5 flex justify-between items-center sticky top-0 bg-[#0b0e14]/90 backdrop-blur-xl z-[100] border-b border-white/5">
          <Link href="/" className="font-black italic text-blue-500 text-2xl tracking-tighter hover:scale-105 transition-all">DEVSTEP</Link>
          <div className="flex gap-4 items-center">
             <button onClick={() => setActiveTab('dms')} className={`p-2 rounded-full transition-all ${activeTab === 'dms' ? 'bg-blue-600' : 'bg-white/5'}`}><Icons.Message /></button>
             <div className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-gray-400">Shoncs</div>
          </div>
        </nav>
      )}

      <main className={`${activeTab === 'play' ? 'h-screen' : 'max-w-xl mx-auto p-4'}`}>

        {/* RECHERCHE */}
        {activeTab === 'search' && (
          <div className="animate-in slide-in-from-top-4 mb-8 pt-4">
            <input autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="w-full bg-[#161b22] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50" />
          </div>
        )}

        {/* RÉELS (Pause, Like, Profil) */}
        {activeTab === 'play' && (
          <div className="h-screen w-full bg-black relative" onClick={togglePlay}>
            {reels.map(reel => (
              <div key={reel.id} className="h-full w-full relative flex flex-col justify-end pb-36 p-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  {reel.videoUrl ? <video ref={videoRef} src={reel.videoUrl} autoPlay loop muted className="w-full h-full object-cover" /> : <Icons.Play />}
                  {!isPlaying && <div className="absolute z-50 bg-black/40 p-8 rounded-full"><Icons.Pause /></div>}
                </div>
                <div className="relative z-10 space-y-4">
                  <Link href={`/profile/${reel.user}`} className="flex items-center gap-3 w-fit">
                    <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white shadow-xl" />
                    <span className="font-black italic text-sm uppercase">@{reel.user}</span>
                  </Link>
                  <p className="text-sm shadow-black drop-shadow-lg">{reel.caption}</p>
                </div>
                <div className="absolute right-4 bottom-40 z-10 flex flex-col gap-6">
                  <button onClick={(e) => {e.stopPropagation(); handleLikeReel(reel.id)}} className={`flex flex-col items-center gap-1 ${reel.isLiked ? 'text-red-500' : ''}`}>
                    <Icons.Heart filled={reel.isLiked} /> <span className="text-[10px] font-black">{reel.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FEED (Abonnement, Likes Uniques, Commentaires) */}
        {(activeTab === 'home' || activeTab === 'search') && (
          <div className="space-y-6 pb-24 pt-4">
            {posts.filter(p => p.content.toLowerCase().includes(searchQuery.toLowerCase())).map(post => (
              <div key={post.id} className="bg-[#161b22] border border-white/10 rounded-[35px] p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <Link href={`/profile/${post.user}`} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700" />
                    <span className="text-xs font-black italic uppercase text-blue-400">@{post.user}</span>
                  </Link>
                  <button onClick={() => handleFollow(post.id)} className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${post.isFollowed ? 'bg-white/10 text-white/50' : 'bg-blue-600 text-white'}`}>
                    {post.isFollowed ? 'Abonné' : "S'abonner"}
                  </button>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">{post.content}</p>
                <div className="flex gap-6 border-t border-white/5 pt-4">
                  <button onClick={() => handleLikePost(post.id)} className={`flex items-center gap-2 text-[10px] font-black ${post.isLiked ? 'text-red-500' : 'text-white/30'}`}>
                    <Icons.Heart filled={post.isLiked} /> {post.likes}
                  </button>
                  <button onClick={() => alert(post.comments.join('\n'))} className="flex items-center gap-2 text-[10px] font-black text-white/30"><Icons.Message /> {post.comments.length}</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DMs (Placeholder) */}
        {activeTab === 'dms' && (
          <div className="text-center mt-20 opacity-20 font-black italic uppercase text-xl">Tes messages privés ici</div>
        )}

        {/* ZONE PUBLICATION (Texte + Vidéo) */}
        {activeTab === 'add' && (
          <div className="bg-[#161b22] border border-white/10 rounded-[40px] p-8 mt-10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-black italic uppercase text-blue-500">Créer</h2>
                 <button onClick={() => {setActiveTab('home'); setVideoFile(null)}}><Icons.X /></button>
            </div>
            <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Une légende ?" className="w-full bg-transparent min-h-[100px] outline-none text-lg resize-none mb-4" />
            <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 mb-8 text-center">
              <input type="file" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => { if(e.target.files?.[0]) setVideoFile(e.target.files[0]) }} />
              <Icons.Video />
              <p className="text-[10px] font-black uppercase text-gray-500 mt-2">{videoFile ? videoFile.name : "Ajouter un Reel"}</p>
            </div>
            <button onClick={handlePublish} className="w-full bg-blue-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 transition-all">Publier</button>
          </div>
        )}
      </main>

      {/* NAV BAR BARRE BASSE */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center z-[100] shadow-2xl">
        <button onClick={() => setActiveTab('home')} className={`p-4 ${activeTab === 'home' ? 'text-blue-500 scale-110' : 'text-white/30 hover:text-white'}`}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className={`p-4 ${activeTab === 'search' ? 'text-blue-500 scale-110' : 'text-white/30 hover:text-white'}`}><Icons.Search /></button>
        <button onClick={() => setActiveTab('add')} className={`w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-light transition-all ${activeTab === 'add' ? 'rotate-45 bg-red-500' : ''}`}>+</button>
        <button onClick={() => setActiveTab('play')} className={`p-4 ${activeTab === 'play' ? 'text-blue-500 scale-110' : 'text-white/30 hover:text-white'}`}><Icons.Play /></button>
        <Link href="/profile" className="p-4 text-white/30 hover:text-white"><Icons.User /></Link>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}