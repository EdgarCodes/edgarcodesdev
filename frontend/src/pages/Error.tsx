import { useLocation } from "react-router-dom";

function Error() {
  const location = useLocation();
  const errorMessage = location.state?.error || "Unknown Error"
  const summaryErrorMessage = location.state?.summaryError || "Unknown error summary."

  return <div className="text-white px-10 py-10 max-w-3xl space-y-16">
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-[#ffaa48] font-mono text-sm">
        <span>~/error</span>
      </div>
      <div className="w-full flex flex-col items-center gap-4 mt-25 ">
         <i className={`hn hn-exclamation-triangle text-[300px] text-gray-300`} />
         <h1 className="text-gray-300">An unexpected error has occured.</h1>
         <div className="max-h-64 bg-[#292929] w-3/4 rounded-md overflow-y-auto">
          <p className="text-gray-400 p-3 text-sm">
            <b>{summaryErrorMessage}</b>
            <br></br>
            {errorMessage}
          </p>
         </div>
      </div>
    </section>
  </div>
}

export default Error