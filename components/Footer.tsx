import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"
import { createClient } from "@/prismicio";
import { Logo } from "@/components/Logo";
import { Bounded } from "./Bounded";
import { asImageSrc } from "@prismicio/client";
import { FooterPhysics } from "./FooterPhysics";

export const Footer = async () => {

    const client = createClient();
    const settings = await client.getSingle("settings");

    const boardTextureURLs = (settings.data.footer_skateboards ?? [])
        .map((item) => asImageSrc(item.skateboard, { h: 600 }))
        .filter((url): url is string => Boolean(url));

    return (
        <footer
        className="bg-texture bg-zinc-900 text-white">
            <div
            className="relative h-[75dvh] p-10 md:aspect-auto">
                <PrismicNextImage
                field={settings.data.footer_image}
                alt=""
                fill
                width={1200}
                className="object-cover"
                />
                <FooterPhysics
                    boardTextureURLs={boardTextureURLs}
                    className="absolute inset-0 overflow-hidden"
                />
                <Logo 
                className="relative pointer-events-none h-20 mix-blend-exclusion md:h-38" />
            </div>
            <Bounded as="nav">
                <ul className="flex flex-wrap items-center justify-center font-mono gap-4 md:gap-8 py-10 text-xl md:flex-row">
                    {settings.data.navigation.map((item, index) => (
                        <li 
                        key={index}
                        className="hover:underline"
                        >
                            <PrismicNextLink
                            field={item.link}
                            />
                        </li>
                    ))}
                </ul>
            </Bounded>
        </footer>
    )
}