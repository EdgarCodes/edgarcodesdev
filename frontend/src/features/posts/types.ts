export type PostTag = {
    id: number
    name: string
}

export type PostSummary = {
    id: string
    slug: string
    title: string
    excerpt: string
    cover_image: string
    status: string
    read_time: string
    published_at: Date
    tags: PostTag[]
}

export type Post = {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    cover_image: string
    status: string
    read_time: string
    published_at: Date
    created_at: Date
    Updated_at: Date
    tags: PostTag[] 
}