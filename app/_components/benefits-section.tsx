import Image from "next/image";

import { SectionHeading } from "@/app/_components/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const benefitItems = [
  "Only natural ingredients are used in our soaps.",
  "We combine cold-pressed olive oil, coconut oil, and cocoa butter.",
  "Each bar contains antioxidants and vitamin E.",
  "Our soap cleanses, nourishes, and deeply moisturizes skin.",
];

const collageImages = [
  {
    id: "primary",
    src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
    wrapper: "h-72 w-full rounded-[2rem] shadow-floating overflow-hidden",
    image: "h-full w-full object-cover",
  },
  {
    id: "secondary",
    src: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80",
    wrapper:
      "h-48 w-full rounded-[1.5rem] shadow-xl overflow-hidden md:absolute md:-right-10 md:bottom-0 md:w-60",
    image: "h-full w-full object-cover",
  },
];

export function BenefitsSection() {
  return (
    <section className="mx-auto max-w-content-wide px-4 py-16">
      <div className="grid gap-12 rounded-[2.5rem] bg-white/80 p-8 shadow-floating md:grid-cols-2 md:items-center md:p-12">
        <div className="relative space-y-6">
          {collageImages.map((image) => (
            <div
              key={image.id}
              className={cn("relative", image.wrapper)}
            >
              <Image
                src={image.src}
                alt="Soap lifestyle imagery"
                width={900}
                height={900}
                className={image.image}
              />
            </div>
          ))}
        </div>
        <div className="space-y-8">
          <SectionHeading
            eyebrow="100% natural"
            title="Great for Your Skin."
            description="Our organic soaps gently take care of your skin every single wash."
          />
          <ul className="space-y-4 text-muted-foreground">
            {benefitItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  ✓
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
          <Button variant="ghost" className="px-0 text-sm uppercase tracking-[0.5em]">
            Learn More →
          </Button>
        </div>
      </div>
    </section>
  );
}

