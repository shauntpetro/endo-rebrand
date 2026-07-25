import Link from "next/link";
import Image from "next/image";
import { SITE, FOOTER_NAV } from "@/lib/site";
import FooterNewsletter from "./FooterNewsletter";

export default function Footer({
  deliveryAvailable = true,
}: {
  deliveryAvailable?: boolean;
} = {}) {
  return (
    <footer role="contentinfo" data-tone="dark" className="bg-plum text-on-dark">
      <div aria-hidden className="h-px bg-gradient-to-r from-rose via-gold to-teal" />
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-12 sm:py-16 lg:grid-cols-12 lg:gap-x-7 [&>*]:min-w-0">
        <div className="col-span-2 sm:col-span-3 lg:col-span-4">
          <Link
            href="/"
            prefetch={false}
            aria-label="EndoCyclic Therapeutics — home"
            className="relative flex h-11 w-40 items-center"
          >
            <Image src="/logo.avif" alt="EndoCyclic Therapeutics" width={233} height={70} className="h-auto w-full object-contain object-left brightness-0 invert" />
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
            <nav
              key={heading}
              aria-label={heading}
              className={heading === "Connect" ? "col-span-2 sm:col-span-1 lg:col-span-2" : "lg:col-span-2"}
            >
              <h2 className="eyebrow !text-teal-on-dark">{heading}</h2>
              <ul className={heading === "Connect" ? "mt-3 flex flex-wrap gap-x-6 sm:block" : "mt-3"}>
                {links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 max-w-full items-center text-sm text-muted-on-dark transition-colors [overflow-wrap:anywhere] hover:text-on-dark">
                        <span className="min-w-0 [overflow-wrap:anywhere]">
                          {link.name}
                        </span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link href={link.href} prefetch={false} data-site-event={link.name === "Partner with us" ? "cta_partnership" : undefined} className="inline-flex min-h-11 min-w-11 max-w-full items-center text-sm text-muted-on-dark transition-colors [overflow-wrap:anywhere] hover:text-on-dark">
                        <span className="min-w-0 [overflow-wrap:anywhere]">
                          {link.name}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ),
        )}

        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <h2 className="eyebrow !text-teal-on-dark">Updates</h2>
          <p className="mt-3 max-w-full text-sm text-muted-on-dark [overflow-wrap:anywhere]">
            {deliveryAvailable
              ? "Request company updates and milestone announcements."
              : "Company updates and milestone announcements."}
          </p>
          <FooterNewsletter deliveryAvailable={deliveryAvailable} />
        </div>
      </div>

      <div className="border-t border-line-on-dark">
        <div className="container-page flex min-w-0 flex-col gap-2 py-5 text-xs text-muted-on-dark sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.legalName}</p>
          {SITE.email ? (
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-11 min-w-11 max-w-full items-center transition-colors [overflow-wrap:anywhere] hover:text-on-dark"
            >
              {SITE.email}
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
