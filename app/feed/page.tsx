"use client"
import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function FeedPage() {
  // --- ÉTAT DES STORIES ---
  const [stories, setStories] = useState([
    { id: 1, user: "Jordan", color: "from-blue-600 to-purple-600" },
    { id: 2, user: "Sarah", color: "from-pink-500 to-orange-400" },
    { id: 3, user: "Dev_Max", color: "from-green-400 to-blue-500" },
  ])

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Jordan_Dev",
      content: "Le nouveau système de déploiement est incroyable ! 🚀",
      likes: 12,
      comments: [
        { id: 1, user: "Sarah_Code", text: "Je confirme, c'est ultra rapide." },
      ]
    }
  ])

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white pb-20 font-sans">
      <nav className="p-6 border-b border-white/5 sticky top-0 bg-[#0b0e14]/90 backdrop-blur-xl z-50 flex justify-between items-center">
        <Link href="/" className="font-black italic text-blue-600 tracking-tighter text-xl">DEVSTEP</Link>
        <Link href="/" className="text-[10px] font-black uppercase opacity-50 tracking-widest">Quitter</Link>
      </nav>

      <main className="max-w-xl mx-auto px-4">
        
        {/* --- SECTION STORIES --- */}
        <div className="flex gap-4 overflow-x-auto py-8 no-scrollbar">
          <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-xl bg-white/5 hover:bg-white/10 transition-all">+</div>
            <span className="text-[9px] font-black uppercase opacity-40 italic">Story</span>
          </div>
          {stories.map(story => (
            <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${story.color} p-[3px] group-hover:scale-105 transition-transform`}>
                <div className="w-full h-full rounded-full bg-[#0b0e14] border-2 border-[#0b0e14]" />
              </div>
              <span className="text-[9px] font-black uppercase opacity-60">{story.user}</span>
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-black italic mb-8 tracking-tighter uppercase">Flux <span className="text-blue-600">Communauté</span></h1>
        
        <div className="space-y-12">
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
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  const addComment = () => {
    if (!commentText.trim()) return
    const newComment = { id: Date.now(), user: "Moi", text: commentText }
    setComments([...comments, newComment])
    setCommentText("")
  }

  const deleteComment = (id: number) => {
    setComments(comments.filter((c: any) => c.id !== id))
  }

  const startEdit = (c: any) => {
    setEditingId(c.id)
    setEditText(c.text)
  }

  const saveEdit = (id: number) => {
    setComments(comments.map((c: any) => c.id === id ? { ...c, text: editText } : c))
    setEditingId(null)
  }

  return (
    <div className="border-b border-white/5 pb-10">
      <div className="flex items-center gap-3 mb-4 font-black italic text-[11px] uppercase tracking-wider">
        <div className="w-8 h-8 rounded-full bg-blue-600" />
        @{post.user}
      </div>

      <p className="text-sm text-gray-300 leading-relaxed mb-6">{post.content}</p>

      <button 
        onClick={() => setShowComments(!showComments)}
        className="text-[10px] font-black uppercase opacity-40 hover:opacity-100 tracking-widest mb-6"
      >
        {comments.length} Commentaires
      </button>

      <AnimatePresence>
        {showComments && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.02] rounded-3xl p-5 border border-white/5">
            <div className="space-y-6 mb-6">
              {comments.map((c: any) => (
                <div key={c.id} className="group">
                  <div className="flex justify-between items-start">
                    <div className="text-xs">
                      <span className="text-blue-500 font-bold mr-2 uppercase italic">@{c.user}</span>
                      {editingId === c.id ? (
                        <input 
                          className="bg-white/5 border-none outline-none text-white p-1 rounded"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onBlur={() => saveEdit(c.id)}
                          autoFocus
                        />
                      ) : (
                        <span className="text-gray-400">{c.text}</span>
                      )}
                    </div>
                    
                    {/* OPTIONS SUPPRIMER / MODIFIER (Apparaissent au survol) */}
                    {c.user === "Moi" && (
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => startEdit(c)} className="text-[9px] font-bold text-gray-500 hover:text-white uppercase">Éditer</button>
                        <button onClick={() => deleteComment(c.id)} className="text-[9px] font-bold text-red-500/50 hover:text-red-500 uppercase">Supprimer</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 border-t border-white/5 pt-4">
              <input 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Ton avis..."
                className="flex-1 bg-transparent border-none outline-none text-xs text-gray-300"
              />
              <button onClick={addComment} className="bg-blue-600 px-4 py-2 rounded-full text-[9px] font-black uppercase">Post</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}