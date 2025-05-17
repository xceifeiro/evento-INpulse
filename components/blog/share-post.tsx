"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Link2, Share2 } from "lucide-react"
import { useState } from "react"

interface SharePostProps {
  title: string
  url: string
}

export function SharePost({ title, url }: SharePostProps) {
  const [copied, setCopied] = useState(false)

  // Função para copiar o link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // URLs para compartilhamento
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Share2 className="h-4 w-4" /> Compartilhe este artigo
      </h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
          onClick={() => window.open(facebookUrl, "_blank")}
        >
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90"
          onClick={() => window.open(twitterUrl, "_blank")}
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
          onClick={() => window.open(linkedinUrl, "_blank")}
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>
        <Button variant="outline" size="sm" onClick={copyToClipboard}>
          <Link2 className="h-4 w-4 mr-2" />
          {copied ? "Copiado!" : "Copiar Link"}
        </Button>
      </div>
    </div>
  )
}
