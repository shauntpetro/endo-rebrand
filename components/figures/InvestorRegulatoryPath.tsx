"use client";

import { motion, useReducedMotion } from "framer-motion";

export type RegulatoryPathItem = {
  index: string;
  status: string;
  statusClass: string;
  nodeClass: string;
  label: string;
  title: string;
  text: string;
  parallel?: boolean;
};

export default function InvestorRegulatoryPath({
  items,
}: {
  items: readonly RegulatoryPathItem[];
}) {
  const reducedMotion = useReducedMotion();
  const primaryItems = items.filter((item) => !item.parallel);
  const parallelItem = items.find((item) => item.parallel);

  return (
    <figure className="mt-14">
      <div className="relative overflow-hidden rounded-bl-[2.5rem] rounded-tr-[2.5rem] border border-line bg-paper px-5 py-7 shadow-[0_28px_80px_rgb(57_38_56/0.09)] sm:px-8 sm:py-10 lg:rounded-bl-[4rem] lg:rounded-tr-[4rem] lg:px-10 lg:py-12">
        <div
          aria-hidden
          className="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-teal/20"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 left-[38%] h-52 w-52 rounded-full bg-peony/55"
        />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(15rem,1fr)] lg:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-ink">
              Primary development path
            </p>

            <div className="relative mt-8">
              <span
                aria-hidden
                className="absolute bottom-8 left-[1.1rem] top-8 w-px bg-line lg:bottom-auto lg:left-[16.667%] lg:right-[16.667%] lg:top-[1.1rem] lg:h-px lg:w-auto"
              />
              <motion.span
                aria-hidden
                className="absolute bottom-8 left-[1.1rem] top-8 w-px origin-top bg-gradient-to-b from-gold via-teal to-rose lg:bottom-auto lg:left-[16.667%] lg:right-[16.667%] lg:top-[1.1rem] lg:h-px lg:w-auto lg:origin-left lg:bg-gradient-to-r"
                initial={
                  reducedMotion
                    ? false
                    : { scaleY: 0, scaleX: 0 }
                }
                whileInView={{ scaleY: 1, scaleX: 1 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 0.95, ease: [0.22, 1, 0.36, 1] }
                }
              />

              <ol className="relative grid list-none gap-0 lg:grid-cols-3 lg:gap-8">
                {primaryItems.map((item, index) => {
                  const current = item.title === "Phase 1";

                  return (
                    <motion.li
                      key={item.index}
                      initial={reducedMotion ? false : { y: 12 }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true, amount: 0.55 }}
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.58,
                              delay: index * 0.09,
                              ease: [0.22, 1, 0.36, 1],
                            }
                      }
                      className={`relative grid grid-cols-[2.5rem_1fr] gap-4 py-7 first:pt-0 last:pb-0 lg:block lg:py-0 ${
                        index > 0 ? "border-t border-line lg:border-t-0" : ""
                      }`}
                    >
                      <div className="relative z-10 flex h-9 w-9 items-center justify-center self-start rounded-full bg-paper lg:mx-auto">
                        <span
                          aria-hidden
                          className={`block rounded-full ${
                            current
                              ? "h-5 w-5 border-[5px] border-paper bg-rose ring-1 ring-rose/70"
                              : `h-3.5 w-3.5 border-2 border-paper ${item.nodeClass}`
                          }`}
                        />
                      </div>

                      <div className="min-w-0 lg:mt-7">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="text-xs font-semibold tracking-[0.16em] text-muted">
                            {item.index}
                          </span>
                          <span
                            className={`text-xs font-semibold uppercase tracking-[0.12em] ${item.statusClass}`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.13em] text-teal-ink">
                          {item.label}
                        </p>
                        <h3 className="mt-2 text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.03em] text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-muted">
                          {item.text}
                        </p>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </div>

          {parallelItem ? (
            <motion.aside
              initial={reducedMotion ? false : { x: 14 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.62, delay: 0.18, ease: [0.22, 1, 0.36, 1] }
              }
              aria-label={`${parallelItem.title}: ${parallelItem.status}`}
              className="relative overflow-hidden rounded-tr-[2.5rem] border border-rose/25 bg-tint-plum p-6 sm:p-8 lg:border-y-0 lg:border-r-0 lg:border-l lg:bg-transparent lg:py-2 lg:pl-9 lg:pr-0"
            >
              <span
                aria-hidden
                className="absolute -right-12 -top-12 h-36 w-36 rounded-full border border-rose/20"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-rose/40 bg-paper">
                    <span className={`h-3.5 w-3.5 rounded-full ${parallelItem.nodeClass}`} />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.16em] text-muted">
                    {parallelItem.index}
                  </span>
                </div>
                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.13em] text-rose-ink">
                  {parallelItem.label}
                </p>
                <h3 className="mt-3 text-[clamp(1.5rem,2.8vw,2.15rem)] font-medium leading-tight tracking-[-0.03em] text-ink">
                  {parallelItem.title}
                </h3>
                <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.12em] ${parallelItem.statusClass}`}>
                  {parallelItem.status}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {parallelItem.text}
                </p>
              </div>
            </motion.aside>
          ) : null}
        </div>
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm leading-relaxed text-muted">
        <span>Reported ENDO-205 development and regulatory milestones.</span>
        <span className="text-xs">
          Fast Track is shown as parallel regulatory activity, not as a forecast stage.
        </span>
      </figcaption>
    </figure>
  );
}
