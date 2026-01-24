"use client"
import { useState } from 'react'
import Link from 'next/link'

// --- TYPES POUR TYPESCRIPT ---
interface Post {
  id: number;
  user: string;
  content: string;
  likes: number;
}

interface Reel {
  id: number;
  user: string;
  caption: string;
  likes: string;
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
  Heart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  Video: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState("")
  const [postText, setPostText] = useState("")
  
  // Correction TypeScript pour les fichiers et les listes
  const [videoFile, setVideoFile] = useState<File | null>(null)
  
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, user: "Jordan_Dev", content: "Bienvenue sur le nouveau feed ! On build ensemble ? 🚀", likes: 24 },
    { id: 2, user: "Sarah_Code", content: "L'interface est super fluide.", likes: 15 }
  ])

  const [reels, setReels] = useState<Reel[]>([
    { id: 1, user: "DesignMaster", caption: "Mon nouveau setup 2026 💻", likes: "1.2k", videoUrl: null },
    { id: 2, user: "ReactGuru", caption: "Next.js 15 est une bombe ! 🔥", likes: "850", videoUrl: null }
  ])

  const filteredPosts = posts.filter(p => p.content.toLowerCase().includes(searchQuery.toLowerCase()))

  const handlePublish = () => {
    if (videoFile) {
      const newReel: Reel = {
        id: Date.now(),
        user: "Shoncs",
        caption: postText || "Nouveau Reel !",
        likes: "0",
        videoUrl: URL.createObjectURL(videoFile)
      }
      setReels([newReel, ...reels])
      setActiveTab('play')
    } else if (postText) {
      const newPost: Post = { id: Date.now(), user: "Shoncs", content: postText, likes: 0 }
      setPosts([newPost, ...posts])
      setActiveTab('home')
    }
    setPostText(""); setVideoFile(null);
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {activeTab !== 'play' && (
        <nav className="p-5 flex justify-between items-center sticky top-0 bg-[#0b0e14]/90 backdrop-blur-xl z-[100] border-b border-white/5">
          <Link href="/" className="font-black italic text-blue-500 text-2xl tracking-tighter hover:scale-105 transition-all">DEVSTEP</Link>
          <div className="flex gap-5 items-center">
             <div className="bg-white/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-gray-400">Shoncs</div>
             <button onClick={() => setActiveTab('dms')} className={activeTab === 'dms' ? 'text-blue-500' : 'text-white/40'}><Icons.Message /></button>
          </div>
        </nav>
      )}

      <main className={`${activeTab === 'play' ? 'h-screen' : 'max-w-xl mx-auto p-4 pt-8'}`}>

        {activeTab === 'search' && (
          <div className="animate-in slide-in-from-top-4 duration-300 mb-8">
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20"><Icons.Search /></div>
              <input autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="w-full bg-[#161b22] border border-white/10 rounded-2xl py-5 pl-14 outline-none focus:border-blue-600/50" />
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="animate-in zoom-in-95 duration-300">
            <div className="bg-[#161b22] border border-white/10 rounded-[40px] p-8 relative shadow-2xl">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-black italic uppercase text-blue-600">Créer</h2>
                 <button onClick={() => {setActiveTab('home'); setVideoFile(null)}}><Icons.X /></button>
               </div>
               
               <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Quoi de neuf ?" className="w-full bg-transparent min-h-[120px] outline-none text-lg resize-none" />
               
               <div className={`mt-4 border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center gap-2 relative ${videoFile ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 hover:border-white/20'}`}>
                  {videoFile ? (
                    <div className="text-center font-black text-[10px] uppercase text-blue-500">Vidéo : {videoFile.name}</div>
                  ) : (
                    <>
                      <Icons.Video />
                      <span className="text-[9px] font-black uppercase text-gray-500">Ajouter un Reel</span>
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={(e) => {
                          if(e.target.files && e.target.files[0]) setVideoFile(e.target.files[0])
                        }} 
                      />
                    </>
                  )}
               </div>

               <button onClick={handlePublish} className="w-full mt-6 bg-blue-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-600/30">Publier</button>
            </div>
          </div>
        )}

        {activeTab === 'play' && (
          <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black">
            {reels.map(reel => (
              <div key={reel.id} className="h-screen w-full snap-start relative flex flex-col justify-end pb-36 p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 flex items-center justify-center overflow-hidden">
                    {reel.videoUrl ? (
                      <video src={reel.videoUrl} autoPlay loop muted className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center"><Icons.Play /></div>
                    )}
                </div>
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-500 border border-white" />
                    <span className="font-black italic text-xs uppercase tracking-widest">@{reel.user}</span>
                  </div>
                  <p className="text-sm font-medium">{reel.caption}</p>
                </div>
                <div className="absolute right-4 bottom-40 z-10 flex flex-col gap-6">
                  <button className="flex flex-col items-center gap-1"><Icons.Heart /><span className="text-[10px] font-black">{reel.likes}</span></button>
                  <button className="flex flex-col items-center gap-1"><Icons.Message /><span className="text-[10px] font-black">8</span></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {(activeTab === 'home' || activeTab === 'search') && (
          <div className="space-y-6 pb-24">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-[#161b22] border border-white/10 rounded-[35px] p-6 hover:border-white/20 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 shadow-md" />
                  <span className="text-xs font-black italic uppercase tracking-wider text-blue-400">@{post.user}</span>
                </div>
                <p className="text-sm text-gray-300 font-medium leading-relaxed">{post.content}</p>
                <div className="mt-5 pt-4 border-t border-white/5 flex gap-6 text-[10px] font-black uppercase tracking-widest text-white/30">
                  <button className="hover:text-red-500">❤️ {post.likes}</button>
                  <button className="hover:text-blue-500">💬 Commenter</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center shadow-2xl z-[100]">
        <button onClick={() => setActiveTab('home')} className={`p-4 transition-all ${activeTab === 'home' ? 'text-blue-500' : 'text-white/30'}`}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className={`p-4 transition-all ${activeTab === 'search' ? 'text-blue-500' : 'text-white/30'}`}><Icons.Search /></button>
        <button onClick={() => setActiveTab('add')} className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${activeTab === 'add' ? 'bg-red-500 rotate-45' : 'bg-blue-600 shadow-lg shadow-blue-600/20'}`}>
          <span className="text-3xl font-light mb-1">+</span>
        </button>
        <button onClick={() => setActiveTab('play')} className={`p-4 transition-all ${activeTab === 'play' ? 'text-blue-500' : 'text-white/30'}`}><Icons.Play /></button>
        <Link href="/profile" className="p-4 transition-all text-white/30 hover:text-white"><Icons.User /></Link>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}