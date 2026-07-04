export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-paper"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-10 w-10">
          <span className="absolute inset-0 rounded-full border border-line" />
          <span className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-gold motion-reduce:animate-none" />
        </div>
        <p className="t-label text-ink-muted">Loading</p>
      </div>
    </div>
  );
}
