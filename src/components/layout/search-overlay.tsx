"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Vehicle } from "@/lib/types/vehicle";
import { formatPrice } from "@/lib/utils";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
}

export function SearchOverlay({ open, onClose, vehicles }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        `${v.brand} ${v.model}`.toLowerCase().includes(q)
    );
  }, [query, vehicles]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-background/95 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Search inventory"
        >
          <div className="container-wide pt-24">
            <div className="flex items-center gap-4 border-b border-border pb-6">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <Input
                autoFocus
                placeholder="Search by make, model..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 text-2xl font-light focus-visible:border-0"
              />
              <button
                onClick={onClose}
                className="shrink-0 p-2 transition-opacity hover:opacity-60 cursor-pointer"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 max-h-[60vh] overflow-y-auto" data-lenis-prevent>
              {query && results.length === 0 && (
                <p className="text-muted-foreground py-8">
                  No vehicles found for &ldquo;{query}&rdquo;
                </p>
              )}
              {results.map((vehicle, i) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/inventory/${vehicle.slug}`}
                    onClick={onClose}
                    className="group flex items-center gap-6 border-b border-border py-6 transition-colors hover:bg-secondary/50 cursor-pointer"
                  >
                    <div className="relative h-20 w-32 shrink-0 overflow-hidden bg-muted">
                      <Image
                        src={vehicle.images[0]}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="128px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {vehicle.brand} · {vehicle.year}
                      </p>
                      <p className="text-display text-xl">{vehicle.model}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">
                        {formatPrice(vehicle.price)}
                      </span>
                      <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
