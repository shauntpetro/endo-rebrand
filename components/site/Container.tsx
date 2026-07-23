import { clsx } from "clsx";

export default function Container({
  children,
  prose = false,
  className,
  id,
}: {
  children: React.ReactNode;
  prose?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={clsx(prose ? "container-prose" : "container-page", className)}>{children}</div>
  );
}
