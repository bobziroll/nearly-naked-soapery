import { productAwards } from "@/lib/sampleProducts";

const pastelPalette = ["#F9F1EB", "#EAF8F0", "#FFF7DA", "#F3E7FF"];

export function AwardsStrip() {
  return (
    <section className="bg-white/70 py-10">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-4 px-4">
        {productAwards.map((award, index) => (
          <div
            key={award.id}
            className="flex flex-col items-center rounded-full px-6 py-4 text-center text-xs uppercase tracking-[0.4em] text-muted-foreground"
            style={{ backgroundColor: pastelPalette[index % pastelPalette.length] }}
          >
            <span>{award.label}</span>
            <span className="text-sm font-semibold tracking-[0.3em] text-foreground">
              {award.year}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

