import { Github, Twitter, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {siteConfig.branding.name}
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              Data-driven credit repair for everyone. Fix your credit score the smart way.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
              Product
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#features"
                  className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#waitlist"
                  className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Join Waitlist
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/privacy"
                  className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} {siteConfig.branding.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
