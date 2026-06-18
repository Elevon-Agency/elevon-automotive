"use client";

import { Shield, Gem, Clock, Award } from "lucide-react";
import { AnimatedText } from "@/components/shared/animated-text";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { Counter } from "@/components/shared/counter";

const features = [
  {
    icon: Shield,
    title: "Authenticated Provenance",
    description:
      "Every vehicle undergoes rigorous 200-point inspection with full service history verification.",
  },
  {
    icon: Gem,
    title: "Curated Collection",
    description:
      "Hand-selected hypercars and supercars from the world's most prestigious manufacturers.",
  },
  {
    icon: Clock,
    title: "Concierge Service",
    description:
      "Dedicated relationship manager available 24/7 for viewing, delivery, and aftercare.",
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description:
      "Award-winning showroom recognized among the top luxury automotive retailers globally.",
  },
];

const metrics = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 500, suffix: "+", label: "Vehicles Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 12, suffix: "", label: "Global Brands" },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        <RevealOnScroll>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Why Apex
          </p>
          <AnimatedText
            text="The Standard of Excellence"
            as="h2"
            className="text-display mt-4 text-4xl font-light sm:text-5xl lg:text-6xl"
          />
        </RevealOnScroll>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <RevealOnScroll key={feature.title} delay={i * 0.1}>
              <div className="group h-full border border-border bg-background p-8 transition-all duration-500 hover:border-foreground/20 hover:shadow-lg cursor-default">
                <feature.icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground" />
                <h3 className="text-display mt-6 text-xl font-medium">
                  {feature.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-border pt-16 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <RevealOnScroll key={metric.label} delay={i * 0.1}>
              <div className="text-center lg:text-left">
                <p className="text-display text-4xl font-light lg:text-5xl">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
