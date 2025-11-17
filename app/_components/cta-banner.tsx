import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="px-4 pb-20">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 rounded-[2.5rem] bg-soft-wave px-8 py-14 text-center shadow-floating">
        <p className="text-sm uppercase tracking-[0.6em] text-muted-foreground">
          Keep glowing
        </p>
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Subscribe for limited drops & studio tours.
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          We release new recipes twice a month and invite subscribers to behind-the-scenes soap
          pouring sessions. No spam, just botanicals.
        </p>
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            className="h-14 flex-1 rounded-full border border-border/70 bg-white/80 px-6 text-base outline-none placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <Button className="h-14 rounded-full px-8 text-sm uppercase tracking-[0.4em]">
            Join List
          </Button>
        </div>
      </div>
    </section>
  );
}

