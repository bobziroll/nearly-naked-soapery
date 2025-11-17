import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/app/_components/section-heading";
import { products } from "@/lib/sampleProducts";

export function ProductGrid() {
  return (
    <section className="mx-auto max-w-content-wide px-4 py-16">
      <div className="space-y-10">
        <SectionHeading
          align="center"
          eyebrow="New collection"
          title="Small Batches. Big Heart."
          description="Choose from our current studio-favorite recipes—each poured, wrapped, and shipped within 24 hours."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden rounded-[2rem]">
              <CardHeader className="space-y-4 border-b border-border/70 pb-6">
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={640}
                    height={640}
                    className="h-60 w-full rounded-[1.2rem] object-cover"
                  />
                  {product.tag ? (
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                      {product.tag}
                    </span>
                  ) : null}
                </div>
                <CardTitle className="text-2xl font-semibold">
                  {product.name}
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="text-lg font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium">{product.weightOz} oz</span>
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                    Scent notes
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                    {product.scentNotes.map((note) => (
                      <span key={note} className="rounded-full bg-muted px-3 py-1">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full rounded-full px-8 py-6 uppercase tracking-[0.4em]">
                  Add to Ritual
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

