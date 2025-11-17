import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/app/_components/section-heading";
import { featuredProductId, productAwards, products } from "@/lib/sampleProducts";

const featuredProduct = products.find((product) => product.id === featuredProductId)!;
const featuredAwards = productAwards.filter(
  (award) => award.productId === featuredProductId,
);

export function FeaturedProductSection() {
  return (
    <section className="mx-auto max-w-content-wide px-4 py-16">
      <div className="grid gap-12 rounded-[2.5rem] bg-gradient-to-r from-[#c2e6d3] via-[#b1e4d2] to-[#a3dcd5] p-10 text-emerald-900 md:grid-cols-2 md:items-center">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Top choice"
            title={featuredProduct.name}
            description={featuredProduct.description}
          />
          <dl className="grid gap-4 rounded-2xl bg-white/50 p-6 text-sm text-emerald-800 sm:grid-cols-2">
            <div>
              <dt className="uppercase tracking-[0.4em] text-emerald-500">
                Price
              </dt>
              <dd className="text-3xl font-semibold text-emerald-900">
                ${featuredProduct.price.toFixed(2)}
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.4em] text-emerald-500">
                Weight
              </dt>
              <dd className="text-3xl font-semibold text-emerald-900">
                {featuredProduct.weightOz} oz
              </dd>
            </div>
          </dl>
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-emerald-600">
              Scent Notes
            </p>
            <ul className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
              {featuredProduct.scentNotes.map((note) => (
                <li
                  key={note}
                  className="rounded-full border border-emerald-200 px-4 py-2"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            {featuredProduct.badges?.map((badge) => (
              <Badge
                key={badge}
                variant="outline"
                className="border-emerald-300 text-emerald-900"
              >
                {badge}
              </Badge>
            ))}
          </div>
          <Button className="rounded-full bg-emerald-900 px-8 py-6 text-sm uppercase tracking-[0.4em] text-white hover:bg-emerald-900/90">
            Try Now
          </Button>
        </div>
        <div className="relative">
          <div className="rounded-[2.5rem] bg-white/80 p-6 shadow-floating">
            <div className="relative">
              <Image
                src={featuredProduct.image}
                alt={featuredProduct.name}
                width={900}
                height={900}
                className="h-[26rem] w-full rounded-[2rem] object-cover"
              />
              <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-3 rounded-2xl bg-white/90 px-6 py-4 text-sm shadow-floating">
                {featuredAwards.map((award) => (
                  <div key={award.id} className="text-center">
                    <p className="text-xs uppercase tracking-[0.4em] text-emerald-500">
                      {award.year}
                    </p>
                    <p className="font-semibold text-emerald-900">{award.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

