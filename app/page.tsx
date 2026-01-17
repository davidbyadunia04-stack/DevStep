import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#d49db1] via-[#8c9fb8] to-[#6d8fb3] text-[#0a2342]">
      <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">DevStep</h1>
      <p className="text-sm font-bold mb-10 opacity-70 uppercase tracking-widest">Bienvenue sur votre plateforme</p>
      
      <div className="flex gap-4">
        <Link href="/login" className="px-8 py-3 bg-[#0a2342] text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
          CONNEXION
        </Link>
        <Link href="/register" className="px-8 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
          S'INSCRIRE
        </Link>
      </div>

      <Link href="/dashboard" className="mt-10 text-xs font-bold underline opacity-50 hover:opacity-100">
        Accéder directement au Dashboard (Démo)
      </Link>
    </div>
  );
}