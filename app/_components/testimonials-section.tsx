import { Star } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SectionHeading } from "@/app/_components/section-heading";
import { productReviews, products } from "@/lib/sampleProducts";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-content-wide px-4 py-16">
      <div className="space-y-10">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="Loved by Delicate Skin"
          description="Real notes from the community trying every botanical blend we pour."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {productReviews.map((review) => {
            const product = products.find((item) => item.id === review.productId);

            return (
              <Card key={review.id} className="rounded-[1.5rem]">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const isFilled = review.rating - index > 0.5;
                      return (
                        <Star
                          key={index}
                          className={cn(
                            "h-4 w-4",
                            isFilled
                              ? "fill-amber-500 text-amber-500"
                              : "text-muted-foreground/30",
                          )}
                        />
                      );
                    })}
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    {product?.name}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>“{review.quote}”</p>
                  <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground/80">
                    {review.customer} · {review.location}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

