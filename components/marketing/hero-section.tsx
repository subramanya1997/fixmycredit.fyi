"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export function HeroSection() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist");
    waitlistSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:opacity-10" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:opacity-10" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-950/50 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            Early Access Available
          </div>

          {/* Main headline */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white">
            {siteConfig.branding.tagline}
          </h1>

          {/* Subheadline */}
          <p className="mb-10 text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Data-driven credit repair platform with AI-powered insights and professional dispute tools. Start improving your credit score today.
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={scrollToWaitlist}
              className="group relative inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] dark:bg-white dark:text-slate-900"
            >
              Join Waitlist
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">500+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">On Waitlist</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">10K+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Simulations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">$15</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Per Month</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
