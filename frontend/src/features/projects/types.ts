export type ProjectTag = {
    id: number
    name: string
}

export type Project = {
    id: string;
    title: string;
    excerpt: string;
    preview_image: string;
    github_url: string;
    post_url: string;
    created_at: string;
    updated_at: string;
    tags: ProjectTag[]
}