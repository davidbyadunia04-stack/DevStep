"use client"
import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function FeedPage() {
  const [postText, setPostText] = useState("")
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [posts, setPosts] = useState<any[]>([])

  const handlePost = () => {
    if (!postText && !selectedFile) return
    const newPost = {
      id: Date.now(),
      user: "Dev_Master",
      content: postText,
      media: selectedFile, // TypeScript acceptera grâce au type any[] du state
      likes: 0
    }
    setPosts([newPost, ...posts])
    setPostText(""); setSelectedFile(null)
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white">
      <nav className="p-5 border-b border-white/5 sticky top-0 bg-[#0b0e14]/80 backdrop-blur-xl z-50 flex justify-between">
        <Link href="/" className="font-black italic text-blue-600">DEVSTEP</Link>
        <Link href="/dashboard" className="text-[10px] font-bold opacity-40">DASHBOARD</Link>
      </nav>

      <main className="max-w-lg mx-auto p-4">
        {/* PUBLIER */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[35px] p-6 mb-10">
          <textarea 
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Écris quelque chose..."
            className="w-full bg-transparent border-none outline-none h-16 text-sm"
          />
          {selectedFile && <img src={selectedFile} className="w-full h-64 object-cover rounded-2xl mb-4" />}
          <div className="flex justify-between items-center border-t border-white/5 pt-4">
            <button onClick={() => fileInputRef.current?.click()} className="text-xl">🖼️</button>
            <input type="file" hidden ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null)} />
            <button onClick={handlePost} className="bg-blue-600 px-8 py-2 rounded-full text-[10px] font-black uppercase">Publier</button>
          </div>
        </div>

        {/* FEED */}
        <div className="space-y-12">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  )
}

// COMPOSANT POST AVEC DOUBLE-CLIC LIKE
function PostCard({ post }: { post: any }) {
  const [liked, setLiked] = useState(false)
  const [showBigHeart, setShowBigHeart] = useState(false)

  const handleDoubleClick = () => {
    setLiked(true)
    setShowBigHeart(true)
    setTimeout(() => setShowBigHeart(false), 800)
  }

  return (
    <div className="group">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-600" />
        <span className="font-black italic text-xs uppercase">@{post.user}</span>
      </div>

      <p className="text-sm text-gray-300 mb-4">{post.content}</p>

      {post.media && (
        <div className="relative rounded-[30px] overflow-hidden border border-white/5 bg-black" onDoubleClick={handleDoubleClick}>
          <img src={post.media} className="w-full object-cover" />
          
          {/* CŒUR ANIMÉ AU MILIEU (COMME INSTA) */}
          <AnimatePresence>
            {showBigHeart && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 2, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center text-6xl shadow-inner pointer-events-none"
              >
                ❤️
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="mt-4 flex gap-4">
        <button onClick={() => setLiked(!liked)} className="text-xl">
          {liked ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  )
}