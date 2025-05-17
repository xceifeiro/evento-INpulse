"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDate } from "@/lib/blog/utils"
import { Loader2, MessageSquare, ThumbsUp } from "lucide-react"

interface Comment {
  id: string
  post_id: string
  name: string
  email: string
  content: string
  created_at: string
  likes: number
}

export function Comments({ postId, postSlug }: { postId: string; postSlug: string }) {
  const supabase = createClientComponentClient()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  })
  const [likedComments, setLikedComments] = useState<string[]>([])

  // Carregar comentários
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("blog_comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false })

      if (data) {
        setComments(data)
      }
      setLoading(false)
    }

    // Carregar comentários curtidos do localStorage
    const loadLikedComments = () => {
      const saved = localStorage.getItem("likedComments")
      if (saved) {
        try {
          setLikedComments(JSON.parse(saved))
        } catch (e) {
          console.error("Erro ao carregar comentários curtidos:", e)
        }
      }
    }

    fetchComments()
    loadLikedComments()
  }, [postId, supabase])

  // Atualizar campo do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Enviar comentário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.content) return

    setSubmitting(true)
    try {
      const { data, error } = await supabase
        .from("blog_comments")
        .insert({
          post_id: postId,
          name: formData.name,
          email: formData.email,
          content: formData.content,
          likes: 0,
        })
        .select()

      if (error) {
        throw error
      }

      if (data) {
        setComments([data[0], ...comments])
        setFormData({
          name: "",
          email: "",
          content: "",
        })
      }
    } catch (error) {
      console.error("Erro ao enviar comentário:", error)
      alert("Ocorreu um erro ao enviar seu comentário. Por favor, tente novamente.")
    } finally {
      setSubmitting(false)
    }
  }

  // Curtir comentário
  const handleLike = async (commentId: string) => {
    // Verificar se já curtiu
    if (likedComments.includes(commentId)) return

    try {
      // Atualizar localmente primeiro para UI responsiva
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }
        return comment
      })
      setComments(updatedComments)

      // Atualizar no banco de dados
      const { error } = await supabase
        .from("blog_comments")
        .update({ likes: comments.find((c) => c.id === commentId)!.likes + 1 })
        .eq("id", commentId)

      if (error) {
        throw error
      }

      // Salvar no localStorage
      const newLikedComments = [...likedComments, commentId]
      setLikedComments(newLikedComments)
      localStorage.setItem("likedComments", JSON.stringify(newLikedComments))
    } catch (error) {
      console.error("Erro ao curtir comentário:", error)
    }
  }

  return (
    <div className="mt-10 pt-8 border-t border-gray-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Comentários ({comments.length})
      </h2>

      {/* Formulário de comentário */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-medium mb-4">Deixe seu comentário</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2 mb-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Seu nome"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Seu email (não será publicado)"
              />
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="content">Comentário</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Escreva seu comentário aqui..."
              rows={4}
            />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
              </>
            ) : (
              "Enviar Comentário"
            )}
          </Button>
        </form>
      </div>

      {/* Lista de comentários */}
      {loading ? (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-[#821423]" />
          <p>Carregando comentários...</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Seja o primeiro a comentar!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-[#1a8c91] text-white">
                    {comment.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{comment.name}</h4>
                      <p className="text-xs text-gray-500">{formatDate(comment.created_at)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-[#821423]"
                      onClick={() => handleLike(comment.id)}
                      disabled={likedComments.includes(comment.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {comment.likes}
                    </Button>
                  </div>
                  <div className="mt-2 text-gray-700">{comment.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
