export default function Loading() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-paper" role="status" aria-label="Loading">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-teal-ink motion-reduce:animate-none" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
