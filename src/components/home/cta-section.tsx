"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-foreground">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(163,163,163,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(64,64,64,0.3) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      <div className="relative section-padding">
        <div className="container-wide text-center">
          <RevealOnScroll>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-background/60">
              Begin Your Journey
            </p>
            <h2 className="text-display mt-6 text-4xl font-light text-background sm:text-5xl lg:text-7xl">
              Your Next Masterpiece
              <br />
              Awaits
            </h2>
            <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-background/70">
              Schedule a private viewing at our flagship showroom or explore
              our curated inventory from anywhere in the world.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link href="/inventory">
                <Button
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  Browse Inventory
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-background/30 text-background hover:bg-background/10"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
