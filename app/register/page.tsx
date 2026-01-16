import Link from 'next/link';

export default function LoginPage() {
  return (
    // Fond avec dégradé fluide
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      
      {/* Carte avec effet de verre */}
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl">
        
        {/* Icône de profil cercle bleu foncé */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#1a365d] rounded-full flex items-center justify-center border-4 border-white/50 shadow-lg">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <form className="mt-8 space-y-6">
          {/* Champ Email */}
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email ID" 
              className="w-full pl-12 pr-4 py-3 bg-[#2d4a6d]/80 text-white placeholder-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute left-4 top-3.5 text-gray-300">👤</span>
          </div>

          {/* Champ Password */}
          <div className="relative">
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full pl-12 pr-4 py-3 bg-[#2d4a6d]/80 text-white placeholder-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute left-4 top-3.5 text-gray-300">🔒</span>
          </div>

          {/* Options supplémentaires */}
          <div className="flex items-center justify-between text-xs text-blue-900 font-medium">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2 rounded" /> Remember me
            </label>
            <button type="button" className="hover:underline">Forgot Password?</button>
          </div>

          {/* Bouton Login */}
          <button className="w-full py-3 bg-[#1a365d] text-white font-bold rounded-xl shadow-lg hover:bg-blue-900 transition-all uppercase tracking-widest text-sm">
            Login
          </button>
        </form>

        {/* LIEN DE CONTACT (Ta demande spécifique) */}
        <div className="mt-8 text-center border-t border-white/20 pt-4">
          <p className="text-sm text-blue-900">
            Un problème ? <a href="mailto:ton-email@exemple.com" className="font-bold hover:underline underline-offset-4">Contactez-nous par email</a>
          </p>
        </div>

      </div>
    </div>
  );
}