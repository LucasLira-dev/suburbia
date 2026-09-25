import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { createClient } from "@/prismicio";
import { Skater } from "./Skater";
import { SlideIn } from "@/components/SlideIn";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> = async ({ slice }) => {

	const client = createClient(); 
	const skaters = await client.getAllByType("skater");

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="bg-texture bg-brand-navy py-14"
		>
			<SlideIn>
				<div
					className="text-4xl font-sans font-extrabold md:text-7xl relative text-center text-white">
					<PrismicRichText field={slice.primary.heading} />
				</div>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4 mt-6">
					{
						skaters.map((skater, index) => (
							<Skater
								key={skater.id}
								skater={skater}
								index={index}
							/>
						))
					}
				</div>
			</SlideIn>
		</Bounded>
	)
};

export default TeamGrid