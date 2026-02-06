"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

// --- TYPES ---
interface Post {
  id: number;
  userId: string;
  content: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  media?: string;
}

const Icons = {
  Back: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>,
  Settings: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  Grid: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>,
  Bookmark: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
}

export default function ProfilePage() {
  const [user, setUser] = useState("")
  const [myPosts, setMyPosts] = useState<Post[]>([])
  const [savedPosts, setSavedPosts] = useState<Post[]>([])
  const [view, setView] = useState<'posts' | 'saved'>('posts')
  const [followingCount, setFollowingCount] = useState(0)

  useEffect(() => {
    const storedUser = localStorage.getItem('devstep_user') || "Guest"
    const allPosts: Post[] = JSON.parse(localStorage.getItem('devstep_posts') || "[]")
    const following = JSON.parse(localStorage.getItem('devstep_following') || "[]")

    setUser(storedUser)
    setFollowingCount(following.length)
    
    // Filtrer les posts de l'utilisateur
    setMyPosts(allPosts.filter(p => p.userId === storedUser))
    
    // Filtrer les posts enregistrés (isSaved === true)
    setSavedPosts(allPosts.filter(p => p.isSaved === true))
  }, [])

  const logout = () => {
    localStorage.removeItem('devstep_user');
    window.location.href = "/feed";
  }

  return (
    <div className="min-h-screen bg-[#06090f] text-white font-sans">
      
      {/* HEADER ACTION */}
      <div className="max-w-2xl mx-auto p-6 flex justify-between items-center">
        <Link href="/feed" className="p-3 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 transition-all">
          <Icons.Back />
        </Link>
        <button onClick={logout} className="p-3 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 hover:bg-red-500/20 transition-all">
          <Icons.Settings />
        </button>
      </div>

      <main className="max-w-2xl mx-auto px-6">
        
        {/* PROFIL CARD DYNAMIQUE */}
        <div className="flex flex-col items-center mt-4">
          <div className="w-28 h-28 rounded-[40px] bg-gradient-to-tr from-blue-600 to-indigo-900 border-4 border-[#10141d] shadow-2xl mb-6" />
          <h2 className="text-2xl font-black italic tracking-tight text-blue-500 uppercase">@{user}</h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Développeur International</p>

          {/* STATS RÉELLES */}
          <div className="flex gap-12 mt-10 w-full justify-center border-y border-white/5 py-8">
            <div className="text-center">
              <p className="text-xl font-black">{myPosts.length}</p>
              <p className="text-[10px] font-black uppercase opacity-30 tracking-widest">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black">{followingCount}</p>
              <p className="text-[10px] font-black uppercase opacity-30 tracking-widest">Following</p>
            </div>
          </div>
        </div>

        {/* ONGLETS FONCTIONNELS */}
        <div className="flex mt-8 border-b border-white/5">
          <button 
            onClick={() => setView('posts')}
            className={`flex-1 flex justify-center py-4 transition-all ${view === 'posts' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-white/20'}`}
          >
            <Icons.Grid />
          </button>
          <button 
            onClick={() => setView('saved')}
            className={`flex-1 flex justify-center py-4 transition-all ${view === 'saved' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-white/20'}`}
          >
            <Icons.Bookmark />
          </button>
        </div>

        {/* GRILLE DE CONTENU FILTRÉE */}
        <div className="grid grid-cols-3 gap-2 mt-4 pb-20">
          {(view === 'posts' ? myPosts : savedPosts).map(post => (
            <div key={post.id} className="aspect-square bg-[#10141d] rounded-xl overflow-hidden border border-white/5 relative group">
              {post.media ? (
                <img src={post.media} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="post" />
              ) : (
                <div className="p-3 text-[8px] font-medium text-white/40 overflow-hidden leading-tight">
                  {post.content}
                </div>
              )}
              {/* Overlay info au survol */}
              <div className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs font-black">❤️ {post.likes}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Message si vide */}
        {(view === 'posts' ? myPosts : savedPosts).length === 0 && (
          <div className="text-center py-20 opacity-10 font-black uppercase tracking-widest text-xs">
            Aucun contenu ici
          </div>
        )}

      </main>
    </div>
  )
}