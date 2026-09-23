import { ButtonLink } from "@/components/ButtonLink";
import { Content } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next";
import { SkaterScribble } from "./SkaterScribble";
import { clsx } from "clsx";

interface SkaterProps {
    skater: Content.SkaterDocument;
    index: number;
}

export const Skater = ({ skater, index }: SkaterProps) => {

    const colors = [
        "text-brand-blue",
        "text-brand-orange",
        "text-brand-purple",
        "text-brand-lime",
        "text-brand-pink",
    ]

    const scribbleColor = colors[index];

    return (
        <div className="skater group relative flex flex-col items-center gap-4">
      <div className="stack-layout relative aspect-3/4 w-full overflow-hidden">
        <PrismicNextImage
          field={skater.data.photo_background}
          width={500}
          imgixParams={{ q: 20 }}
          alt=""
          className="absolute inset-0 z-0 h-full w-full scale-110 object-cover transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
        />
        <SkaterScribble className={clsx("pointer-events-none absolute inset-0 z-5 h-full w-full", scribbleColor)} />
        <PrismicNextImage
          field={skater.data.photo_foreground}
          width={500}
          alt=""
          className="absolute inset-0 z-10 h-full w-full object-contain transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 z-30 h-48 w-full bg-linear-to-t from-black via-transparent to-transparent"></div>
        <h3 className="absolute inset-x-0 bottom-0 z-30 grid justify-self-start p-2 font-sans text-brand-gray ~text-2xl/3xl">
          <span className="mb-[-.3em] block">{skater.data.first_name}</span>
          <span className="block">{skater.data.last_name}</span>
        </h3>
      </div>
      <ButtonLink field={skater.data.customizer_link} size="sm">
        Build their board
      </ButtonLink>
    </div>

    )
}


{/* <div
            className="group flex flex-col items-center gap-4 text-center"
        >
            <div className="stack-layout relative h-full w-full overflow-hidden">
                <PrismicNextImage 
                imgixParams={{q:20}}
                alt=""
                field={skater.data.photo_background}
                width={300}
                height={400}
                className="absolute inset-0 z-0 h-full w-full scale-110 object-cover transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
                />
                <SkaterScribble
                    className={clsx(
                        "pointer-events-none absolute inset-0 z-5 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                        scribbleColor
                    )}
                />
                <PrismicNextImage 
                field={skater.data.photo_foreground}
                alt=""
                width={300}
                height={400}
                className="absolute inset-0 z-10 h-full w-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 group-hover:bg-black/10"
                />
                <div className="relative z-30 h-48 w-full place-self-end bg-linear-to-t from-black via-transparent to-transparent" />
                <div
                className="absolute inset-x-0 bottom-0 z-30 flex w-full flex-col items-start gap-0 p-2 text-3xl leading-none text-white">
                    <span className="block">{skater.data.first_name}</span>
                    <span className="block">{skater.data.last_name}</span>
                </div>
            </div>

            <ButtonLink
            field={skater.data.customizer_link}
            size="sm"
            >
                Build their board
            </ButtonLink>
        </div> */}