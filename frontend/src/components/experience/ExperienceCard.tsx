interface ExperienceCardProps {
  image_url: string
  title: string;
  description: string;
  start: string
  end: string
}

function ExperienceCard({
  image_url,
  title,
  description,
  start,
  end
}: ExperienceCardProps) {
  return (
    <div
      className="flex items-center gap-5 p-4 bg-[#292929] border border-[#363636] rounded-md hover:border-[#4a4a4a] transition-colors group"
    >
      <div className="w-18.75">
        <img className="rounded-2xl" src={image_url}/>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium group-hover:text-[#ffaa48] transition-colors">
            {title}
          </span>
          <i className="hn hn-arrow-up-right text-gray-600 group-hover:text-gray-400 transition-colors" />
        </div>
        <p className="text-gray-400 text-sm mb-3">{description}</p>
        <div className="flex gap-3 text-xs text-gray-600 font-mono">
          <span>{start}</span>
          <span>·</span>
          <span>{end}</span>
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;
