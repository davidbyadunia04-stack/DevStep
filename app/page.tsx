"use client"
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-[#0b0e14] text-white flex flex-col font-sans">
      <nav className="w-full py-5 px-10 flex justify-between items-center border-b border-white/5 bg-[#0b0e14]/80 backdrop-blur-md fixed top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/icon.png" alt="Logo" width={35} height={35} className="rounded-full" />
          <span className="text-xl font-black italic text-blue-600 uppercase">DEVSTEP</span>
        </Link>
        <div className="flex gap-8 items-center">
          <Link href="/" className="text-[10px] font-bold uppercase tracking-widest">Accueil</Link>
          <Link href="/feed" className="text-[10px] font-bold uppercase tracking-widest text-blue-400 italic underline underline-offset-4">Communauté</Link>
          <a href="https://discord.gg/MsZ455Yh" target="_blank" className="px-5 py-2 bg-[#5865F2] rounded-xl text-[10px] font-black uppercase">Discord</a>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 mt-32 text-center">
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-8">
          DEV<span className="text-blue-600">STEP.</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
          <Link href="/upload" className="flex-1 py-5 bg-blue-600 rounded-2xl font-black text-xs uppercase transition-all hover:scale-105">Héberger</Link>
          <Link href="/login" className="flex-1 py-5 bg-[#1a1f2b] border border-white/10 rounded-2xl font-black text-xs uppercase transition-all hover:scale-105">Connexion</Link>
        </div>
      </main>
    </div>
  )
}