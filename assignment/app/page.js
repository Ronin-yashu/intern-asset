
const page = () => {
  return (
    <main className="w-full min-h-[80vh] flex flex-col lg:flex-row justify-center items-center px-4 py-8 lg:py-0">

      <div className="w-full lg:w-1/2 h-full font-bold justify-center flex items-center px-4 lg:px-7 mb-8 lg:mb-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center lg:text-left">
          <span className="text-blue-500 text-4xl sm:text-5xl lg:text-6xl block mb-2">Welcome</span>
          To Healthcare Support
        </h1>
      </div>

      <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md lg:w-3/4">
          <div className="flex gap-2 mb-4">
            <div className="rounded-full h-3 w-3 bg-red-500"></div>
            <div className="rounded-full h-3 w-3 bg-yellow-500"></div>
            <div className="rounded-full h-3 w-3 bg-green-500"></div>
          </div>
          <div className="space-y-3">
            <div className="h-8 bg-blue-100 rounded w-3/4"></div>
            <div className="h-24 bg-gray-100 rounded"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 bg-purple-100 rounded"></div>
              <div className="h-16 bg-green-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default page;