interface ProjectCardProps {
  url: string;
  title: string;
  description: string;
  tags: string[];
  image_url?: string;
}

function ProjectCard({ url, title, description, tags, image_url}: ProjectCardProps) {
  return (
    <a
      href={url}
      className="p-4 bg-[#292929] border border-[#363636] rounded-md hover:border-[#4a4a4a] transition-colors group block"
    >
      {image_url === undefined? <div/>:<div  className="mb-5">
        <img src={image_url} className="rounded-md m-auto"/>
      </div>}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono  group-hover:underline">
            {title}
          </span>
          <i className="hn hn-arrow-up-right text-gray-600 group-hover:text-gray-400 transition-colors" />
        </div>
        <p className="text-gray-400 text-sm mb-3">{description}</p>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-[#1f1f1f] border border-[#363636] rounded text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default ProjectCard;
