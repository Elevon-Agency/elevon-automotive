import Link from "next/link";
import { Share2, Globe, Mail } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Collection", href: "/#collection" },
    { label: "Inventory", href: "/inventory" },
    { label: "Experience", href: "/#experience" },
  ],
  Services: [
    { label: "Test Drive", href: "/contact#test-drive" },
    { label: "Financing", href: "/contact" },
    { label: "Trade-In", href: "/contact" },
  ],
  Company: [
    { label: "About", href: "/#experience" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-wide py-20">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-display text-2xl font-semibold tracking-tight"
            >
              APEX
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Defining the future of automotive excellence. Curated hypercars
              and supercars for the discerning collector.
            </p>
            <div className="mt-8 flex gap-4">
              {[
                { icon: Share2, label: "Instagram" },
                { icon: Globe, label: "YouTube" },
                { icon: Mail, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {title}
              </h3>
              <ul className="mt-6 space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-muted-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Apex Motors. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
