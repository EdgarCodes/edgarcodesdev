import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getPostbySlug } from "../features/posts/api";
import { getReadableDate } from "../utils/utils";
import Comments from "../components/blogs/Comments";

function Blog() {
  const { blog_slug } = useParams()

  const query = useQuery({
    queryKey: [ "post", blog_slug ],
    queryFn: () => getPostbySlug(blog_slug || "undefined"),
  })

  if (query.isError) {
    return <Navigate to="/not-found" replace state={{error: query.error?.message || "", summaryError: `Could not find post ${blog_slug}:`}}/>
  }

  if (!query.isSuccess) return <div/>

  const post = query.data

  return <div className="text-white px-10 py-10 max-w-3xl space-y-8">
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-[#ffaa48] font-mono text-sm">
        <span>~/blog/{blog_slug}</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
      <div className="flex gap-2 flex-wrap">
        {post.tags.map((tag) => (
          <span
            key={tag.id}
            className="text-xs px-2 py-0.5 bg-[#1f1f1f] border border-[#363636] rounded text-gray-400 font-mono"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="flex gap-3 text-xs text-gray-600 font-mono">
        <span>{getReadableDate(post.published_at)}</span>
        <span>·</span>
        <span>{post.read_time}</span>
        <span>·</span>
        <span>Author: Edgar Gonzalez</span>
      </div>
    </section>

    <section>
      <img className="rounded-2xl" src={post.cover_image}/>
    </section>

    <section>
      <div className="prose prose-invert prose-orange prose-p:font-light prose-p:text-[17px] prose-h2:mb-4 prose-img:rounded-lg max-w-none font-roboto"  dangerouslySetInnerHTML={{__html: post.content_html}}/>
    </section>

    <section>
      <Comments term={`blog/${blog_slug}`}/>
    </section>
  </div>
}

export default Blog