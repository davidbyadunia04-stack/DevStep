import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-sm border-b border-blue-50">
        <div className="flex items-center gap-2 font-bold text-2xl text-blue-600">
          <span>🚀</span> DevStep
        </div>
        <Link href="/register" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition shadow-lg">
          Rejoindre gratuitement
        </Link>
      </nav>

      <header className="max-w-4xl mx-auto pt-20 pb-12 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-slate-900">
          Héberge ton site, <br />
          <span className="text-blue-600">progresse avec les autres.</span>
        </h1>
        <p className="text-xl text-slate-500 mb-12">
          Un espace sécurisé et bienveillant pour les jeunes développeurs.
        </p>

        <Link href="/register" className="inline-block max-w-2xl w-full p-12 border-4 border-dashed border-blue-100 rounded-[2.5rem] bg-white hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer shadow-xl group">
          <div className="text-7xl mb-4 group-hover:scale-110 transition-transform text-center">📁</div>
          <h3 className="text-2xl font-bold text-center text-slate-900">Glisse ton dossier ici</h3>
          <p className="text-slate-400 mt-2 text-center text-sm italic underline">Crée un compte pour commencer</p>
        </Link>
      </header>
    </main>
  );
}