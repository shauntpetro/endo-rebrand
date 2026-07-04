import { clsx } from "clsx";

export default function Container({
  children,
  prose = false,
  className,
}: {
  children: React.ReactNode;
  prose?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx(prose ? "container-prose" : "container-page", className)}>{children}</div>
  );
}
