"use client"
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'

const Icons = {
  Heart: ({ active }: { active: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#3b82f6" : "none"} stroke={active ? "#3b82f6" : "currentColor"} strokeWidth="2" className="transition-all">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Comment: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Send: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Save: ({ active }: { active: boolean }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "#3b82f6" : "none"} stroke="currentColor" strokeWidth="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
  ),
  Trash: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
}

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [lastTap, setLastTap] = useState(0)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('devstep_posts') || "[]")
    setPosts(saved)
  }, [])

  const saveToStorage = (updatedPosts: any[]) => {
    setPosts(updatedPosts)
    localStorage.setItem('devstep_posts', JSON.stringify(updatedPosts))
  }

  // --- ACTIONS FONCTIONNELLES ---
  
  const handleLike = (id: number) => {
    const updated = posts.map(p => {
      if (p.id === id) {
        const isCurrentlyLiked = p.isLiked
        return { ...p, isLiked: !isCurrentlyLiked, likes: isCurrentlyLiked ? (p.likes || 1) - 1 : (p.likes || 0) + 1 }
      }
      return p
    })
    saveToStorage(updated)
  }

  const handleDoubleTap = (id: number) => {
    const now = Date.now()
    if (now - lastTap < 300) { // Détection double-clic
      const updated = posts.map(p => p.id === id ? { ...p, isLiked: true, likes: p.isLiked ? p.likes : (p.likes || 0) + 1 } : p)
      saveToStorage(updated)
    }
    setLastTap(now)
  }

  const handleSave = (id: number) => {
    const updated = posts.map(p => p.id === id ? { ...p, isSaved: !p.isSaved } : p)
    saveToStorage(updated)
  }

  const deletePost = (id: number) => {
    const updated = posts.filter(p => p.id !== id)
    saveToStorage(updated)
  }

  return (
    <div className="min-h-screen bg-[#06090f] text-white font-sans pb-32">
      <div className="sticky top-0 z-50 bg-[#06090f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-black italic tracking-tighter text-blue-500">DEVSTEP.</h1>
        <button className="p-2 bg-blue-600/10 rounded-full text-blue-500"><Icons.Send /></button>
      </div>

      <main className="max-w-lg mx-auto mt-2">
        {posts.map((post) => (
          <div key={post.id} className="mb-4 border-b border-white/5 pb-4 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center px-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-900 border border-white/10" />
                <span className="text-sm font-bold tracking-tight">@{post.userId}</span>
              </div>
              <button onClick={() => deletePost(post.id)} className="opacity-20 hover:opacity-100 hover:text-red-500 transition-all">
                <Icons.Trash />
              </button>
            </div>

            {/* Image avec Double Tap Fonctionnel */}
            <div 
              onPointerDown={() => handleDoubleTap(post.id)}
              className="aspect-square w-full bg-[#10141d] relative overflow-hidden cursor-pointer select-none"
            >
              {post.media ? (
                <img src={post.media} className="w-full h-full object-cover" alt="post" />
              ) : (
                <div className="p-10 font-mono text-blue-400 text-xs overflow-hidden h-full">
                  {post.content}
                </div>
              )}
            </div>

            {/* Barre de boutons fonctionnelle */}
            <div className="flex justify-between items-center px-4 py-3">
              <div className="flex gap-5">
                <button onClick={() => handleLike(post.id)} className="active:scale-125 transition-transform">
                  <Icons.Heart active={post.isLiked} />
                </button>
                <button className="hover:text-blue-500 transition-colors"><Icons.Comment /></button>
                <button className="hover:text-blue-500 transition-colors"><Icons.Send /></button>
              </div>
              <button onClick={() => handleSave(post.id)} className="active:scale-125 transition-transform">
                <Icons.Save active={post.isSaved} />
              </button>
            </div>

            {/* Stats réelles */}
            <div className="px-4 space-y-1">
              <p className="text-xs font-black tracking-tight">{post.likes || 0} J'aime</p>
              <div className="text-xs">
                <span className="font-black mr-2">@{post.userId}</span>
                <span className="text-white/70">{post.content.substring(0, 150)}</span>
              </div>
            </div>
          </div>
        ))}
      </main>
      <Navbar />
    </div>
  )
}