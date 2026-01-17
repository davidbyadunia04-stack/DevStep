import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0b0e14] text-white p-6">
      {/* Titre principal avec style néon */}
      <h1 className="text-7xl font-black italic tracking-tighter text-blue-600 mb-2 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">
        DEVSTEP
      </h1>
      <p className="text-gray-500 font-bold uppercase tracking-[0.4em] mb-12 text-[10px] text-center">
        Cloud Hosting & File Sharing
      </p>

      {/* Les deux gros boutons de navigation */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
        <Link href="/upload" className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all hover:scale-105">
          Drop a File
        </Link>
        <Link href="/login" className="flex-1 py-5 bg-[#1a1f2b] border border-white/10 hover:border-white/30 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all hover:scale-105">
          Sign In
        </Link>
      </div>

      {/* Petit footer discret */}
      <div className="mt-20 opacity-20 flex gap-8 text-[10px] font-bold uppercase tracking-widest">
        <span>Fast</span>
        <span>Secure</span>
        <span>Unlimited</span>
      </div>
    </div>
  )
}