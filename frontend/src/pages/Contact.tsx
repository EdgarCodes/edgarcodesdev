function Contact() {
  const links = [
    {
      label: "GitHub",
      handle: "@edgarcodesdev",
      href: "https://github.com/edgarcodesdev",
      mono: "github.com/edgarcodesdev",
    },
    {
      label: "LinkedIn",
      handle: "Edgar",
      href: "https://linkedin.com/in/edgarcodesdev",
      mono: "linkedin.com/in/edgarcodesdev",
    },
    {
      label: "Email",
      handle: "edgarcodesdba@gmail.com",
      href: "mailto:edgarcodesdba@gmail.com",
      mono: "edgarcodesdba@gmail.com",
    },
  ];

  return (
    <div className="text-white px-10 py-10 max-w-3xl space-y-8">
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-[#ffaa48] font-mono text-sm">
          <span>~/contact</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Get in touch</h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          I'm open to new opportunities, collaborations, or just a good conversation about tech. Reach out however works best for you.
        </p>
      </section>

      <section className="space-y-3">
        {links.map(({ label, href, mono }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className="flex items-center justify-between p-4 bg-[#292929] border border-[#363636] rounded-md hover:border-[#4a4a4a] transition-colors group"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-gray-500">{label}</span>
              <span className="font-mono text-[#ffaa48] group-hover:underline text-sm">{mono}</span>
            </div>
            <i className="hn hn-arrow-up-right text-gray-600 group-hover:text-gray-400 transition-colors" />
          </a>
        ))}
      </section>
    </div>
  );
}

export default Contact;
