import type { CreatePost } from "./types";

export function toCreatePostPayload(post: CreatePost): Record<string, any> {
    return {
        content: post.content,
        cover_image: post.cover_image,
        excerpt: post.excerpt,
        read_time: post.read_time,
        slug: post.slug,
        tags: post.tags,
        title: post.title
    }
}