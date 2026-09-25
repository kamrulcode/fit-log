export default function Loading() {
  return (
    <main className="min-h-[70vh] bg-[#0d0f12] px-5 py-16 md:px-8">
      <div className="mx-auto max-w-275">
        <p className="mb-5 text-sm font-semibold text-textP">
          Loading workouts…
        </p>
        <div className="h-12 w-56 animate-pulse rounded bg-[#191d23]" />
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="h-28 animate-pulse rounded-2xl bg-[#15181e]" />
          <div className="h-28 animate-pulse rounded-2xl bg-[#15181e]" />
          <div className="h-28 animate-pulse rounded-2xl bg-[#15181e]" />
        </div>
        <div className="mt-8 h-14 animate-pulse rounded bg-[#15181e]" />
        <div className="mt-6 h-36 animate-pulse rounded-2xl bg-[#15181e]" />
      </div>
    </main>
  );
}
