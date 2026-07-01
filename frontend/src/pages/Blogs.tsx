import { useQuery } from "@tanstack/react-query";
import { getPostSummaries } from "../features/posts/api";
import { Navigate } from "react-router-dom";
import BlogCard from "../components/blogs/BlogCard";

function Blog() {
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: [ "posts" ],
    queryFn: () => getPostSummaries(),
  })

  if (isError) {
    return <Navigate to="error" replace state={{error: error?.message || "", summaryError: "Could not load posts:"}}/>    
  }

  return <div className="text-white px-10 py-10 max-w-3xl space-y-8">
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-[#ffaa48] font-mono text-sm">
        <span>~/blogs</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight">Blogs</h1>
      <p className="text-gray-400 text-lg leading-relaxed">
        Deep dives, quick notes, and lessons learned from building things.
      </p>
    </section>
    <section>
      <div>
        {!isLoading?<div className="space-y-3">
          {posts?.map((post, i) => {
            if(i > 2) return // Only display first 3
            const tags = (post.tags ?? []).map((t) => t.name)
            const published_at = post.published_at == null
              ? "N/A"
              : new Date(post.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
            return <BlogCard url={post.title} title={post.title} description={post.excerpt} tags={tags} key={post.id} date={published_at} read_time={post.read_time} image_url={post.cover_image}/>
          })}
        </div>:<div/>}
      </div>
    </section>
  </div>
}

export default Blog;
