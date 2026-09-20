import { ButtonLink } from "@/components/ButtonLink";
import { HorizontalLine, VerticalLine } from "@/components/Line";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next"
import clsx from "clsx";
import { FaStar } from "react-icons/fa6";
import { Scribble } from "./Scribble";

interface SkateboardProductProps {
    id: string;
}

async function getDominantColor(url: string) {
    const paletteUrl = new URL(url);
    paletteUrl.searchParams.set("palette", "json");

    const res = await fetch(paletteUrl)
    const json = await res.json();

    return (json.dominant_colors.vibrant?.hex || json.dominant_colors.vibrant_light?.hex)
}

const VERTICAL_LINE_CLASSES =
  "absolute top-0 h-full stroke-2 text-stone-300 opacity-70 transition-all duration-500 ease-out group-hover:scale-x-125 group-hover:text-stone-500 group-hover:opacity-100";

const HORIZONTAL_LINE_CLASSES =
  "-mx-4 stroke-2 text-stone-300 opacity-70 transition-all duration-500 ease-out group-hover:scale-y-125 group-hover:text-stone-500 group-hover:opacity-100";

export async function SkateboardProduct({ id }: SkateboardProductProps) {

    const client = createClient();
    const skateboard = await client.getByID<Content.SkateboardDocument>(id);

    const price = skateboard.data.price_cents ?? 0;

    const dominantColor = isFilled.image(skateboard.data.image) ? await getDominantColor(skateboard.data.image.url) : "#000000";

    return (
       <div
       className="group relative mx-auto w-full max-w-60 pt-4 pb-6">
            <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "-left-0.75")} />
            <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "-right-0.75")} />
            <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />
            <div
            className="flex justify-between items-center p-4">
                <p className="text-2xl font-mono font-extralight">{price}</p>
                <span
                className="inline-flex items-center gap-1 ml-6">
                    <FaStar className="text-yellow-400" size={26} />
                    <span className="text-2xl font-mono font-extralight mt-1">37</span>
                </span>
            </div>
            <div
            className="overflow-hidden items-center -mb-1 px-8">
                <Scribble color={dominantColor} className="absolute inset-0 w-full h-full"/>
                <PrismicNextImage 
                height={130} 
                field={skateboard.data.image} 
                width={130} 
                className="mx-auto w-[78%] max-w-32.5 pb-4 origin-top transform-cpu transition-transform duration-500 ease-in-out group-hover:scale-140"/>
            </div>
            <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />
            <h3
            className="text-xl font-sans leading-tight text-center mt-3">
               {skateboard.data.title} 
            </h3>
            <div className="absolute inset-0 flex items-center px-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ButtonLink 
                field={skateboard.data.customizer_link}
                >
                    Customize
                </ButtonLink>
            </div>
       </div>
    )
}