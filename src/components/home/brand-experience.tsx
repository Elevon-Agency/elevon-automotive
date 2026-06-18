"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedText } from "@/components/shared/animated-text";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    title: "Crafted Without Compromise",
    subtitle: "01 — Heritage",
    description:
      "Every Apex vehicle begins as a vision — sculpted in carbon, forged in precision, and finished by master artisans who understand that perfection is not a destination, but a discipline.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4114e?w=1920&q=80",
    align: "left" as const,
  },
  {
    title: "Engineering the Impossible",
    subtitle: "02 — Innovation",
    description:
      "From hybrid powertrains delivering 1,380 horsepower to active aerodynamics that adapt in milliseconds — we push the boundaries of what automotive engineering can achieve.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80",
    align: "right" as const,
  },
  {
    title: "The Apex Experience",
    subtitle: "03 — Ownership",
    description:
      "White-glove concierge service, bespoke configuration, and an ownership journey designed for those who accept nothing less than extraordinary.",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1920&q=80",
    align: "left" as const,
  },
];

export function BrandExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stories.forEach((_, i) => {
        gsap.from(`.story-image-${i}`, {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: `.story-block-${i}`,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
        gsap.from(`.story-content-${i}`, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.story-block-${i}`,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <div className="container-wide mb-24">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          The Apex Philosophy
        </p>
        <AnimatedText
          text="An Experience Beyond Driving"
          as="h2"
          className="text-display mt-4 max-w-3xl text-4xl font-light sm:text-5xl lg:text-6xl"
        />
      </div>

      <div className="space-y-32 lg:space-y-48">
        {stories.map((story, i) => (
          <div
            key={story.subtitle}
            className={`story-block-${i} container-wide grid items-center gap-12 lg:grid-cols-2 lg:gap-24 ${
              story.align === "right" ? "lg:[direction:rtl]" : ""
            }`}
          >
            <div
              className={`story-image-${i} relative aspect-[4/5] overflow-hidden bg-muted lg:aspect-[3/4] ${
                story.align === "right" ? "lg:[direction:ltr]" : ""
              }`}
            >
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div
              className={`story-content-${i} ${
                story.align === "right" ? "lg:[direction:ltr]" : ""
              }`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {story.subtitle}
              </p>
              <h3 className="text-display mt-4 text-3xl font-light sm:text-4xl lg:text-5xl">
                {story.title}
              </h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                {story.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
