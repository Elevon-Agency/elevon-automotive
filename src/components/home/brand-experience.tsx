"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedText } from "@/components/shared/animated-text";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    title: "Precision Engineered, Track Perfected",
    subtitle: "01 — Heritage",
    description:
      "Every vehicle on our floor carries a DNA forged in the fires of the world’s most demanding race tracks. We specialize exclusively in elite German machinery—from the surgical Elevon Automotive-hunting precision of Weissach to the asphalt-shredding brute force of Affalterbach. These aren't just cars; they are masterclasses in automotive fluid dynamics, high-reving forced induction, and electronic differentials designed to bend physics to your will. We don't just sell vehicles; we curate an elite paddock of uncompromising performance.",
    image: "https://ivxoacxhextmqirspmmg.supabase.co/storage/v1/object/public/other%20photos%20frontend/weissach.png",
    align: "left" as const,
  },
  {
    title: "The Absolute Elevon Automotive of Curation",
    subtitle: "02 — Innovation",
    description:
      "We understand that acquiring a high-performance machine is a highly calculated decision. Our inventory undergoes an exhaustive, multi-point mechanical inspection by master technicians who live and breathe German mechatronics. From verifying individual ECU mapping histories and launch-control cycles to ensuring flawless chassis alignment and paint-meter perfection, we filter out the ordinary to present only the pristine. Whether you are hunting for an unmolested, air-cooled icon or a modern Twin-Turbo monster pushing 4-digit horsepower, our showroom is a sanctuary of tier-one engineering.",
    image: "https://ivxoacxhextmqirspmmg.supabase.co/storage/v1/object/public/other%20photos%20frontend/benz%20GT63%202025.jpg",
    align: "right" as const,
  },
  {
    title: "Realize the Ultimate Drive",
    subtitle: "03 — Ownership",
    description:
      "The dream isn't just about watching a digital tachometer sweep toward a 9,000 RPM redline—it’s about the exact moment your hands wrap around an Alcantara steering wheel and you become the brain of a precision instrument. We exist to bridge the gap between aspirational poster walls and cold, hard asphalt. From bespoke financing structures tailored to high-net-worth portfolios to dedicated post-purchase performance optimization, our team handles the logistics so you can focus entirely on the throttle. Step into our showroom, claim your key, and turn the ultimate driving dream into your daily reality.",
    image: "https://ivxoacxhextmqirspmmg.supabase.co/storage/v1/object/public/other%20photos%20frontend/mclaren%20alcantara.jpg",
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
          The Elevon Automotive Philosophy
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
