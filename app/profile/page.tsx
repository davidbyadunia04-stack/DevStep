"use client"
import { useState } from 'react'
import Link from 'next/link'

const Icons = {
  Back: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  Settings: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
  Edit: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
  Grid: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
}

export default function ProfilePage() {
  const [user] = useState({
    username: "Shoncs",
    bio: "Building the future of DEVSTEP 🚀 | Fullstack Designer",
    followers: "12.8k",
    following: "482",
    postsCount: 142
  })

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans selection:bg-blue-500/30">
      
      {/* HEADER PROFIL */}
      <nav className="p-5 flex justify-between items-center sticky top-0 bg-[#0b0e14]/90 backdrop-blur-xl z-[100] border-b border-white/5">
        <Link href="/feed" className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <Icons.Back />
        </Link>
        <h1 className="font-black italic uppercase tracking-widest text-sm">Profil</h1>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <Icons.Settings />
        </button>
      </nav>

      <main className="max-w-xl mx-auto p-6">
        
        {/* INFOS UTILISATEUR */}
        <div className="flex flex-col items-center text-center mt-4">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-[#0b0e14] border-2 border-[#0b0e14] overflow-hidden">
                <div className="w-full h-full bg-blue-500/20 flex items-center justify-center text-4xl font-black italic text-blue-500">
                  S
                </div>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-4 border-[#0b0e14] hover:scale-110 transition-transform">
              <Icons.Edit />
            </button>
          </div>

          <h2 className="mt-6 text-2xl font-black italic uppercase tracking-tighter">@{user.username}</h2>
          <p className="mt-2 text-gray-400 text-sm font-medium max-w-xs">{user.bio}</p>

          {/* STATS */}
          <div className="flex gap-8 mt-8 w-full justify-center border-y border-white/5 py-6">
            <div className="text-center">
              <div className="font-black text-lg">{user.postsCount}</div>
              <div className="text-[10px] uppercase font-black text-white/30 tracking-widest">Posts</div>
            </div>
            <div className="text-center border-x border-white/5 px-8">
              <div className="font-black text-lg">{user.followers}</div>
              <div className="text-[10px] uppercase font-black text-white/30 tracking-widest">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-black text-lg">{user.following}</div>
              <div className="text-[10px] uppercase font-black text-white/30 tracking-widest">Following</div>
            </div>
          </div>
        </div>

        {/* TABS GRILLE / POSTS */}
        <div className="mt-8 flex justify-center border-b border-white/5">
          <button className="pb-4 px-8 border-b-2 border-blue-600 flex items-center gap-2">
            <Icons.Grid />
            <span className="text-[10px] font-black uppercase tracking-widest">Mes Projets</span>
          </button>
        </div>

        {/* GRILLE DE POSTS (VIDE POUR L'INSTANT) */}
        <div className="grid grid-cols-3 gap-1 mt-1 pb-20">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-white/5 animate-pulse rounded-sm border border-white/5 hover:bg-blue-600/10 transition-colors cursor-pointer" />
          ))}
        </div>
      </main>

      {/* BOUTON FLOTTANT RETOUR FEED */}
      <Link href="/feed" className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all z-[100]">
        Retour au Feed
      </Link>
    </div>
  )
}