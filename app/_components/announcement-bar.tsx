import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

const socialLinks = [
  { id: "facebook", icon: Facebook, href: "#" },
  { id: "instagram", icon: Instagram, href: "#" },
  { id: "youtube", icon: Youtube, href: "#" },
];

export function AnnouncementBar() {
  return (
    <div className="w-full bg-muted/70 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 px-4 py-3 text-xs uppercase tracking-[0.3em] sm:flex-row sm:text-[0.7rem] sm:tracking-[0.5em]">
        <p className="text-center text-foreground/70 sm:text-left">
          20% off seasonal soaps · Free shipping over $40
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-label={item.id}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

