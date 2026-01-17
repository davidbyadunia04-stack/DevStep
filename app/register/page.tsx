export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#d49db1] via-[#8c9fb8] to-[#6d8fb3] p-4">
      {/* Carte Glassmorphism */}
      <div className="relative w-full max-w-sm p-8 rounded-[40px] bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl flex flex-col items-center">
        
        <h1 className="text-2xl font-black text-[#0a2342] mb-2 uppercase tracking-tighter">Créer un compte</h1>
        <p className="text-[10px] text-[#0a2342]/60 font-bold mb-6 uppercase">Rejoignez la communauté DevStep</p>
        
        <form className="w-full space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 bg-[#3d5a80]/60 text-white placeholder-white/70 rounded-lg outline-none border border-transparent focus:border-white/50" 
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            className="w-full p-3 bg-[#3d5a80]/60 text-white placeholder-white/70 rounded-lg outline-none border border-transparent focus:border-white/50" 
          />
          
          <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all uppercase tracking-widest text-xs">
            S'inscrire
          </button>
        </form>

        <div className="mt-6">
           <p className="text-[11px] text-[#0a2342] font-bold uppercase">
             Déjà un membre ? <a href="/login" className="underline hover:text-blue-700">Se connecter</a>
           </p>
        </div>
      </div>
    </div>
  );
}