
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import LabeledInput from "../components/blogs/LabeledInput";
import { createPost } from "../features/posts/api";
import type { CreatePost} from "../features/posts/types"

function BlogEdit() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [read_time, setReadTime] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState<string>("");
  const [image_url, setImageUrl] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [token, setToken] = useState("");

  const [is_sending, setisSending]= useState(false);
  const [post_id, setPostID] = useState("");
  const [error, setError] = useState("");

  const validate = (): string | null => {
    if (!title.trim()) return "Title is required."
    if (!slug.trim()) return "Slug is required."
    if (!excerpt.trim()) return "Excerpt is required."
    if (!content.trim()) return "Content is required."
    if (!read_time.trim()) return "Read time is required."
    if (!token.trim()) return "Token is required."
    return null
  }

  const resetForm = () => {
    setContent("")
    setTitle("")
    setReadTime("")
    setSlug("")
    setTags("")
    setImageUrl("")
    setExcerpt("")
    setToken("")
  }

  const SubmitPost = async () => {
    setPostID("")
    setError("")

    const validation_error = validate()
    if (validation_error) {
      setError(validation_error)
      return
    }

    const newPost: CreatePost = {
      slug,
      title,
      excerpt,
      content,
      cover_image: image_url,
      read_time: read_time,
      tags: tags.replaceAll(" ", "").split(","),
    }

    setisSending(true)
    try {
      const res = await createPost(newPost, token)
      setPostID(res.id)
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish post.")
    } finally {
      setisSending(false)
    }
  }

  return (
    <div className="w-full py-10 px-5" data-color-mode="dark">
      <section className="space-y-4 text-white">
        <div className="flex items-center gap-2 text-[#ffaa48] font-mono text-sm">
          <span>~/blog_edit</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Blog Creation</h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          For admin use only. Will only work with secret token.
        </p>
      </section>

      <form className="mb-5 flex flex-col gap-4 mt-8">
        <LabeledInput label="Title" value={title} onChange={setTitle} placeholder="Enter a title..." disabled={is_sending} />
        <LabeledInput label="Read Time" value={read_time} onChange={setReadTime} placeholder="Ex. 5 Minutes" disabled={is_sending} />
        <LabeledInput label="Slug" value={slug} onChange={setSlug} placeholder="Ex. my-blog-post" disabled={is_sending} />
        <LabeledInput
          label="Tags"
          value={tags}
          onChange={(value) => setTags(value)}
          placeholder="Ex. react, typescript"
          disabled={is_sending}
        />
        <LabeledInput label="Image URL" value={image_url} onChange={setImageUrl} placeholder="https://..." disabled={is_sending} />
        <LabeledInput label="Excerpt" value={excerpt} onChange={setExcerpt} placeholder="Short summary of the post..." disabled={is_sending} />
        <LabeledInput label="Token" value={token} onChange={setToken} placeholder="Publish token" type="password" disabled={is_sending} />
      </form>

      <MDEditor
        value={content}
        onChange={(value) => setContent(value ?? "")}
        style={{ backgroundColor: "#292929" }}
        textareaProps={{ disabled: is_sending }}
      />
      <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} />

      {error && (
        <p className="mt-5 text-sm text-red-400 font-mono">{error}</p>
      )}
      {post_id && (
        <p className="mt-5 text-sm text-green-400 font-mono">
          Post published successfully. ID: {post_id}
        </p>
      )}

      <div className="mt-5">
        <button
          className="px-4 py-2 bg-[#292929] hover:bg-[#333] hover:cursor-pointer border border-[#363636] rounded-md text-sm transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#292929]"
          onClick={SubmitPost}
          disabled={is_sending}
        >{is_sending ? "Publishing..." : "Publish"}</button>
      </div>
    </div>
  );
}

export default BlogEdit;