export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface" role="status" aria-label="Loading page">
      <div className="flex flex-col items-center gap-6">
        {/* Animated molecule loader */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-gold-primary/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-gold-primary/30 animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gold-primary/40 to-gold-primary/20 animate-pulse" />
        </div>
        <p className="text-stone-400 text-sm font-medium tracking-widest uppercase animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
