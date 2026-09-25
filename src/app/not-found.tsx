import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#0d0f12] px-5 text-center">
      <div>
        <p className="text-xs font-black tracking-[0.2em] text-[#caff00]">
          404
        </p>
        <h1 className="mt-3 font-Oswald text-6xl font-bold uppercase">
          WORKOUT NOT FOUND
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#858d99]">
          The page you requested does not exist or the workout is no longer
          available.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex rounded-xl bg-[#caff00] px-5 py-3 text-sm font-bold text-black"
        >
          Back to workouts
        </Link>
      </div>
    </main>
  );
}
