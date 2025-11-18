import Image from "next/image"
import Link from "next/link"

const navLinks = ["About Us", "Categories", "Products", "Contact"]

export function SiteHeader() {
    return (
        <header className="mx-auto flex w-full max-w-[80%] flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full items-center justify-center sm:w-auto sm:justify-start">
                <Image
                    src="/assets/nns-logo.png"
                    alt="Nearly Naked Soapery"
                    width={440}
                    height={239}
                    priority
                    className="h-auto w-36 max-w-full sm:w-42"
                />
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
                <nav className="flex items-center gap-3 overflow-x-auto text-sm text-muted-foreground lg:gap-6">
                    {navLinks.map(item => (
                        <Link
                            key={item}
                            href="#"
                            className="transition-colors hover:text-foreground"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}
