"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  GitCompare,
  ArrowUpRight,
  Gauge,
  Fuel,
  Settings2,
} from "lucide-react";
import { Vehicle } from "@/lib/vehicles";
import { formatPrice, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: Vehicle;
  isFavorite?: boolean;
  isCompare?: boolean;
  onToggleFavorite?: (id: string) => void;
  onToggleCompare?: (id: string) => void;
}

export function VehicleCard({
  vehicle,
  isFavorite = false,
  isCompare = false,
  onToggleFavorite,
  onToggleCompare,
}: VehicleCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Link href={`/inventory/${vehicle.slug}`} className="block h-full">
          <Image
            src={vehicle.images[0]}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            className={cn(
              "object-cover transition-transform duration-700",
              hovered && "scale-105"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 bottom-0 glass p-4"
        >
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="flex flex-col items-center gap-1">
              <Gauge className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{vehicle.horsepower} HP</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Fuel className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{vehicle.fuelType}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Settings2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{vehicle.transmission}</span>
            </div>
          </div>
        </motion.div>

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => onToggleFavorite?.(vehicle.id)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full glass transition-colors cursor-pointer",
              isFavorite && "text-red-500"
            )}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </button>
          <button
            onClick={() => onToggleCompare?.(vehicle.id)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full glass transition-colors cursor-pointer",
              isCompare && "text-foreground bg-secondary"
            )}
            aria-label={isCompare ? "Remove from compare" : "Add to compare"}
          >
            <GitCompare className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {vehicle.brand} · {vehicle.year}
            </p>
            <Link href={`/inventory/${vehicle.slug}`}>
              <h3 className="text-display mt-1 text-xl font-medium transition-opacity hover:opacity-70">
                {vehicle.model}
              </h3>
            </Link>
          </div>
          <p className="text-sm font-medium whitespace-nowrap">
            {formatPrice(vehicle.price)}
          </p>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          {formatNumber(vehicle.mileage)} mi · {vehicle.engine}
        </p>

        <Link
          href={`/inventory/${vehicle.slug}`}
          className="group/link mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-widest transition-opacity hover:opacity-60 cursor-pointer"
        >
          View Details
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}
