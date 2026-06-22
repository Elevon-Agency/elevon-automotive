"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { X } from "lucide-react";

export interface FilterState {
  search: string;
  priceRange: [number, number];
  brand: string;
  model: string;
  bodyStyle: string;
  fuelType: string;
  transmission: string;
  horsepowerRange: [number, number];
  yearRange: [number, number];
  mileageRange: [number, number];
}

export const defaultFilters: FilterState = {
  search: "",
  priceRange: [0, 5000000],
  brand: "all",
  model: "all",
  bodyStyle: "all",
  fuelType: "all",
  transmission: "all",
  horsepowerRange: [0, 2000],
  yearRange: [2000, 2027],
  mileageRange: [0, 300000]
};


interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;

  models: string[];
  brands: string[];
  bodyStyles: string[];
  fuelTypes: string[];
  transmissions: string[];

  resultCount: number;
  onClose?: () => void;
}

export function FilterSidebar({
  filters,
  onChange,
  models,
  brands,
  bodyStyles,
  fuelTypes,
  transmissions,
  resultCount,
  onClose,
}: FilterSidebarProps) {
  const update = (partial: Partial<FilterState>) => {
    onChange({ ...filters, ...partial });
  };

  const reset = () => onChange(defaultFilters);

  return (
    <aside className="space-y-8" data-lenis-prevent>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-display text-lg font-medium">Filters</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {resultCount} vehicles
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={reset}>
            Reset
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close filters">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Price Range</Label>
        <Slider
          min={0}
          max={5000000}
          step={50000}
          value={filters.priceRange}
          onValueChange={(v) => update({ priceRange: v as [number, number] })}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatPrice(filters.priceRange[0])}</span>
          <span>{formatPrice(filters.priceRange[1])}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Brand</Label>
        <Select value={filters.brand} onValueChange={(v) => update({ brand: v, model: "all" })}>
          <SelectTrigger>
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Model</Label>
        <Select value={filters.model} onValueChange={(v) => update({ model: v })}>
          <SelectTrigger>
            <SelectValue placeholder="All Models" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Models</SelectItem>
            {models.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Body Style</Label>
        <Select value={filters.bodyStyle} onValueChange={(v) => update({ bodyStyle: v })}>
          <SelectTrigger>
            <SelectValue placeholder="All Styles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Styles</SelectItem>
            {bodyStyles.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Fuel Type</Label>
        <Select value={filters.fuelType} onValueChange={(v) => update({ fuelType: v })}>
          <SelectTrigger>
            <SelectValue placeholder="All Fuel Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fuel Types</SelectItem>
            {fuelTypes.map((f) => (
              <SelectItem key={f} value={f}>{f}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Transmission</Label>
        <Select value={filters.transmission} onValueChange={(v) => update({ transmission: v })}>
          <SelectTrigger>
            <SelectValue placeholder="All Transmissions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transmissions</SelectItem>
            {transmissions.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Horsepower</Label>
        <Slider
          min={0}
          max={2000}
          step={50}
          value={filters.horsepowerRange}
          onValueChange={(v) => update({ horsepowerRange: v as [number, number] })}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{filters.horsepowerRange[0]} HP</span>
          <span>{filters.horsepowerRange[1]} HP</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Year</Label>
        <Slider
          min={2018}
          max={2025}
          step={1}
          value={filters.yearRange}
          onValueChange={(v) => update({ yearRange: v as [number, number] })}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{filters.yearRange[0]}</span>
          <span>{filters.yearRange[1]}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Mileage</Label>
        <Slider
          min={0}
          max={50000}
          step={500}
          value={filters.mileageRange}
          onValueChange={(v) => update({ mileageRange: v as [number, number] })}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{filters.mileageRange[0].toLocaleString()} mi</span>
          <span>{filters.mileageRange[1].toLocaleString()} mi</span>
        </div>
      </div>
    </aside>
  );
}
