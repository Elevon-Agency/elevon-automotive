"use client";

import { useActionState, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CarFormValue = {
  brand?: string;
  model?: string;
  year?: number;
  price?: number;
  mileage?: number;
  bodyStyle?: string;
  fuelType?: string;
  transmission?: string;
  horsepower?: number;
  engine?: string;
  torque?: string;
  acceleration?: string;
  topSpeed?: string;
  drivetrain?: string;
  weight?: string;
  description?: string;
  featured?: boolean;
  status?: string;
  images?: { url: string }[];
};

const bodyStyles = ["COUPE", "CONVERTIBLE", "SEDAN", "SUV", "HYPERCAR"];
const fuelTypes = ["PETROL", "HYBRID", "ELECTRIC"];
const transmissions = ["AUTOMATIC", "MANUAL", "DCT"];
const statuses = ["AVAILABLE", "RESERVED", "SOLD", "DRAFT"];

export function CarForm({
  action,
  car,
  submitLabel,
}: {
  action: (state: unknown, formData: FormData) => Promise<unknown>;
  car?: CarFormValue;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, null);
  const [imageUrls, setImageUrls] = useState((car?.images || []).map((image) => image.url).join("\n"));
  const [uploading, setUploading] = useState(false);

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const signatureResponse = await fetch("/api/admin/upload/signature", { method: "POST" });
        if (!signatureResponse.ok) throw new Error("Cloudinary is not configured.");
        const signature = await signatureResponse.json();
        const form = new FormData();
        form.append("file", file);
        form.append("api_key", signature.apiKey);
        form.append("timestamp", signature.timestamp);
        form.append("signature", signature.signature);
        form.append("folder", signature.folder);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, {
          method: "POST",
          body: form,
        });
        if (!res.ok) throw new Error("Upload failed.");
        const data = await res.json();
        uploaded.push(data.secure_url);
      }
      setImageUrls((current) => [current, ...uploaded].filter(Boolean).join("\n"));
    } finally {
      setUploading(false);
    }
  }

  const field = (name: keyof CarFormValue, label: string, type = "text") => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} defaultValue={String(car?.[name] ?? "")} required />
    </div>
  );

  return (
    <form action={formAction} className="space-y-8">
      {(state as { error?: string } | null)?.error && (
        <div className="border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {(state as { error: string }).error}
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        {field("brand", "Brand")}
        {field("model", "Model")}
        {field("year", "Year", "number")}
        {field("price", "Price", "number")}
        {field("mileage", "Mileage", "number")}
        {field("horsepower", "Power (HP)", "number")}
        {field("engine", "Engine")}
        {field("torque", "Torque")}
        {field("acceleration", "0-100 km/h")}
        {field("topSpeed", "Top speed")}
        {field("drivetrain", "Drivetrain")}
        {field("weight", "Weight")}
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <SelectField name="bodyStyle" label="Body style" values={bodyStyles} value={car?.bodyStyle} />
        <SelectField name="fuelType" label="Fuel type" values={fuelTypes} value={car?.fuelType} />
        <SelectField name="transmission" label="Transmission" values={transmissions} value={car?.transmission} />
        <SelectField name="status" label="Status" values={statuses} value={car?.status || "AVAILABLE"} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={car?.description || ""} required />
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Label htmlFor="imageUrls">Images</Label>
          <label className="inline-flex h-10 cursor-pointer items-center gap-2 border border-border px-4 text-sm hover:bg-secondary">
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Upload"}
            <input type="file" accept="image/*" multiple className="hidden" onChange={(event) => uploadFiles(event.target.files)} />
          </label>
        </div>
        <Textarea
          id="imageUrls"
          name="imageUrls"
          value={imageUrls}
          onChange={(event) => setImageUrls(event.target.value)}
          placeholder="One image URL per line"
          required
        />
        <p className="text-xs text-muted-foreground">First image is used as the primary listing image.</p>
      </div>

      <label className="flex items-center gap-3 text-sm">
        <input name="featured" type="checkbox" defaultChecked={car?.featured} className="h-4 w-4" />
        Featured on homepage
      </label>

      <Button type="submit" disabled={pending || uploading}>
        {pending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}

function SelectField({ name, label, values, value }: { name: string; label: string; values: string[]; value?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <select id={name} name={name} defaultValue={value || values[0]} className="h-12 w-full border-b border-border bg-background text-sm focus:outline-none">
        {values.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}
