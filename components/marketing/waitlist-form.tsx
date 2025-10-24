"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { waitlistSchema, type WaitlistFormData } from "@/lib/validations";
import { trackWaitlistSignup } from "@/lib/analytics/gtag";

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error?.code === "EMAIL_EXISTS") {
          setErrorMessage("You're already on our waitlist! We'll be in touch soon.");
        } else {
          setErrorMessage(
            result.error?.message || "Something went wrong. Please try again."
          );
        }
        return;
      }

      // Success!
      setIsSuccess(true);
      reset();
      
      // Track conversion in Google Analytics
      trackWaitlistSignup(data.email);
    } catch (error) {
      console.error("Error submitting waitlist form:", error);
      setErrorMessage("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center dark:border-emerald-800/50 dark:bg-emerald-950/30">
        <div className="mb-6 inline-flex rounded-full bg-emerald-100 p-4 dark:bg-emerald-900/30">
          <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
          You're on the list!
        </h3>
        <p className="mb-6 text-slate-600 dark:text-slate-400">
          Check your inbox for a confirmation email. We'll notify you as soon as we launch.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name field */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Full Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="John Doe"
            className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-white dark:focus:ring-white/10"
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="john@example.com"
            className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-white dark:focus:ring-white/10"
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-950/30">
            <p className="text-sm text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Joining...
            </span>
          ) : (
            "Join Waitlist"
          )}
        </button>

        {/* Privacy notice */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
