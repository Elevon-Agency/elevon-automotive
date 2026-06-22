"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/lib/types/vehicle";
import { formatPrice, formatNumber } from "@/lib/utils";
import { Counter } from "@/components/shared/counter";

interface VehicleDetailProps {
  vehicle: Vehicle;
}

export function VehicleDetail({ vehicle }: VehicleDetailProps) {
  console.log("DETAIL RECEIVED VEHICLE:", vehicle);
  console.log("DETAIL VEHICLE:", vehicle);
  const displayImages = vehicle.images.length
  ? vehicle.images
  : ["/placeholder-car.jpg"];

  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () =>
    setActiveImage((p) => (p + 1) % displayImages.length);

  const prevImage = () =>
    setActiveImage(
      (p) => (p - 1 + displayImages.length) % displayImages.length
    );

  return (
    <div className="min-h-screen">
      <div className="container-wide pt-28 pb-8">
        <Link
          href="/inventory"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Inventory
        </Link>
      </div>

      <div className="relative h-[50vh] min-h-[400px] lg:h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={displayImages[activeImage]}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full glass cursor-pointer lg:left-8"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full glass cursor-pointer lg:right-8"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {displayImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`h-1 transition-all duration-300 cursor-pointer ${
                i === activeImage
                  ? "w-8 bg-foreground"
                  : "w-4 bg-foreground/30"
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="container-wide section-padding !pt-16">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {vehicle.brand} · {vehicle.year}
            </p>
            <h1 className="text-display mt-2 text-4xl font-light sm:text-5xl lg:text-6xl">
              {vehicle.model}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              {vehicle.description}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { label: "Power", value: Number(vehicle.horsepower) || 0, suffix: " HP" },
                { label: "0–100", value: vehicle.acceleration, suffix: "" },
                { label: "Top Speed", value: vehicle.topSpeed, suffix: "" },
                { label: "Mileage", value: formatNumber(vehicle.mileage), suffix: " mi" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-display text-2xl font-light lg:text-3xl">
                    {typeof stat.value === "number" ? (
                      <Counter value={stat.value} suffix={stat.suffix} />
                    ) : (
                      <>
                        {stat.value}
                        {stat.suffix}
                      </>
                    )}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 border border-border p-8">
              <p className="text-display text-3xl font-light">
                {formatPrice(vehicle.price)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {vehicle.engine} · {vehicle.transmission}
              </p>

              <div className="mt-8 space-y-4">
                <Link href="/contact#test-drive" className="block">
                  <Button size="lg" className="w-full">
                    Book Test Drive
                  </Button>
                </Link>
                <Link href="/contact" className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    Enquire About Financing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-display text-2xl font-light sm:text-3xl">
            Specifications
          </h2>
          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(vehicle.specs).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between bg-background p-6"
              >
                <span className="text-sm text-muted-foreground">{key}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between bg-background p-6">
              <span className="text-sm text-muted-foreground">Body Style</span>
              <span className="text-sm font-medium">{vehicle.bodyStyle}</span>
            </div>
            <div className="flex items-center justify-between bg-background p-6">
              <span className="text-sm text-muted-foreground">Fuel Type</span>
              <span className="text-sm font-medium">{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center justify-between bg-background p-6">
              <span className="text-sm text-muted-foreground">Torque</span>
              <span className="text-sm font-medium">{vehicle.torque}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto scrollbar-hide">
          {displayImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative h-20 w-32 shrink-0 overflow-hidden cursor-pointer ${
                i === activeImage ? "ring-2 ring-foreground" : "opacity-60"
              }`}
            >
              <Image
                src={img}
                alt={`${vehicle.model} view ${i + 1}`}
                fill
                className="object-cover"
                sizes="128px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
