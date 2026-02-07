"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const path = usePathname()
  
  // Style pour le bouton actif
  const active = (p: string) => path === p ? 'text-blue-500 scale-110' : 'text-white/20'

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#10141d]/80 backdrop-blur-2xl border border-white/5 rounded-[40px] px-2 py-3 flex justify-around items-center z-[100] shadow-2xl">
      <Link href="/feed" className={`p-4 transition-all ${active('/feed')}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
      </Link>
      
      <Link href="/search" className={`p-4 transition-all ${active('/search')}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </Link>

      {/* Bouton Central pour Publier (Upload) */}
      <Link href="/upload" className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center border-4 border-[#06090f] text-white text-3xl shadow-lg shadow-blue-600/30 active:scale-95 transition-all">
        +
      </Link>

      <Link href="/play" className={`p-4 transition-all ${active('/play')}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </Link>

      <Link href="/profile" className={`p-4 transition-all ${active('/profile')}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </Link>
    </div>
  )
}