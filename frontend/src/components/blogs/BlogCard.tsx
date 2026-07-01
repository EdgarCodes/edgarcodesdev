interface BlogCardProps {
  url: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  read_time: string;
  image_url?: string;
}

function BlogCard({
  url,
  title,
  description,
  tags,
  date,
  read_time,
  image_url
}: BlogCardProps) {
  return (
    <a
      href={url}
      className="block p-4 bg-[#292929] border border-[#363636] rounded-md hover:border-[#4a4a4a] transition-colors group"
    >
      {image_url === undefined? <div/>:<div  className="mb-5">
        <img src={image_url} className="rounded-md m-auto"/>
      </div>}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium group-hover:text-[#ffaa48] transition-colors">
            {title}
          </span>
          <i className="hn hn-arrow-up-right text-gray-600 group-hover:text-gray-400 transition-colors" />
        </div>
        <p className="text-gray-400 text-sm mb-3">{description}</p>
        <div className="flex gap-3 text-xs text-gray-600 font-mono">
          <span>{date}</span>
          <span>·</span>
          <span>{read_time}</span>
        </div>
        <div className="flex gap-2 flex-wrap mt-3">
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

export default BlogCard;
