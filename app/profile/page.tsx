"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const [user, setUser] = useState("")
  const [stats, setStats] = useState({ posts: 0, following: 0 })
  const [myPosts, setMyPosts] = useState([])

  useEffect(() => {
    const currentUser = localStorage.getItem('devstep_user') || ""
    const allPosts = JSON.parse(localStorage.getItem('devstep_posts') || "[]")
    const followList = JSON.parse(localStorage.getItem('devstep_following') || "[]")
    
    setUser(currentUser)
    const userPosts = allPosts.filter((p: any) => p.userId === currentUser)
    setMyPosts(userPosts)
    setStats({ posts: userPosts.length, following: followList.length })
  }, [])

  return (
    <div className="min-h-screen bg-[#06090f] text-white p-8">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-900 rounded-[35px] mx-auto mb-4 border-4 border-white/5 shadow-2xl" />
        <h1 className="text-2xl font-black italic text-blue-500">@{user}</h1>
        <div className="flex justify-center gap-12 mt-8 border-y border-white/5 py-6">
          <div><p className="text-xl font-black">{stats.posts}</p><p className="text-[10px] opacity-30 uppercase font-black">Posts</p></div>
          <div><p className="text-xl font-black">{stats.following}</p><p className="text-[10px] opacity-30 uppercase font-black">Following</p></div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-8">
          {myPosts.map((p: any) => (
            <div key={p.id} className="aspect-square bg-[#10141d] rounded-xl overflow-hidden border border-white/5">
              {p.media ? <img src={p.media} className="w-full h-full object-cover" /> : <p className="p-2 text-[8px] opacity-20">{p.content}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}