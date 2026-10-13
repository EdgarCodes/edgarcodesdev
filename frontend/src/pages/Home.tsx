import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import BlogCard from "../components/blogs/BlogCard";
import ProjectCard from "../components/projects/ProjectCard";
import { getAllProjects } from "../features/projects/api";
import { getPostSummaries } from "../features/posts/api";
import ExperienceCard from "../components/experience/ExperienceCard";
import { getReadableDate } from "../utils/utils";

const PREVIEW_COUNT = 3

// Newest first
const experience = [
  {
    image_url: "https://yt3.googleusercontent.com/_8dupPyPBzQvhH2C-3m988IenpLagYFqR7LjqOa86NNtsQTHBNhgTtXDscpBJcYUlz2QVYc6DFU=s900-c-k-c0x00ffffff-no-rj",
    title: "Walmart Global Tech",
    description: "Software Engineer. A focus on large-scale systems and automation.",
    start: "July 2022",
    end: "Present",
  },
  {
    image_url: "https://www.wku.edu/marketingandcommunications/images/wkucupbox_r.jpg",
    title: "Western Kentucky University",
    description: "Full-stack Developer. Working with Typescript, NodeJS, and React.",
    start: "Jan 2019",
    end: "May 2022",
  },
]

function SectionHeader({ title, to }: { title: string; to?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold">{title}</h2>
      {to && (
        <Link
          to={to}
          className="text-sm text-gray-500 hover:text-white transition-colors font-mono"
        >
          {to} →
        </Link>
      )}
    </div>
  )
}

function CardSkeletons() {
  return (
    <div className="space-y-3" aria-busy="true">
      {Array.from({ length: PREVIEW_COUNT }, (_, i) => (
        <div key={i} className="h-28 bg-[#292929] border border-[#363636] rounded-md animate-pulse" />
      ))}
    </div>
  )
}

function SectionMessage({ children }: { children: ReactNode }) {
  return <p className="font-mono text-sm text-gray-500">{children}</p>
}

function Home() {
  const projectsQuery = useQuery({
    queryKey: [ "projects" ],
    queryFn: () => getAllProjects(),
  })

  const postsQuery = useQuery({
    queryKey: [ "posts" ],
    queryFn: () => getPostSummaries(),
  })

  const projects = projectsQuery.data?.slice(0, PREVIEW_COUNT) ?? []
  const posts = postsQuery.data?.slice(0, PREVIEW_COUNT) ?? []

  return (
    <div className="text-white px-6 sm:px-10 py-10 max-w-3xl space-y-12">
      {/* Intro */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[#ffaa48] font-mono text-sm">
          <span>~/overview</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {">"} Hey, I'm <span className="text-[#ffaa48]">Edgar</span><span className="animate-blink" aria-hidden="true">_</span>
        </h1>
        <p className="font-roboto font-light text-gray-400 text-lg leading-8">
          Software developer passionate about designing and building large-scale
          systems, automation tools, and simulations. Dedicated to creating
          software that is reliable, <span className="text-white">scalable</span>,
          and maintainable.
        </p>
        <p className="font-roboto font-light text-gray-400 text-lg leading-8">
          This site is where I share projects I'm working on and write about
          things I find interesting.
        </p>
        <div className="flex flex-wrap gap-3 pt-2 font-roboto tracking-wider">
          <Link
            to="/projects"
            className="px-4 py-2 bg-[#292929] hover:bg-[#333] border border-[#363636] rounded-md text-sm transition-colors"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 text-[#ffaa48] border border-[#8f612c] hover:bg-[#442e14] rounded-md text-sm transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-5">
        <SectionHeader title="Projects" to="/projects" />
        {projectsQuery.isLoading ? <CardSkeletons /> :
         projectsQuery.isError ? <SectionMessage>Couldn't load projects right now.</SectionMessage> :
         projects.length === 0 ? <SectionMessage>No projects yet. Check back soon.</SectionMessage> :
          <div className="space-y-3">
            {projects.map((project) => {
              const tags = (project.tags ?? []).map((t) => t.name)
              return <ProjectCard url={project.github_url} title={project.title} description={project.excerpt} tags={tags} key={project.id}/>
            })}
          </div>}
      </section>

      {/* Blogs */}
      <section className="space-y-5">
        <SectionHeader title="Latest Blogs" to="/blogs" />
        {postsQuery.isLoading ? <CardSkeletons /> :
         postsQuery.isError ? <SectionMessage>Couldn't load posts right now.</SectionMessage> :
         posts.length === 0 ? <SectionMessage>No posts yet. Check back soon.</SectionMessage> :
          <div className="space-y-3">
            {posts.map((post) => {
              const tags = (post.tags ?? []).map((t) => t.name)
              return <BlogCard key={post.id} url={"/blog/" + post.slug} title={post.title} description={post.excerpt} tags={tags} date={getReadableDate(post.published_at)} read_time={post.read_time}/>
            })}
          </div>}
      </section>

      {/* Experience */}
      <section className="space-y-5">
        <SectionHeader title="Experience" />
        <div className="space-y-3">
          {experience.map((job) => <ExperienceCard key={job.title} {...job} />)}
        </div>
        <p className="text-center">
          <a className="font-bold cursor-pointer underline text-gray-400 underline-offset-4 hover:text-white">Full Resume Here.</a>
        </p>
      </section>
    </div>
  );
}

export default Home;
