import clsx from "clsx";

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={clsx(
        "text-5xl md:text-7xl font-serif font-bold text-plum-dark tracking-tighter leading-[0.9]",
        className,
      )}
    >
      {children}
    </h2>
  );
}
