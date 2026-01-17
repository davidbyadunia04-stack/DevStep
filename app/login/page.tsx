export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#d49db1] via-[#8c9fb8] to-[#6d8fb3] p-4">
      <div className="relative w-full max-w-sm p-10 rounded-[40px] bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl flex flex-col items-center">
        <h1 className="text-2xl font-black text-[#0a2342] mb-8 uppercase tracking-widest">Connexion</h1>
        
        <form className="w-full space-y-4">
          <input type="email" placeholder="Email" className="w-full p-4 bg-[#3d5a80]/50 text-white placeholder-white/60 rounded-2xl outline-none border border-transparent focus:border-white/40 transition-all" />
          <input type="password" placeholder="Mot de passe" className="w-full p-4 bg-[#3d5a80]/50 text-white placeholder-white/60 rounded-2xl outline-none border border-transparent focus:border-white/40 transition-all" />
          <button className="w-full py-4 bg-[#0a2342] text-white font-black rounded-2xl shadow-lg hover:scale-105 transition-transform uppercase text-xs tracking-widest mt-4">
            Entrer
          </button>
        </form>

        <p className="mt-8 text-[10px] text-[#0a2342] font-bold uppercase tracking-tighter">
          Pas de compte ? <a href="/register" className="underline text-blue-800">Inscris-toi</a>
        </p>
      </div>
    </div>
  );
}