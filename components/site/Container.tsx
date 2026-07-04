import { clsx } from "clsx";

export default function Container({
  children,
  reading = false,
  className,
}: {
  children: React.ReactNode;
  reading?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx(reading ? "container-reading" : "container-editorial", className)}>
      {children}
    </div>
  );
}
