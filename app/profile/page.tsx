"use client"
import { useState } from 'react'
import Link from 'next/link'

const Icons = {
  Back: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  Settings: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
  Globe: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white font-sans">
      
      {/* HEADER NAV */}
      <nav className="p-6 flex justify-between items-center bg-[#0b0e14]/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/feed" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all"><Icons.Back /></Link>
        <span className="font-black uppercase text-[10px] tracking-[0.3em]">Profil Développeur</span>
        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all"><Icons.Settings /></button>
      </nav>

      {/* HERO SECTION */}
      <div className="h-48 bg-gradient-to-b from-blue-900/20 to-transparent relative border-b border-white/5">
        <div className="absolute -bottom-12 left-8 p-1 bg-[#0b0e14] rounded-3xl border border-white/5">
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-2xl shadow-2xl shadow-blue-600/20" />
        </div>
      </div>

      <main className="max-w-xl mx-auto px-8 pt-16">
        {/* INFOS USER */}
        <div className="mb-10">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-1">Shoncs <span className="text-blue-500">.</span></h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Icons.Globe /> Fullstack Developer
          </p>
          <p className="mt-4 text-sm text-gray-300 leading-relaxed max-w-sm">
            En train de build DEVSTEP. Passionné par Next.js, Tailwind et les designs futuristes.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[ {l: 'Posts', v: '14'}, {l: 'Projets', v: '3'}, {l: 'Karma', v: '850'} ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-3xl text-center">
              <div className="text-xl font-black italic text-blue-500">{s.v}</div>
              <div className="text-[8px] font-black uppercase text-gray-500 tracking-widest">{s.l}</div>
            </div>
          ))}
        </div>

        {/* TAB NAVIGATION DANS LE PROFIL */}
        <div className="flex gap-8 border-b border-white/5 mb-8 overflow-x-auto no-scrollbar">
           <button className="pb-4 border-b-2 border-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">Mes Projets</button>
           <button className="pb-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-all text-nowrap">Git Repos</button>
           <button className="pb-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-all">Activités</button>
        </div>

        {/* LISTE DES PROJETS (EMPTY STATE STYLÉ) */}
        <div className="space-y-4">
           <div className="group bg-[#161b22] border border-white/5 p-6 rounded-[35px] hover:border-blue-600/30 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black italic uppercase text-sm group-hover:text-blue-500 transition-colors">DEVSTEP_WEB</h3>
                <span className="text-[8px] bg-blue-600/20 text-blue-500 px-2 py-1 rounded-md font-bold uppercase">En cours</span>
              </div>
              <p className="text-xs text-gray-500 mb-4 line-clamp-2 italic">La plateforme sociale ultime pour les développeurs Next.js.</p>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}