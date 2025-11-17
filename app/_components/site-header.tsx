import Link from "next/link";
import { Leaf } from "lucide-react";

import { Button } from "@/components/ui/button";

const navLinks = ["About Us", "Categories", "Shop", "Testimonials", "Contact"];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-content flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 text-foreground">
        <div className="rounded-full bg-primary/15 p-3 text-primary shadow-inner shadow-primary/20">
          <Leaf className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.6em] text-muted-foreground">
            purity
          </p>
          <p className="text-lg font-semibold text-foreground">
            Nearly Naked Soap Co.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
        <nav className="flex items-center gap-3 overflow-x-auto text-sm text-muted-foreground lg:gap-6">
          {navLinks.map((item) => (
            <Link
              key={item}
              href="#"
              className="transition-colors hover:text-foreground"
            >
              {item}
            </Link>
          ))}
        </nav>
        <Button className="w-full rounded-full px-6 py-5 text-sm uppercase tracking-[0.5em] lg:w-auto">
          Shop Now
        </Button>
      </div>
    </header>
  );
}

