"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/shared/animated-text";

const stats = [
  { label: "Power", value: "1,380", unit: "HP" },
  { label: "0–100", value: "2.4", unit: "SEC" },
  { label: "Top Speed", value: "378", unit: "KM/H" },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const imageX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-[100dvh] items-end overflow-hidden"
    >
      <motion.div
        style={{ x: imageX, y: imageY }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=2400&q=85"
          alt="Apex Aurora GT hypercar"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

      <div className="relative z-10 container-wide w-full pb-24 pt-32 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
              className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
            >
              Apex Aurora GT · 2025
            </motion.p>
            <AnimatedText
              text="Beyond Performance."
              as="h1"
              className="text-display text-5xl font-light sm:text-7xl lg:text-8xl xl:text-9xl"
              delay={2.5}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground lg:text-lg"
            >
              Where engineering obsession meets artistic vision. Experience
              automotive excellence redefined.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link href="/inventory/apex-aurora-gt">
                <Button size="lg">Explore Aurora GT</Button>
              </Link>
              <Link href="/contact#test-drive">
                <Button variant="outline" size="lg">
                  Book Test Drive
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="flex gap-8 lg:col-span-5 lg:justify-end"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.3 + i * 0.1 }}
                className="glass rounded-lg px-6 py-5 text-center"
              >
                <p className="text-display text-3xl font-light lg:text-4xl">
                  {stat.value}
                  <span className="text-sm text-muted-foreground ml-1">
                    {stat.unit}
                  </span>
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
