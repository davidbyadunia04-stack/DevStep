'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/register');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        
        {/* En-tête du Dashboard */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Tableau de bord</h1>
          <button 
            onClick={handleLogout}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg transition"
          >
            Déconnexion
          </button>
        </div>

        <div className="grid gap-6">
          
          {/* CARTE : BIENVENUE */}
          <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg">
            <h2 className="text-xl font-semibold">Heureux de vous revoir ! 👋</h2>
            <p className="mt-2 opacity-90">Ton compte DevStep est actif et prêt pour l'aventure.</p>
          </div>

          {/* CARTE : MES RÉSEAUX */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center">
              <span className="mr-2">🔗</span> Mes réseaux
            </h3>
            
            <div className="space-y-3">
              {/* Discord */}
              <a 
                href="https://discord.gg/TON_INVITATION" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-[#5865F2]/10 text-[#5865F2] rounded-xl hover:bg-[#5865F2]/20 transition font-medium"
              >
                <div className="flex items-center">
                  <span className="mr-3 text-2xl">🎮</span> Discord
                </div>
                <span className="text-xs bg-[#5865F2] text-white px-3 py-1 rounded-full uppercase tracking-wider font-bold">Rejoindre</span>
              </a>

              {/* Gmail */}
              <a 
                href="mailto:davidbyadunia04@gmail.com" 
                className="flex items-center justify-between p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition font-medium"
              >
                <div className="flex items-center">
                  <span className="mr-3 text-2xl">✉️</span> Gmail
                </div>
                <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full uppercase tracking-wider font-bold">Écrire</span>
              </a>
            </div>

            {/* Texte pour le futur */}
            <div className="mt-8 pt-4 border-t border-dashed border-gray-200">
              <p className="text-xs text-gray-400 text-center italic">
                Bientôt, d'autres réseaux seront ajoutés pour rester connectés avec la communauté !
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}