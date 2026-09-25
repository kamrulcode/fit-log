export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0d0f12] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-305">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="h-125 animate-pulse rounded-2xl bg-[#15181e] sm:h-162.5" />
          <div className="space-y-5">
            <div className="h-14 w-3/4 animate-pulse rounded bg-[#15181e]" />
            <div className="h-20 animate-pulse rounded bg-[#15181e]" />
            <div className="h-80 animate-pulse rounded-2xl bg-[#15181e]" />
          </div>
        </div>
      </div>
    </main>
  );
}
