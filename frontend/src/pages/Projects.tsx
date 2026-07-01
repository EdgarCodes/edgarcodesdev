import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../features/projects/api";
import ProjectCard from "../components/projects/ProjectCard";
import { Navigate } from "react-router-dom";

function Projects() {
  const { data: projects, isLoading, isError, error } = useQuery({
    queryKey: [ "projects" ],
    queryFn: () => getAllProjects(),
  })


  if (isError) {
    return <Navigate to="error" replace state={{error: error?.message || "", summaryError: "Could not load projects:"}}/>    
  }

  return <div className="text-white px-10 py-10 max-w-3xl space-y-8">
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-[#ffaa48] font-mono text-sm">
        <span>~/Projects</span>
      </div>
      <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
      <p className="text-gray-400 text-lg leading-relaxed">
        Things I've built, broken, and shipped. Each one taught me something.
      </p>
    </section>
    <section>
      <div>
        {!isLoading?<div className="space-y-3">
          {projects?.map((project, i) => {
            if(i > 2) return // Only display first 3
            const tags = (project.tags ?? []).map((t) => t.name)
            return <ProjectCard url={project.github_url} title={project.title} description={project.excerpt} tags={tags} key={project.id} image_url={project.preview_image}/>
          })}
        </div>:<div/>}
      </div>
    </section>
  </div>
}

export default Projects;
