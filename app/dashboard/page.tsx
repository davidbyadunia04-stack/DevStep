import Image from 'next/image'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* En-tête avec ton nouveau logo */}
      <div className="flex items-center gap-4 mb-8">
        <Image 
          src="/icon.png" 
          alt="Logo DevStep" 
          width={50} 
          height={50} 
          className="rounded-xl shadow-lg"
        />
        <h1 className="text-3xl font-bold text-gray-800">Mon Tableau de Bord</h1>
      </div>

      {/* Reste de ton code (Bannière bleue, réseaux, etc.) */}
    </div>
  )
}