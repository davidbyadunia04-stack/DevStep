"use client"
import { useState, useRef } from 'react'
import Link from 'next/link'

// --- TYPES ---
interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  isFollowed: boolean;
  stats: { views: number; likes: number; posts: number };
}

interface Post {
  id: number;
  user: string;
  content: string;
  likes: number;
  isLiked: boolean;
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

const Icons = {
  Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Play: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Stats: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  User: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Heart: ({ filled }: { filled?: boolean }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState("")
  
  // Simulation d'une base de données d'utilisateurs
  const [usersDB, setUsersDB] = useState<UserProfile[]>([
    { id: '1', username: 'kingdumode04', fullName: 'King Du Mode', avatar: 'K', isFollowed: false, stats: { views: 1500, likes: 450, posts: 12 } },
    { id: '2', username: 'jordan_dev', fullName: 'Jordan Developer', avatar: 'J', isFollowed: true, stats: { views: 8900, likes: 2100, posts: 45 } },
  ])

  const [posts] = useState<Post[]>([
    { id: 1, user: "jordan_dev", content: "Nouveau tutoriel sur les stats React !", likes: 88, isLiked: false, comments: [] }
  ])

  // Statistiques de "Shoncs" (Toi)
  const myStats = { totalViews: 12450, totalLikes: 3200, engagementRate: "8.4%", growth: "+12%" }

  const handleFollowUser = (username: string) => {
    setUsersDB(usersDB.map(u => u.username === username ? { ...u, isFollowed: !u.isFollowed } : u))
  }

  const filteredUsers = usersDB.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans selection:bg-blue-500/30">
      
      {/* HEADER */}
      {activeTab !== 'play' && (
        <nav className="p-5 flex justify-between items-center sticky top-0 bg-[#0b0e14]/90 backdrop-blur-xl z-[100] border-b border-white/5">
          <div className="font-black italic text-blue-500 text-2xl tracking-tighter">DEVSTEP</div>
          <button onClick={() => setActiveTab('stats')} className={`flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === 'stats' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400'}`}>
            <Icons.Stats /> Analytics
          </button>
        </nav>
      )}

      <main className="max-w-xl mx-auto p-4 pb-32">

        {/* RECHERCHE DE PERSONNES */}
        {activeTab === 'search' && (
          <div className="animate-in slide-in-from-top-4 duration-500">
            <input 
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un profil (ex: kingdumode04)..."
              className="w-full bg-[#161b22] border border-white/10 rounded-2xl py-5 px-6 outline-none focus:border-blue-500/50 shadow-2xl mb-8"
            />
            
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mb-4">Utilisateurs trouvés</h3>
              {filteredUsers.map(user => (
                <div key={user.id} className="bg-[#161b22] p-4 rounded-3xl flex items-center justify-between border border-white/5 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-black text-xl">{user.avatar}</div>
                    <div>
                      <p className="font-black text-sm uppercase italic">@{user.username}</p>
                      <p className="text-[10px] text-gray-500">{user.fullName}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleFollowUser(user.username)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${user.isFollowed ? 'bg-white/10 text-white/50' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'}`}
                  >
                    {user.isFollowed ? 'Abonné' : 'Suivre'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TABLEAU DE BORD STATS (Analytics) */}
        {activeTab === 'stats' && (
          <div className="animate-in zoom-in-95 duration-500 space-y-6 pt-4">
            <h2 className="text-2xl font-black italic uppercase text-blue-500">Tes Performances</h2>
            
            {/* Cartes Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#161b22] p-6 rounded-[30px] border border-white/5">
                <p className="text-[9px] font-black text-gray-500 uppercase mb-2">Vues Totales</p>
                <p className="text-2xl font-black">{myStats.totalViews.toLocaleString()}</p>
                <span className="text-green-500 text-[10px] font-bold">{myStats.growth} cette semaine</span>
              </div>
              <div className="bg-[#161b22] p-6 rounded-[30px] border border-white/5">
                <p className="text-[9px] font-black text-gray-500 uppercase mb-2">Likes Reçus</p>
                <p className="text-2xl font-black">{myStats.totalLikes.toLocaleString()}</p>
                <span className="text-blue-500 text-[10px] font-bold">{myStats.engagementRate} engagement</span>
              </div>
            </div>

            {/* Graphique Simplifié Simulation */}
            <div className="bg-[#161b22] p-6 rounded-[30px] border border-white/5 h-48 flex items-end gap-2 justify-between">
              {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-600/20 rounded-t-lg relative group transition-all hover:bg-blue-500" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 font-bold transition-opacity">
                    {h * 120} vues
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FEED HOME */}
        {activeTab === 'home' && (
          <div className="space-y-6 pt-4">
            {posts.map(post => (
              <div key={post.id} className="bg-[#161b22] border border-white/10 rounded-[35px] p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600" />
                  <span className="text-xs font-black italic uppercase text-blue-400">@{post.user}</span>
                </div>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed">{post.content}</p>
                <div className="flex gap-6 border-t border-white/5 pt-4">
                  <button className="flex items-center gap-2 text-[10px] font-black text-white/30 hover:text-red-500 transition-colors">
                    <Icons.Heart /> {post.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* BARRE DE NAVIGATION FIXE */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-[#161b22]/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center z-[100] shadow-2xl">
        <button onClick={() => setActiveTab('home')} className={`p-4 transition-all ${activeTab === 'home' ? 'text-blue-500 scale-125' : 'text-white/30'}`}><Icons.Home /></button>
        <button onClick={() => setActiveTab('search')} className={`p-4 transition-all ${activeTab === 'search' ? 'text-blue-500 scale-125' : 'text-white/30'}`}><Icons.Search /></button>
        <button className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-light hover:bg-blue-500 shadow-xl shadow-blue-600/20 transition-all">+</button>
        <button onClick={() => setActiveTab('play')} className={`p-4 transition-all ${activeTab === 'play' ? 'text-blue-500 scale-125' : 'text-white/30'}`}><Icons.Play /></button>
        <button onClick={() => setActiveTab('stats')} className={`p-4 transition-all ${activeTab === 'stats' ? 'text-blue-500 scale-125' : 'text-white/30'}`}><Icons.Stats /></button>
      </div>
    </div>
  )
}