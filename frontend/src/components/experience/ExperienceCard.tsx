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
      <div className="w-18.75 shrink-0">
        <img className="rounded-2xl" src={image_url} alt={`${title} logo`} loading="lazy"/>
      </div>

      <div>
        <div className="mb-1">
          <span className="font-mono font-bold group-hover:text-[#ffaa48] transition-colors">
            {title}
          </span>
        </div>
        <p className="font-roboto font-light leading-6 text-gray-400 text-sm mb-2">{description}</p>
        <div className="flex gap-3 text-xs text-gray-400 font-mono">
          <span>{start}</span>
          <span>–</span>
          <span>{end}</span>
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;
