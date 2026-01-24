"use client"
import { useState, useRef } from 'react'
import Link from 'next/link'

// --- TYPES ---
interface Post {
  id: number;
  user: string;
  content: string;
  likes: number;
  views: number;
  isLiked: boolean;
}

interface Reel {
  id: number;
  user: string;
  caption: string;
  likes: number;
  views: number;
  isLiked: boolean;
  videoUrl: string | null;
}

// --- ICONES (J'ai rajouté Settings) ---
const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
  Heart: ({ filled }: { filled?: boolean }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  Eye: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [postText, setPostText] = useState("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  
  const [myPosts, setMyPosts] = useState<Post[]>([
    { id: 1, user: "Shoncs", content: "Premier post sur DevStep !", likes: 12, views: 145, isLiked: false }
  ])
  const [myReels, setMyReels] = useState<Reel[]>([
    { id: 101, user: "Shoncs", caption: "Mon setup", likes: 45, views: 890, isLiked: false, videoUrl: null }
  ])

  // Stats réelles
  const totalViews = myPosts.reduce((acc, p) => acc + p.views, 0) + myReels.reduce((acc, r) => acc + r.views, 0)
  const totalLikes = myPosts.reduce((acc, p) => acc + p.likes, 0) + myReels.reduce((acc, r) => acc + r.likes, 0)

  const handlePublish = () => {
    if (videoFile) {
      const newReel: Reel = { id: Date.now(), user: "Shoncs", caption: postText, likes: 0, views: 1, isLiked: false, videoUrl: URL.createObjectURL(videoFile) }
      setMyReels([newReel, ...myReels]); setActiveTab('play')
    } else if (postText) {
      const newPost: Post = { id: Date.now(), user: "Shoncs", content: postText, likes: 0, views: 1, isLiked: false }
      setMyPosts([newPost, ...myPosts]); setActiveTab('home')
    }
    setPostText(""); setVideoFile(null)
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      
      <main className="max-w-xl mx-auto p-4 pb-32">

        {/* PAGE PROFIL (SETTINGS RÉINTÉGRÉ) */}
        {activeTab === 'profile' && (
          <div className="animate-in slide-in-from-bottom-10">
            {/* Header avec le bouton Settings en haut à droite */}
            <div className="flex justify-end pt-4">
              <button onClick={() => alert("Paramètres en cours de dev...")} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-gray-400">
                <Icons.Settings />
              </button>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-[35px] bg-gradient-to-tr from-yellow-400 to-yellow-600 p-1 mb-4 shadow-xl">
                <div className="w-full h-full bg-[#161b22] rounded-[32px] flex items-center justify-center text-3xl font-black">S</div>
              </div>
              <h2 className="text-2xl font-black italic uppercase">Shoncs</h2>
              <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mt-1">DevStep Creator</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-[#161b22] p-5 rounded-[30px] border border-white/5">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Icons.Eye /> <span className="text-[9px] font-black uppercase tracking-wider">Vues réelles</span>
                </div>
                <p className="text-xl font-bold tracking-tighter">{totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-[#161b22] p-5 rounded-[30px] border border-white/5">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Icons.Heart /> <span className="text-[9px] font-black uppercase tracking-wider">Likes reçus</span>
                </div>
                <p className="text-xl font-bold tracking-tighter">{totalLikes.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest">Tes publications</h3>
              {[...myPosts, ...myReels].map(item => (
                <div key={item.id} className="bg-[#161b22]/50 p-4 rounded-3xl flex justify-between items-center border border-white/5">
                  <p className="text-xs font-medium truncate max-w-[150px]">{'content' in item ? item.content : item.caption}</p>
                  <div className="flex gap-4 text-[10px] font-black text-blue-500">
                    <span>{item.views} 👀</span> <span>{item.likes} ❤️</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESTE DU SITE (HOME / ADD / PLAY) - TOUT EST GARDÉ */}
        {activeTab === 'home' && (
          <div className="space-y-6 pt-4">
            <h1 className="text-2xl font-black italic uppercase text-blue-500 mb-8">Fil d'actualité</h1>
            {myPosts.map(post => (
              <div key={post.id} className="bg-[#161b22] rounded-[35px] p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-4 text-xs font-black uppercase italic text-gray-500">@{post.user}</div>
                <p className="text-sm leading-relaxed mb-6">{post.content}</p>
                <div className="flex gap-4 text-[10px] font-black text-white/20 uppercase tracking-widest">
                   <span>{post.views} vues</span> • <span>{post.likes} likes</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="bg-[#161b22] border border-white/10 rounded-[40px] p-8 mt-10 shadow-2xl">
            <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Quoi de neuf ?" className="w-full bg-transparent min-h-[120px] outline-none text-lg resize-none mb-4" />
            <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 mb-8 text-center">
              <input type="file" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => { if(e.target.files?.[0]) setVideoFile(e.target.files[0]) }} />
              <p className="text-[10px] font-black uppercase text-gray-500">{videoFile ? videoFile.name : "Clique pour un Reel"}</p>
            </div>
            <button onClick={handlePublish} className="w-full bg-blue-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">Publier</button>
          </div>
        )}
      </main>

      {/* BARRE DE NAVIGATION */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center z-[100] shadow-2xl">
        <button onClick={() => setActiveTab('home')} className={`p-4 transition-all ${activeTab === 'home' ? 'text-blue-500 scale-125' : 'text-white/30'}`}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className={`p-4 transition-all ${activeTab === 'search' ? 'text-blue-500 scale-125' : 'text-white/30'}`}><Icons.Search /></button>
        <button onClick={() => setActiveTab('add')} className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-light hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">+</button>
        <button onClick={() => setActiveTab('play')} className={`p-4 transition-all ${activeTab === 'play' ? 'text-blue-500 scale-125' : 'text-white/30'}`}><Icons.Play /></button>
        <button onClick={() => setActiveTab('profile')} className={`p-4 transition-all ${activeTab === 'profile' ? 'text-blue-500 scale-125' : 'text-white/30'}`}><Icons.User /></button>
      </div>
    </div>
  )
}