import Image from "next/image";

import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative flex w-full flex-col gap-10 pb-12 pt-6 md:flex-row md:items-center md:gap-0 lg:pt-10">
            <div className="mx-auto flex w-full max-w-content flex-1 flex-col pl-6 pr-4 md:pl-12 md:pr-8 lg:pl-16">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                            Your skin will thank you.
                        </p>
                        <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-[3.5rem]">
                            Handcrafted Organic{" "}
                            <span className="text-primary">Soap.</span>
                        </h1>
                        <p className="max-w-xl text-lg text-muted-foreground">
                            Making your body and thoughts clean and clear with
                            gentle botanicals, small-batch craftsmanship, and
                            packaging that loves the planet.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <Button className="rounded-full px-8 py-6 text-sm uppercase tracking-[0.4em]">
                            See Products
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full border-2 border-foreground/20 bg-transparent px-8 py-6 text-sm uppercase tracking-[0.4em]"
                        >
                            About Us
                        </Button>
                    </div>
                </div>
            </div>
            <div className="relative flex-1 md:-mr-4 lg:-mr-8">
                <div className="relative rounded-[2.5rem] bg-white/70 p-4 shadow-floating backdrop-blur md:rounded-l-[2.5rem] md:rounded-r-none">
                    <Image
                        src="https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?auto=format&fit=crop&w=960&q=80"
                        alt="Handcrafted soaps with flowers"
                        width={960}
                        height={640}
                        className="h-80 w-full rounded-3xl object-cover shadow-floating sm:h-[28rem] md:rounded-l-3xl md:rounded-r-none"
                        priority
                    />
                    <Image
                        src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
                        alt="Soap making ingredients"
                        width={600}
                        height={900}
                        className="absolute -bottom-8 left-6 hidden w-40 -rotate-3 rounded-2xl border-4 border-white object-cover shadow-xl md:block"
                    />
                </div>
            </div>
        </section>
    )
}

