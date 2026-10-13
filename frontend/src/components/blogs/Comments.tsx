import { useEffect, useRef } from "react";

const REPO = "EdgarCodes/edgarcodesdev";

type Props = {
  term: string;
};

function Comments({ term }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.crossOrigin = "anonymous"
    script.setAttribute("repo", REPO)
    script.setAttribute("issue-term", term)
    script.setAttribute("theme", "github-dark")

    container.appendChild(script)


    // wipe container on unmount
    return () => { container.innerHTML = "" }
  }, [term])

  return <div ref={containerRef}/>
}

export default Comments
