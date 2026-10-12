"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createWorkspace } from "./actions";
import { COUNTRIES } from "@/lib/const/countries";

const onboardingSchema = z.object({
  companyName: z.string().min(2, "Company Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Workspace URL must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  countryCode: z.string().length(2, "Please select a valid country"),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

export function OnboardingForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [openCountryBox, setOpenCountryBox] = useState(false);

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      companyName: "",
      slug: "",
      countryCode: "",
    },
  });

  const companyName = form.watch("companyName");
  const countryCode = form.watch("countryCode");

  useEffect(() => {
    if (companyName && !isSlugManuallyEdited) {
      const generatedSlug = companyName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [companyName, isSlugManuallyEdited, form]);

  const onSubmit = async (data: OnboardingFormData) => {
    setError(null);
    try {
      await createWorkspace(data);
    } catch (err: any) {
      setError(err.message || "Failed to create workspace. Please try again.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
          {error}
        </div>
      )}

      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Company Name
        </label>
        <Input
          placeholder="e.g. Acme Corporation"
          {...form.register("companyName")}
          disabled={form.formState.isSubmitting}
        />
        {form.formState.errors.companyName && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.companyName.message}
          </p>
        )}
      </div>

      {/* Workspace Slug */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Workspace URL
        </label>
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-200 bg-slate-50 text-slate-500 sm:text-sm">
            reversebid.com/
          </span>
          <Input
            placeholder="acme-corporation"
            className="rounded-l-none"
            {...form.register("slug")}
            disabled={form.formState.isSubmitting}
            onChange={(e) => {
              setIsSlugManuallyEdited(true);
              form.register("slug").onChange(e);
            }}
          />
        </div>
        {form.formState.errors.slug && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.slug.message}
          </p>
        )}
      </div>

      {/* Country Selection (Combobox) */}
      <div className="flex flex-col">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Country
        </label>
        <Popover open={openCountryBox} onOpenChange={setOpenCountryBox}>
          <PopoverTrigger>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCountryBox}
              className={`w-full justify-between font-normal ${
                !countryCode ? "text-slate-500" : "text-slate-900"
              }`}
              disabled={form.formState.isSubmitting}
            >
              {countryCode
                ? COUNTRIES.find((country) => country.value === countryCode)
                    ?.label
                : "Select a country..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup className="max-h-60 overflow-auto">
                {COUNTRIES.map((country) => (
                  <CommandItem
                    key={country.value}
                    value={country.label}
                    onSelect={() => {
                      form.setValue("countryCode", country.value, {
                        shouldValidate: true,
                      });
                      setOpenCountryBox(false);
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        countryCode === country.value
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                    {country.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {form.formState.errors.countryCode && (
          <p className="text-red-500 text-xs mt-1">
            {form.formState.errors.countryCode.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full mt-2"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? "Creating Workspace..."
          : "Create Workspace"}
      </Button>
    </form>
  );
}
