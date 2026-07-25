import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  prose?: boolean;
};

export default function Container({
  children,
  prose = false,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={clsx(
        prose ? "container-prose" : "container-page",
        className,
      )}
    >
      {children}
    </div>
  );
}
