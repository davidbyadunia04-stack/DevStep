{/* --- BLOC DONS (À AJOUTER ICI) --- */}
        <div id="donations" className="max-w-4xl w-full mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          
          {/* CARTE RDC (Airtel Money) */}
          <div className="p-8 border border-red-500/20 bg-red-500/[0.03] rounded-[40px] flex flex-col items-center shadow-xl">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-black italic text-[9px]">airtel</span>
            </div>
            <p className="text-red-500 font-black uppercase tracking-widest text-[9px] mb-4">Local (RDC)</p>
            <p className="text-2xl font-mono font-black text-white mb-2">+243 995 909 060</p>
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-6 italic">Envoi direct via Airtel Money</p>
            <button 
              onClick={() => {
                navigator.clipboard.writeText("+243995909060")
                alert("Numéro copié !")
              }} 
              className="w-full py-3 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              Copier le numéro
            </button>
          </div>

          {/* CARTE INTERNATIONAL (Europe / Monde) */}
          <div className="p-8 border border-blue-500/20 bg-blue-500/[0.03] rounded-[40px] flex flex-col items-center shadow-xl">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-4 text-xl">
              🌍
            </div>
            <p className="text-blue-500 font-black uppercase tracking-widest text-[9px] mb-4">International</p>
            <p className="text-gray-300 text-[11px] mb-4 leading-relaxed text-center">
              Via <span className="text-white font-bold">Taptap Send</span> ou <span className="text-white font-bold">WorldRemit</span> vers notre Airtel.
            </p>
            <div className="w-full p-4 bg-white/[0.03] rounded-2xl border border-white/5 text-center">
              <p className="text-[9px] text-gray-500 uppercase font-bold mb-1">Entrez le numéro :</p>
              <p className="text-sm font-mono font-bold text-white">+243 995 909 060</p>
            </div>
          </div>

        </div>
        {/* --- FIN DU BLOC DONS --- */}