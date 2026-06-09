import clsx from "clsx";

export function DotGrid({
  color = "#4A3B52",
  size = 24,
  className,
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={clsx("absolute inset-0 pointer-events-none opacity-[0.03]", className)}
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
