import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { TallLogo } from "./TallLogo";
import { WideLogo } from "./WideLogo";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="bg-brand-pink relative h-dvh text-zinc-800 bg-texture"
		>	
			
			<div className="absolute inset-0 flex items-center pt-20">
				<TallLogo className="text-brand-purple animate-squiggle w-full opacity-20 mix-blend-multiply lg:hidden" />
				<WideLogo className="text-brand-purple animate-squiggle w-full hidden opacity-20 mix-blend-multiply lg:block" />
			</div>

			<div className="grid grid-rows-[1fr,auto] absolute inset-0 mx-auto place-items-end max-w-6xl px-6 mt-36 mb-10">
				<h1 className="text-5xl font-sans font-bold md:text-7xl relative max-w-lg place-self-start">
					<PrismicText field={slice.primary.heading} />
				</h1>
				<div className="flex relative w-full flex-col items-center justify-between gap-3 lg:flex-row">
					<div className="text-lg md:text-xl max-w-[45ch] mr-4 font-mono">
						<PrismicRichText field={slice.primary.body} />
					</div>
			        <ButtonLink 
					field={slice.primary.button} 
					icon="skateboard" 
					size="lg"
					className="z-20 mt-2 block">
						{slice.primary.button.text}
					</ButtonLink>
				</div>
			</div>
		</Bounded>
	)
};

export default Hero