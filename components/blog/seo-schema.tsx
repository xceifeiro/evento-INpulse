import Script from "next/script"
import type { Post } from "@/lib/blog/types"

interface SEOSchemaProps {
  post: Post
  url: string
}

export function SEOSchema({ post, url }: SEOSchemaProps) {
  // Formatar a data para o formato ISO
  const publishDate = post.publishedAt || post.createdAt
  const modifiedDate = post.updatedAt

  // Criar o schema para o artigo
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    image: post.featuredImage ? [post.featuredImage] : [],
    datePublished: publishDate,
    dateModified: modifiedDate,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
        }
      : {
          "@type": "Organization",
          name: "INpulse",
        },
    publisher: {
      "@type": "Organization",
      name: "INpulse",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://inpulse.com.br"}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  )
}
