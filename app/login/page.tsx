"use client"
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#d49db1] via-[#8c9fb8] to-[#6d8fb3] p-4">
      <div className="relative w-full max-w-sm p-10 rounded-[40px] bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl flex flex-col items-center">
        <h1 className="text-2xl font-black text-[#0a2342] mb-8 uppercase tracking-widest">Connexion</h1>
        
        <form className="w-full space-y-4">
          <input type="email" placeholder="Email" className="w-full p-4 bg-[#3d5a80]/50 text-white placeholder-white/60 rounded-2xl outline-none border border-transparent focus:border-white/40" />
          <input type="password" placeholder="Mot de passe" className="w-full p-4 bg-[#3d5a80]/50 text-white placeholder-white/60 rounded-2xl outline-none border border-transparent focus:border-white/40" />
          
          <Link href="/dashboard" className="block w-full py-4 bg-[#0a2342] text-center text-white font-black rounded-2xl shadow-lg hover:scale-105 transition-transform uppercase text-xs tracking-widest mt-4">
            SE CONNECTER
          </Link>
        </form>

        {/* SECTION SUPPORT TECHNIQUE */}
        <div className="mt-8 text-center border-t border-[#0a2342]/10 pt-6 w-full">
          <p className="text-[10px] text-[#0a2342]/60 font-bold uppercase mb-1 text-center">Un problème avec votre compte ?</p>
          <a href="mailto:TON_EMAIL@GMAIL.COM" className="text-[11px] text-[#0a2342] underline font-black hover:text-blue-800">
            CONTACTER LE SUPPORT
          </a>
        </div>
      </div>
    </div>
  )
}