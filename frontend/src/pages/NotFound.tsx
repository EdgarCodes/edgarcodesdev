function NotFound() {
  return <div className="text-white px-10 py-10 max-w-3xl space-y-16">
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-[#ffaa48] font-mono text-sm">
        <span>~/404</span>
      </div>
      <div className="w-full flex flex-col items-center gap-4 mt-25 ">
        <i className={`hn hn-window-close text-[300px] text-gray-300`} />
        <h1 className="text-gray-300">404 PAGE NOT FOUND</h1>
      </div>
    </section>
  </div>
}

export default NotFound