
export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 h-6 w-44 rounded bg-slate-200" />

        <div className="grid overflow-hidden rounded-3xl bg-white shadow-lg md:grid-cols-2">
          <div className="min-h-[400px] bg-slate-200" />

          <div className="space-y-5 p-8 md:p-12">
            <div className="h-8 w-24 rounded bg-slate-200" />
            <div className="h-10 w-3/4 rounded bg-slate-200" />
            <div className="h-5 w-1/2 rounded bg-slate-200" />
            <div className="h-24 rounded bg-slate-200" />
            <div className="h-24 rounded bg-slate-200" />
            <div className="h-12 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </main>
  );
}
