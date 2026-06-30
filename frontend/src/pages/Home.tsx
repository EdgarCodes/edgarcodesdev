import { useQuery } from "@tanstack/react-query";
import BlogCard from "../components/blogs/BlogCard";
import ProjectCard from "../components/projects/ProjectCard";
import { getAllProjects } from "../features/projects/api";
import { getPostSummaries } from "../features/posts/api";
import ExperienceCard from "../components/experience/ExperienceCard";

function Home() {
  const { data: projects, isLoading, isError, error } = useQuery({
    queryKey: [ "projects" ],
    queryFn: () => getAllProjects(),
  })

  const { data: posts, isLoading: postsLoading, isError: postsIsError, error: postsError } = useQuery({
    queryKey: [ "posts" ],
    queryFn: () => getPostSummaries(),
  })

  if (isError || postsIsError) {
    <div>Issue occurred TODO create error page: {error?.message} {postsError?.message}</div>
  }

  return (
    <div className="text-white px-10 py-10 max-w-3xl space-y-16">
      {/* Intro */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[#ffaa48] font-mono text-sm">
          <span>~/overview</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Hey, I'm <span className="text-[#ffaa48]">Edgar</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Software developer passionate about designing and building large-scale
          systems, automation tools, and simulations. Dedicated to creating
          software that is clean, <span className="text-white">efficient</span>,
          and dependable.
        </p>
        <p className="text-gray-400 text-lg leading-relaxed">
          This site is where I share projects I'm working on and write about
          things I find interesting.
        </p>
        <div className="flex gap-3 pt-2">
          <a
            href="/projects"
            className="px-4 py-2 bg-[#292929] hover:bg-[#333] border border-[#363636] rounded-md text-sm transition-colors"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="px-4 py-2 text-[#ffaa48] border border-[#8f612c] hover:bg-[#442e14] rounded-md text-sm transition-colors"
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Projects</h2>
          <a
            href="/projects"
            className="text-sm text-gray-500 hover:text-white transition-colors font-mono"
          >
            /projects →
          </a>
        </div>
        {!isLoading?<div className="space-y-3">
          {projects?.map((project, i) => {
            if(i > 2) return // Only display first 3
            const tags = (project.tags ?? []).map((t) => t.name)
            return <ProjectCard url={project.github_url} title={project.title} description={project.excerpt} tags={tags} key={project.id}/>
          })}
        </div>:<div/>}
      </section>

      {/* Blogs */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Latest Blogs</h2>
          <a
            href="/blogs"
            className="text-sm text-gray-500 hover:text-white transition-colors font-mono"
          >
            /blogs →
          </a>
        </div>
        {!postsLoading?<div className="space-y-3">
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
            return <BlogCard key={post.id} url={post.title} title={post.title} description={post.excerpt} tags={tags} date={published_at} readTime={post.read_time}/>
          })}
        </div>:<div/>}
      </section>

      {/* Blogs */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-bold">My Experience</h2>
        </div>
        <div className="space-y-3">
          <ExperienceCard
           image_url="https://www.wku.edu/marketingandcommunications/images/wkucupbox_r.jpg" 
           title="Western Kentucky University"
           description="Full-stack Developer. Working with Typescript, NodeJS, and React."
           start="Jan 2019"
           end="May 2022"/>
          <ExperienceCard
           image_url="https://one.walmart.com/content/walmart-global-tech/en_us/tools/header/_jcr_content/header/favicon.img.png" 
           title="Walmart Global Tech"
            description="Software Engineer. A focus on large-scale systems and automation."
           start="July 2022"
           end="Current"/>
        </div>
        <div>
          <h2 className="text-center"> <a className="font-bold cursor-pointer underline text-gray-400 underline-offset-4 hover:text-white">Full Resume Here.</a></h2>
        </div>
      </section>
    </div>
  );
}

export default Home;