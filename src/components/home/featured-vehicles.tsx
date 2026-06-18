"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { formatPrice } from "@/lib/utils";
import { AnimatedText } from "@/components/shared/animated-text";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";

export function FeaturedVehicles({ vehicles }: { vehicles: Vehicle[] }) {
  const [active, setActive] = useState(0);
  const dragX = useMotionValue(0);

  const next = () => setActive((p) => (p + 1) % vehicles.length);
  const prev = () => setActive((p) => (p - 1 + vehicles.length) % vehicles.length);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (vehicles.length === 0) return;
    if (info.offset.x < -80 || info.velocity.x < -500) next();
    else if (info.offset.x > 80 || info.velocity.x > 500) prev();
  };

  const vehicle = vehicles[active];
  if (!vehicle) return null;

  return (
    <section id="collection" className="section-padding overflow-hidden">
      <div className="container-wide">
        <RevealOnScroll>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Curated Selection
          </p>
          <AnimatedText
            text="Featured Collection"
            as="h2"
            className="text-display mt-4 text-4xl font-light sm:text-5xl lg:text-6xl"
          />
        </RevealOnScroll>

        <div className="relative mt-16 lg:mt-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <RevealOnScroll className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {vehicle.brand} · {vehicle.year}
                  </p>
                  <h3 className="text-display mt-2 text-4xl font-light lg:text-5xl">
                    {vehicle.model}
                  </h3>
                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                    {vehicle.description}
                  </p>

                  <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
                    <div>
                      <p className="text-display text-2xl font-light">
                        {vehicle.horsepower}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        HP
                      </p>
                    </div>
                    <div>
                      <p className="text-display text-2xl font-light">
                        {vehicle.acceleration}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        0–100
                      </p>
                    </div>
                    <div>
                      <p className="text-display text-2xl font-light">
                        {formatPrice(vehicle.price)}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Price
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/inventory/${vehicle.slug}`}
                    className="group mt-10 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest transition-opacity hover:opacity-60 cursor-pointer"
                  >
                    View Details
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex items-center gap-4">
                <button
                  onClick={prev}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary cursor-pointer"
                  aria-label="Previous vehicle"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary cursor-pointer"
                  aria-label="Next vehicle"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="ml-4 flex gap-2">
                  {vehicles.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1 transition-all duration-300 cursor-pointer ${
                        i === active
                          ? "w-8 bg-foreground"
                          : "w-4 bg-border hover:bg-muted-foreground"
                      }`}
                      aria-label={`Go to vehicle ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="left" className="lg:col-span-7">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                style={{ x: dragX }}
                onDragEnd={handleDragEnd}
                className="relative aspect-[16/10] cursor-grab overflow-hidden bg-muted active:cursor-grabbing"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={vehicle.images[0]}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={active === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
