export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[#11141d] text-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-black mb-8 italic text-blue-500">Hébergement de fichiers</h1>
      
      {/* Zone de Drop */}
      <div className="w-full max-w-2xl border-2 border-dashed border-blue-500/30 bg-[#1a1f2b] rounded-[40px] p-20 flex flex-col items-center justify-center hover:border-blue-500 transition-all cursor-pointer group shadow-2xl">
        <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <span className="text-4xl">☁️</span>
        </div>
        
        <h2 className="text-xl font-bold mb-2">Glissez-déposez vos fichiers ici</h2>
        <p className="text-gray-500 text-sm mb-6">Ou cliquez pour parcourir vos documents</p>
        
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
          Sélectionner un fichier
        </button>
        
        <input type="file" className="hidden" id="fileInput" />
      </div>

      <p className="mt-10 text-[10px] text-gray-600 uppercase font-bold tracking-[0.2em]">
        Taille max : 500 MB | Formats acceptés : PDF, PNG, JPG, ZIP
      </p>
    </div>
  );
}