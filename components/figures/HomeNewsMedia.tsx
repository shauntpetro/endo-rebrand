"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { NEWS } from "@/lib/site";

const FEATURED = NEWS.find((article) => article.featured) ?? NEWS[0];
const SECONDARY = NEWS.filter((article) => article.id !== FEATURED.id).sort(
  (a, b) => Date.parse(b.dateTime) - Date.parse(a.dateTime) || b.id - a.id,
);

export default function HomeNewsMedia() {
  const reducedMotion = useReducedMotion();
  const markX = useMotionValue(0);
  const markY = useMotionValue(0);
  const smoothX = useSpring(markX, { stiffness: 170, damping: 28, mass: 0.24 });
  const smoothY = useSpring(markY, { stiffness: 170, damping: 28, mass: 0.24 });

  function moveMark(event: React.PointerEvent<HTMLAnchorElement>) {
    if (reducedMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    markX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 14);
    markY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 10);
  }

  function resetMark() {
    markX.set(0);
    markY.set(0);
  }

  return (
    <div className="overflow-hidden border-y border-line-on-dark">
      <div className="grid lg:grid-cols-12">
        <a
          href={FEATURED.link}
          target="_blank"
          rel="noopener noreferrer"
          onPointerMove={moveMark}
          onPointerLeave={resetMark}
          onBlur={resetMark}
          className="group relative grid min-h-[31rem] gap-10 overflow-hidden border-b border-line-on-dark px-5 py-9 sm:grid-cols-[minmax(0,1fr)_9rem] sm:items-end sm:px-8 sm:py-11 lg:col-span-7 lg:border-b-0 lg:border-r lg:px-10 lg:py-12"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 -top-12 text-[clamp(10rem,22vw,18rem)] font-medium leading-none tracking-[-0.08em] text-on-dark/[0.035]"
          >
            10
          </span>

          <div className="relative z-10 self-end">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.13em]">
              <span className="text-teal-on-dark">Featured recognition</span>
              <span className="text-muted-on-dark">
                {FEATURED.source} · <time dateTime={FEATURED.dateTime}>{FEATURED.date}</time>
              </span>
            </div>
            <h3 className="mt-8 max-w-2xl text-[clamp(2rem,4.2vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-on-dark transition-transform duration-500 ease-soft group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transform-none motion-reduce:transition-none">
              A rare NIH “Perfect 10” for ENDO-205.
            </h3>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-on-dark">
              EndoCyclic received an NIH Commercialization Readiness Pilot grant
              from NICHD with a perfect overall impact score of 10.
            </p>
            <span className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-teal-on-dark">
              Read the source
              <ArrowUpRight
                aria-hidden
                size={16}
                className="transition-transform duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              />
              <span className="sr-only"> Opens in a new tab.</span>
            </span>
          </div>

          <motion.div
            aria-hidden
            style={reducedMotion ? undefined : { x: smoothX, y: smoothY }}
            className="relative z-10 aspect-square w-28 self-end overflow-hidden rounded-bl-[2rem] rounded-tr-[4rem] border border-line bg-paper p-5 shadow-[0_18px_50px_rgb(16_10_22/0.24)] transition-transform duration-500 ease-soft group-hover:scale-[1.025] group-focus-visible:scale-[1.025] sm:w-36 motion-reduce:transform-none motion-reduce:transition-none"
          >
            <Image
              src="/NIH_2013_logo_vertical.svg"
              alt=""
              fill
              sizes="144px"
              className="object-contain p-5"
            />
          </motion.div>

          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-rose via-gold to-teal transition-transform duration-500 ease-soft group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
          />
        </a>

        <div className="lg:col-span-5">
          <ol className="list-none">
            {SECONDARY.map((article) => (
              <li key={article.id} className="border-b border-line-on-dark">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative grid min-h-36 grid-cols-[3.5rem_1fr_auto] items-center gap-4 overflow-hidden px-5 py-6 sm:grid-cols-[4.5rem_1fr_auto] sm:px-8 lg:px-9"
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-bl-xl rounded-tr-[1.75rem] bg-paper/95 p-2 opacity-75 transition-[clip-path,opacity,transform] duration-500 ease-soft [clip-path:inset(6%_6%_6%_6%)] group-hover:translate-x-1 group-hover:opacity-100 group-hover:[clip-path:inset(0%_0%_0%_0%)] group-focus-visible:translate-x-1 group-focus-visible:opacity-100 group-focus-visible:[clip-path:inset(0%_0%_0%_0%)] sm:h-16 sm:w-16 motion-reduce:transform-none motion-reduce:transition-none">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain p-2.5"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-on-dark">
                      {article.source} · <time dateTime={article.dateTime}>{article.date}</time>
                    </p>
                    <h4 className="mt-2 text-base font-medium leading-snug text-on-dark transition-transform duration-500 ease-soft group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 motion-reduce:transform-none motion-reduce:transition-none sm:text-lg">
                      {article.title}
                    </h4>
                  </div>
                  <ArrowUpRight
                    aria-hidden
                    size={17}
                    className="text-muted-on-dark transition-transform duration-300 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-on-dark group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  <span className="sr-only"> Opens in a new tab.</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-rose via-gold to-teal transition-transform duration-500 ease-soft group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                  />
                </a>
              </li>
            ))}
          </ol>

          <div className="grid bg-plum-deep sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Link
              href="/news"
              className="group flex min-h-32 flex-col justify-between border-b border-line-on-dark px-5 py-6 sm:border-b-0 sm:border-r sm:px-8 lg:border-b lg:border-r-0 lg:px-9 xl:border-b-0 xl:border-r"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.13em] text-[#efb2bf]">
                News archive
              </span>
              <span className="mt-6 inline-flex items-center justify-between gap-4 text-lg font-medium text-on-dark">
                View all news
                <ArrowRight aria-hidden size={17} className="transition-transform duration-300 ease-soft group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
              </span>
            </Link>
            <Link
              href="/media"
              className="group flex min-h-32 flex-col justify-between px-5 py-6 sm:px-8 lg:px-9"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.13em] text-teal-on-dark">
                Media kit
              </span>
              <span className="mt-6 inline-flex items-center justify-between gap-4 text-lg font-medium text-on-dark">
                Open press resources
                <ArrowRight aria-hidden size={17} className="transition-transform duration-300 ease-soft group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
