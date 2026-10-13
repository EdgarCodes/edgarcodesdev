import { json } from "../https"
import type { Post, PostSummary, CreatePostResponse, CreatePost } from "./types"
import { toCreatePostPayload } from "./utils"

export async function getPostSummaries(): Promise<PostSummary[]> {
    return json<PostSummary[]>("/api/posts")
}

export async function getPostbyID(post_id: string): Promise<Post> {
    return json<Post>("/api/post/" + post_id)
}

export async function getPostbySlug(post_slug: string): Promise<Post> {
    return json<Post>("/api/post/slug/" + post_slug)
}


export async function createPost(post: CreatePost, token: string): Promise<CreatePostResponse> {
    return json<CreatePostResponse>("/api/post", {method: "POST", body: toCreatePostPayload(post), headers: {"X-API-Key": token}})
}