import { json } from "../https"
import type { Post, PostSummary } from "./types"

export async function getPostSummaries(): Promise<PostSummary[]> {
    return json<PostSummary[]>("/api/posts")
}

export async function getPostbyID(post_id: string): Promise<Post> {
    return json<Post>("/api/post" + post_id)
}