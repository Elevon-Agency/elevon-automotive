"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { VehicleCard } from "@/components/inventory/vehicle-card";
import {
  FilterSidebar,
  FilterState,
  defaultFilters,
} from "@/components/inventory/filter-sidebar";
import { Vehicle } from "@/lib/types/vehicle";
import { AnimatedText } from "@/components/shared/animated-text";

const ITEMS_PER_PAGE = 6;

export function InventoryContent({ vehicles }: { vehicles: Vehicle[] }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [compare, setCompare] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const models = useMemo(() => {
    const brandModels =
      filters.brand === "all"
        ? vehicles
        : vehicles.filter((v) => v.brand === filters.brand);
    return [...new Set(brandModels.map((v) => v.model))];
  }, [filters.brand, vehicles]);
  const brands = useMemo(() => {
    return [...new Set(vehicles.map((v) => v.brand))].sort();
  }, [vehicles]);

  const bodyStyles = useMemo(() => {
    return [...new Set(vehicles.map((v) => v.bodyStyle))].sort();
  }, [vehicles]);

  const fuelTypes = useMemo(() => {
    return [...new Set(vehicles.map((v) => v.fuelType))].sort();
  }, [vehicles]);

  const transmissions = useMemo(() => {
    return [...new Set(vehicles.map((v) => v.transmission))].sort();
  }, [vehicles]);

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !v.brand.toLowerCase().includes(q) &&
          !v.model.toLowerCase().includes(q)
        )
          return false;
      }
      if (v.price < filters.priceRange[0] || v.price > filters.priceRange[1])
        return false;
      if (filters.brand !== "all" && v.brand !== filters.brand) return false;
      if (filters.model !== "all" && v.model !== filters.model) return false;
      if (filters.bodyStyle !== "all" && v.bodyStyle !== filters.bodyStyle)
        return false;
      if (filters.fuelType !== "all" && v.fuelType !== filters.fuelType)
        return false;
      if (
        filters.transmission !== "all" &&
        v.transmission !== filters.transmission
      )
        return false;
      if (
        v.horsepower < filters.horsepowerRange[0] ||
        v.horsepower > filters.horsepowerRange[1]
      )
        return false;
      if (v.year < filters.yearRange[0] || v.year > filters.yearRange[1])
        return false;
      if (
        v.mileage < filters.mileageRange[0] ||
        v.mileage > filters.mileageRange[1]
      )
        return false;
      return true;
    });
  }, [filters, vehicles]);

  console.log("VEHICLES:", vehicles);
  console.log("FILTERS:", filters);
  console.log("FILTERED:", filtered);

  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompare((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 3) next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <div className="container-wide py-32">
      <div className="mb-16">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Inventory
        </p>
        <AnimatedText
          text="Curated Excellence"
          as="h1"
          className="text-display mt-4 text-4xl font-light sm:text-5xl lg:text-6xl"
        />
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-8"
          />
        </div>
        <Button
          variant="outline"
          className="lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid gap-12 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              models={models}
              brands={brands}
              bodyStyles={bodyStyles}
              fuelTypes={fuelTypes}
              transmissions={transmissions}
              resultCount={filtered.length}
            />
          </div>
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 bg-background lg:hidden">
            <div className="h-full overflow-y-auto p-6 pt-24">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                models={models}
                brands={brands}
                bodyStyles={bodyStyles}
                fuelTypes={fuelTypes}
                transmissions={transmissions}
                resultCount={filtered.length}
                onClose={() => setMobileFiltersOpen(false)}
              />
            </div>
          </div>
        )}

        <div>
          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-display text-2xl font-light">
                No vehicles match your criteria
              </p>
              <p className="mt-4 text-muted-foreground">
                Try adjusting your filters or search terms.
              </p>
              <Button
                variant="outline"
                className="mt-8"
                onClick={() => setFilters(defaultFilters)}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {paginated.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      isFavorite={favorites.has(vehicle.id)}
                      isCompare={compare.has(vehicle.id)}
                      onToggleFavorite={toggleFavorite}
                      onToggleCompare={toggleCompare}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {hasMore && (
                <div className="mt-16 text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}

          {compare.size > 0 && (
            <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 glass rounded-full px-6 py-3 text-sm">
              {compare.size} vehicle{compare.size > 1 ? "s" : ""} selected for
              comparison
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
