import Link from "next/link";

const MyPlanPage = () => {
  return (
    <main className="min-h-screen bg-[#0d0f12] px-5 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div>
          <h1 className="text-4xl font-black">MY PLAN</h1>

          <p className="mt-2 text-sm text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-800 bg-[#15181d] p-5">
            <p className="text-sm text-gray-400">Exercises</p>

            <p className="mt-2 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#15181d] p-5">
            <p className="text-sm text-gray-400">Minutes</p>

            <p className="mt-2 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#15181d] p-5">
            <p className="text-sm text-gray-400">Calories</p>

            <p className="mt-2 text-3xl font-bold">0</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex gap-6 border-b border-gray-800">
          <button className="border-b-2 border-lime-400 pb-3 text-sm font-bold text-lime-400">
            Today&apos;s Plan
          </button>

          <button className="pb-3 text-sm font-bold text-gray-500">
            Saved
          </button>
        </div>

        {/* Empty state */}
        <div className="flex min-h-87.5 flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-black">NOTHING HERE YET</h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/"
            className="mt-6 rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-black hover:bg-lime-300"
          >
            GO TO WORKOUTS
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MyPlanPage;
