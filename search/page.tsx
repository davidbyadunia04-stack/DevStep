"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

const Icons = {
  Back: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>,
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  UserAdd: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [following, setFollowing] = useState<string[]>([])

  useEffect(() => {
    const followList = JSON.parse(localStorage.getItem('devstep_following') || "[]")
    setFollowing(followList)
  }, [])

  const handleSearch = (val: string) => {
    setQuery(val)
    const allPosts = JSON.parse(localStorage.getItem('devstep_posts') || "[]")
    const filtered = allPosts.filter((p: any) => 
      p.content.toLowerCase().includes(val.toLowerCase()) || 
      p.userId.toLowerCase().includes(val.toLowerCase())
    )
    setResults(filtered)
  }

  const toggleFollow = (uId: string) => {
    const updated = following.includes(uId) ? following.filter(id => id !== uId) : [...following, uId]
    setFollowing(updated)
    localStorage.setItem('devstep_following', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-[#06090f] text-white p-6">
      <div className="max-w-xl mx-auto flex items-center gap-4 mb-8">
        <Link href="/feed" className="p-3 bg-white/5 rounded-full border border-white/5"><Icons.Back /></Link>
        <div className="flex-1 relative">
          <Icons.Search />
          <input 
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Rechercher un @ami..."
            className="w-full bg-[#10141d] border border-blue-500/20 rounded-[25px] py-4 pl-12 pr-6 outline-none focus:border-blue-500 font-bold"
          />
        </div>
      </div>
      <div className="max-w-xl mx-auto space-y-4">
        {Array.from(new Set(results.map(p => p.userId))).map((uId: any) => (
          <div key={uId} className="bg-[#10141d] p-4 rounded-[25px] border border-white/5 flex justify-between items-center">
            <span className="font-black italic text-blue-400">@{uId}</span>
            <button onClick={() => toggleFollow(uId)} className="p-3 rounded-full bg-blue-600">
              {following.includes(uId) ? <Icons.Check /> : <Icons.UserAdd />}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}