import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0b0e14] text-white p-6 text-center">
      {/* Logo / Nom */}
      <h1 className="text-6xl font-black italic tracking-tighter text-blue-500 mb-4">DEVSTEP</h1>
      <p className="text-gray-400 font-bold uppercase tracking-[0.3em] mb-12 text-sm">Hébergement Cloud Haute Performance</p>

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
        <Link href="/upload" className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all">
          Déposer un fichier
        </Link>
        <Link href="/login" className="flex-1 py-4 bg-[#1a1f2b] border border-white/10 hover:border-white/30 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
          Se Connecter
        </Link>
      </div>

      {/* Info footer */}
      <div className="mt-16 grid grid-cols-3 gap-8 opacity-40 grayscale">
        <div className="text-[10px] font-bold uppercase italic">Sécurisé</div>
        <div className="text-[10px] font-bold uppercase italic">Rapide</div>
        <div className="text-[10px] font-bold uppercase italic">Gratuit</div>
      </div>
    </div>
  );
}