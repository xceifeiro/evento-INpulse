export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  author: Author | null
  categories: Category[]
  published: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  views: number
}

export interface Author {
  id: string
  name: string
  email: string | null
  bio: string | null
  avatarUrl: string | null
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
}

export interface PostsResponse {
  posts: Post[]
  count: number
}
