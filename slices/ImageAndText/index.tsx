import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import clsx from "clsx";
import { ButtonLink } from "@/components/ButtonLink";
import { ParallaxImage } from "./ParallaxImage";
import { SlideIn } from "@/components/SlideIn";

/**
 * Props for `ImageAndText`.
 */
export type ImageAndTextProps = SliceComponentProps<Content.ImageAndTextSlice>;

declare module "react" {
	interface CSSProperties {
		"--index"?: number;
	}
}

/**
 * Component for "ImageAndText" Slices.
 */
const ImageAndText: FC<ImageAndTextProps> = ({ slice, index }) => {

	const theme = slice.primary.theme;

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className={clsx(
				"md:sticky md:top-[calc(var(--index)*2rem)]",
				theme === "Blue" ? "bg-texture bg-brand-blue text-white" :
				theme === "Orange" ? "bg-texture bg-brand-orange text-white" :
				theme === "Navy" ? "bg-texture bg-brand-navy text-white" :
				theme === "Lime" ? "bg-texture bg-brand-lime text-black" : "bg-texture bg-gray-100 text-black"
			)}
			style={{ "--index": index }}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center md:gap-20 py-12">
				<div
				className={clsx(
					"flex flex-col items-center gap-8 text-center md:items-start md:text-left mt-20",
					slice.variation === "imageOnLeft" && "md:order-2"
				)}>
					<h1 className="text-5xl font-sans font-bold md:text-5xl lg:text-7xl relative max-w-sm">
						<SlideIn>
							<PrismicText field={slice.primary.heading} />
						</SlideIn>
					</h1>
					<div className="max-w-md text-lg leading-relaxed font-mono">
						<SlideIn delay={0.2}>
							<PrismicRichText field={slice.primary.body} />
						</SlideIn>
					</div>
					<SlideIn delay={0.2}>
						<ButtonLink
						href={'/'}
						color={theme === "Lime" ? "orange" : "lime"}
						>
							{slice.primary.button.text}
						</ButtonLink>
					</SlideIn>
				</div>
				<ParallaxImage
					foregroundImage={slice.primary.foreground_image}
					backgroundImage={slice.primary.background_image}
					className={clsx(
						"w-full h-full mt-20",
						slice.variation === "imageOnLeft" && "md:order-1"
					)}
				/>
			</div>
		</Bounded>
	)
};

export default ImageAndText