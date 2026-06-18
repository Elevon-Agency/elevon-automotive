"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

function FloatingInput({
  id,
  label,
  error,
  fieldValue,
  ...props
}: React.ComponentProps<typeof Input> & {
  label: string;
  error?: string;
  fieldValue?: string;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(fieldValue);

  return (
    <div className="relative">
      <Input
        id={id}
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={cn(error && "border-destructive")}
      />
      <Label
        htmlFor={id}
        className={cn(
          "absolute left-0 transition-all duration-300 pointer-events-none",
          focused || hasValue
            ? "-top-5 text-[10px] text-muted-foreground"
            : "top-3 text-sm text-muted-foreground"
        )}
      >
        {label}
      </Label>
      {error && (
        <p className="mt-2 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const watched = watch();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: `${data.subject}\n\n${data.message}`,
          source: "contact-form",
        }),
      });
      if (!response.ok) throw new Error("Lead submission failed");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm"
          >
            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
            Thank you for your enquiry. Our team will respond within 24 hours.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm"
          >
            <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
            Something went wrong. Please try again.
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <FloatingInput
          id="name"
          label="Full Name"
          error={errors.name?.message}
          fieldValue={watched.name}
          {...register("name")}
        />
        <FloatingInput
          id="email"
          label="Email Address"
          type="email"
          error={errors.email?.message}
          fieldValue={watched.email}
          {...register("email")}
        />
        <FloatingInput
          id="phone"
          label="Phone Number"
          type="tel"
          error={errors.phone?.message}
          fieldValue={watched.phone}
          {...register("phone")}
        />
        <FloatingInput
          id="subject"
          label="Subject"
          error={errors.subject?.message}
          fieldValue={watched.subject}
          {...register("subject")}
        />

        <div className="relative">
          <Textarea
            id="message"
            placeholder=" "
            {...register("message")}
            className={cn(errors.message && "border-destructive")}
          />
          <Label
            htmlFor="message"
            className={cn(
              "absolute left-0 transition-all duration-300 pointer-events-none",
              watched.message
                ? "-top-5 text-[10px] text-muted-foreground"
                : "top-3 text-sm text-muted-foreground"
            )}
          >
            Your Message
          </Label>
          {errors.message && (
            <p className="mt-2 text-xs text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Sending..." : "Send Enquiry"}
        </Button>
      </form>
    </div>
  );
}
