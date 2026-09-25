import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import { SkateboardProduct } from "./SkateboardProduct";
import { SlideIn } from "@/components/SlideIn";

/**
 * Props for `ProductGrid`.
 */
export type ProductGridProps = SliceComponentProps<Content.ProductGridSlice>;

/**
 * Component for "ProductGrid" Slices.
 */
const ProductGrid: FC<ProductGridProps> = ({ slice }) => {

	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="bg-brand-gray bg-texture flex flex-col"
		>	
			<div
			className="mt-16 mb-14">
				<div
				className="text-4xl font-sans font-extrabold md:text-7xl relative text-center">
					<SlideIn>
						<PrismicRichText field={slice.primary.heading} />
					</SlideIn>
				</div>
				<div
				className="text-md mx-auto mt-4 text-center font-mono font-extralight">
					<SlideIn>
						<PrismicRichText field={slice.primary.body} />
					</SlideIn>
				</div>
				<div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-4">
					{slice.primary.product.map((skateboard) =>
						isFilled.contentRelationship(skateboard.skateboard) && (
							<SkateboardProduct key={skateboard.skateboard.id} id={skateboard.skateboard.id} />
						)
					)}
				</div>
			</div>
		</Bounded>
	)
};

export default ProductGrid