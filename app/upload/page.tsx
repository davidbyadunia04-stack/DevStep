"use client";
import { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = () => {
    setLoading(true);
    
    // Simulation du téléchargement
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // 1. Son de trompette
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
      audio.play();

      // 2. Explosion de confettis
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 3000); // Attente de 3 secondes
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl p-10 text-center border border-slate-100">
        
        {!success ? (
          <>
            <h1 className="text-3xl font-black mb-4">Prêt à publier ? 🚀</h1>
            <div className={`p-12 border-4 border-dashed rounded-[2rem] transition-all ${loading ? 'border-blue-500 animate-pulse' : 'border-blue-100'}`}>
              <div className="text-6xl mb-4">{loading ? '⚙️' : '📁'}</div>
              <p className="font-bold text-slate-700">{loading ? 'Analyse du projet...' : 'Glisse ton dossier ici'}</p>
            </div>

            <button 
              onClick={handleUpload}
              disabled={loading}
              className={`w-full mt-8 py-5 rounded-2xl font-black text-xl transition shadow-xl ${loading ? 'bg-slate-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {loading ? 'Chargement...' : 'Lancer la mise en ligne'}
            </button>
          </>
        ) : (
          <div className="py-10 animate-bounce">
            <div className="text-8xl mb-6">🎉</div>
            <h2 className="text-4xl font-black text-blue-600 mb-2">FÉLICITATIONS !</h2>
            <p className="text-slate-500 mb-8 font-bold text-lg">Ton projet est officiellement en ligne !</p>
            <Link href="/dashboard" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold">
              Voir mon Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}