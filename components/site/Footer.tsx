import Link from "next/link";
import Image from "next/image";
import { SITE, FOOTER_NAV } from "@/lib/site";
import FooterNewsletter from "./FooterNewsletter";

export default function Footer() {
  return (
    <footer role="contentinfo" data-tone="dark" className="bg-plum text-on-dark">
      <div aria-hidden className="h-px bg-gradient-to-r from-rose via-gold to-teal" />
      <div className="container-page grid gap-x-8 gap-y-12 py-16 sm:grid-cols-3 lg:grid-cols-12 lg:gap-x-7">
        <div className="sm:col-span-3 lg:col-span-4">
          <Link href="/" aria-label="EndoCyclic — home" className="relative flex h-11 w-40 items-center">
            <Image src="/logo.avif" alt="EndoCyclic Therapeutics" width={233} height={70} sizes="160px" className="h-auto w-full object-contain object-left brightness-0 invert" />
          </Link>
          <p className="mt-5 max-w-xs text-sm text-muted-on-dark">
            A clinical-stage precision medicine company developing non-hormonal peptides designed to act selectively where disease lives.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-on-dark">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" /> {SITE.location}
          </p>
        </div>

        {(Object.entries(FOOTER_NAV) as [string, readonly { name: string; href: string; external?: boolean }[]][]).map(
          ([heading, links]) => (
            <nav key={heading} aria-label={heading} className="lg:col-span-2">
              <h2 className="eyebrow !text-teal-on-dark">{heading}</h2>
              <ul className="mt-3">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center text-sm text-muted-on-dark transition-colors hover:text-on-dark">
                        {link.name}<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link href={link.href} className="inline-flex min-h-11 min-w-11 items-center text-sm text-muted-on-dark transition-colors hover:text-on-dark">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ),
        )}

        <div className="sm:col-span-3 lg:col-span-2">
          <h2 className="eyebrow !text-teal-on-dark">Updates</h2>
          <p className="mt-3 text-sm text-muted-on-dark">Company milestones, delivered selectively.</p>
          <FooterNewsletter />
        </div>
      </div>

      <div className="border-t border-line-on-dark">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-on-dark sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.legalName}</p>
          <div className="flex flex-wrap gap-x-6">
            <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-on-dark">{SITE.email}</a>
            <Link href="/contact" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-on-dark">Contact</Link>
            <Link href="/media" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-on-dark">Press resources</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
