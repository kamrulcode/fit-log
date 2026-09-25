export default function Loading() {
  return (
    <main className="min-h-[70vh] bg-[#0d0f12] px-5 py-16 md:px-8">
      <div className="mx-auto max-w-310">
        <div className="h-10 w-64 animate-pulse rounded bg-[#191d23]" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-[#242933] bg-[#15181e]"
            >
              <div className="aspect-[1.42] animate-pulse bg-[#1b1f26]" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-[#1b1f26]" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-[#1b1f26]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
