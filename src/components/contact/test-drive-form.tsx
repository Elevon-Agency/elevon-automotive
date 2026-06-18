"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Clock, Car } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { vehicles } from "@/lib/vehicles";
import { cn } from "@/lib/utils";

const testDriveSchema = z.object({
  vehicle: z.string().min(1, "Please select a vehicle"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
});

type TestDriveFormData = z.infer<typeof testDriveSchema>;

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export function TestDriveForm() {
  const [confirmed, setConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<TestDriveFormData | null>(
    null
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TestDriveFormData>({
    resolver: zodResolver(testDriveSchema),
  });

  const onSubmit = async (data: TestDriveFormData) => {
    const vehicle = vehicles.find((v) => v.slug === data.vehicle);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: "test-drive-form",
        message: `Test drive request for ${vehicle ? `${vehicle.brand} ${vehicle.model}` : data.vehicle} on ${data.date} at ${data.time}.`,
      }),
    });
    if (!response.ok) throw new Error("Test drive request failed");
    setBookingDetails(data);
    setConfirmed(true);
    reset();
  };

  const selectedVehicle = bookingDetails
    ? vehicles.find((v) => v.slug === bookingDetails.vehicle)
    : null;

  if (confirmed && bookingDetails) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="text-display mt-8 text-2xl font-light">
          Test Drive Confirmed
        </h3>
        <p className="mt-4 text-muted-foreground">
          Your private viewing has been scheduled.
        </p>
        <div className="mx-auto mt-8 max-w-sm space-y-4 text-left border border-border p-6">
          <div className="flex items-center gap-3 text-sm">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span>
              {selectedVehicle
                ? `${selectedVehicle.brand} ${selectedVehicle.model}`
                : bookingDetails.vehicle}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{bookingDetails.date}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{bookingDetails.time}</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setConfirmed(false);
            setBookingDetails(null);
          }}
        >
          Book Another
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-3">
        <Label>Select Vehicle</Label>
        <Controller
          name="vehicle"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className={cn(errors.vehicle && "border-destructive")}>
                <SelectValue placeholder="Choose a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((v) => (
                  <SelectItem key={v.slug} value={v.slug}>
                    {v.brand} {v.model} ({v.year})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.vehicle && (
          <p className="text-xs text-destructive">{errors.vehicle.message}</p>
        )}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <Label htmlFor="date">Preferred Date</Label>
          <Input
            id="date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            {...register("date")}
            className={cn(errors.date && "border-destructive")}
          />
          {errors.date && (
            <p className="text-xs text-destructive">{errors.date.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label>Preferred Time</Label>
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className={cn(errors.time && "border-destructive")}>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.time && (
            <p className="text-xs text-destructive">{errors.time.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-8 border-t border-border pt-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Your Details
        </p>
        <div className="space-y-3">
          <Label htmlFor="td-name">Full Name</Label>
          <Input
            id="td-name"
            {...register("name")}
            className={cn(errors.name && "border-destructive")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="td-email">Email</Label>
            <Input
              id="td-email"
              type="email"
              {...register("email")}
              className={cn(errors.email && "border-destructive")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="td-phone">Phone</Label>
            <Input
              id="td-phone"
              type="tel"
              {...register("phone")}
              className={cn(errors.phone && "border-destructive")}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Scheduling..." : "Confirm Test Drive"}
      </Button>
    </form>
  );
}
