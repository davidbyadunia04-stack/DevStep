"use client"
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function FeedPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Jordan_Dev",
      content: "Je viens de déployer ma première API sur DEVSTEP ! Trop fier. 🚀",
      likes: 12,
      comments: [
        { id: 1, user: "Sarah_Code", text: "GG ! C'était quoi le stack ?" },
      ]
    }
  ])

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white pb-20 font-sans">
      <nav className="p-6 border-b border-white/5 sticky top-0 bg-[#0b0e14]/90 backdrop-blur-xl z-50 flex justify-between">
        <Link href="/" className="font-black italic text-blue-600 tracking-tighter">DEVSTEP</Link>
        <Link href="/" className="text-[10px] font-black uppercase opacity-50 tracking-widest">Quitter</Link>
      </nav>

      <main className="max-w-xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-black italic mb-10 tracking-tighter uppercase">Le <span className="text-blue-600">Feed.</span></h1>
        
        <div className="space-y-10">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  )
}

function PostCard({ post }: { post: any }) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState(post.comments)
  const [liked, setLiked] = useState(false)

  const addComment = () => {
    if (!commentText.trim()) return
    const newComment = {
      id: Date.now(),
      user: "Moi",
      text: commentText
    }
    setComments([...comments, newComment])
    setCommentText("")
  }

  return (
    <div className="border-b border-white/5 pb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500" />
        <span className="font-black italic text-[11px] uppercase tracking-wider">@{post.user}</span>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed mb-6">{post.content}</p>

      <div className="flex gap-8 items-center mb-6">
        <button onClick={() => setLiked(!liked)} className="flex items-center gap-2 group">
          <motion.span animate={{ scale: liked ? [1, 1.5, 1] : 1 }} className={liked ? "text-red-500" : "text-gray-500"}>
            {liked ? "❤️" : "🤍"}
          </motion.span>
          <span className="text-[10px] font-black uppercase opacity-40">{post.likes + (liked ? 1 : 0)}</span>
        </button>

        <button 
          onClick={() => setShowComments(!showComments)}
          className="text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-all tracking-widest"
        >
          {comments.length} Commentaires
        </button>
      </div>

      {/* ZONE COMMENTAIRES */}
      <AnimatePresence>
        {showComments && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white/[0.02] rounded-3xl p-4 border border-white/5"
          >
            <div className="space-y-4 mb-4">
              {comments.map((c: any) => (
                <div key={c.id} className="text-xs">
                  <span className="text-blue-500 font-bold mr-2 uppercase">@{c.user}</span>
                  <span className="text-gray-400">{c.text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 border-t border-white/5 pt-4">
              <input 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Ajouter un commentaire..."
                className="flex-1 bg-transparent border-none outline-none text-xs text-gray-300"
              />
              <button 
                onClick={addComment}
                className="text-blue-600 font-black uppercase text-[10px] tracking-tighter"
              >
                Envoyer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}