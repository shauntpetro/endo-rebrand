/**
 * Page transition wrapper — Next.js App Router re-mounts template.tsx on every
 * route change, replaying the CSS enter animation. Transform-only + no JS so the
 * page content is always visible even if animations are disabled/paused/reduced
 * (a blank page is far worse than a missing transition).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
