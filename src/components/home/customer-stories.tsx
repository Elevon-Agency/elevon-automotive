"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatedText } from "@/components/shared/animated-text";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";

const testimonials = [
  {
    quote:
      "The entire experience felt bespoke — from the private viewing to the white-glove delivery. Apex understands luxury at a level few can match.",
    name: "Alexander Chen",
    title: "Collector · San Francisco",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    vehicle: "Koenigsegg Jesko",
  },
  {
    quote:
      "I've purchased from showrooms worldwide. Apex's attention to detail, transparency, and passion for automotive excellence is unmatched.",
    name: "Isabella Marchetti",
    title: "Entrepreneur · Milan",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    vehicle: "McLaren 750S",
  },
  {
    quote:
      "They didn't just sell me a car — they curated an experience. The concierge team handled everything from financing to international shipping.",
    name: "James Whitfield",
    title: "Investor · London",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    vehicle: "Porsche 911 GT3 RS",
  },
];

export function CustomerStories() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding">
      <div className="container-wide">
        <RevealOnScroll>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Client Stories
          </p>
          <AnimatedText
            text="Voices of Distinction"
            as="h2"
            className="text-display mt-4 text-4xl font-light sm:text-5xl lg:text-6xl"
          />
        </RevealOnScroll>

        <RevealOnScroll className="mt-20">
          <div className="relative mx-auto max-w-4xl">
            <Quote className="absolute -top-4 left-0 h-12 w-12 text-border" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="pt-8"
              >
                <blockquote className="text-display text-2xl font-light leading-relaxed sm:text-3xl lg:text-4xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-12 flex items-center gap-6">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {testimonial.vehicle}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex items-center gap-4">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="ml-4 flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1 transition-all duration-300 cursor-pointer ${
                      i === active
                        ? "w-8 bg-foreground"
                        : "w-4 bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
