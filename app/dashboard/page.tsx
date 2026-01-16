import { cookies } from 'next/headers'

export default async function DashboardPage() {
  const cookieStore = await cookies();
  
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white p-10">
      <h1 className="text-3xl font-black italic">DASHBOARD EN LIGNE !</h1>
      <p className="mt-4 text-gray-400">Si tu vois ce message, Vercel a enfin réussi.</p>
    </div>
  );
}