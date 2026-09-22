import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { LazyYouTubePlayer } from "./LazyYoutubePlayer";
import clsx from "clsx";
import Image from "next/image";

/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;


const MASK_CLASSES =
	"[mask-image:url('/video-mask.png')] [mask-mode:alpha] [mask-position:center] [mask-repeat:no-repeat] [mask-size:100%_auto]";

/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
	return (
		<Bounded
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="bg-texture bg-zinc-900 py-14"
		>
			<h2 className="sr-only">
				Video player
			</h2>
			<div className="relative aspect-video">
				<div
					className={clsx(
						MASK_CLASSES,
						"bg-brand-lime absolute inset-0 translate-x-2.5 translate-y-2.5"
					)}
				/>
				<div
					className={clsx(
						MASK_CLASSES,
						"bg-white absolute inset-0 translate-x-1.25 translate-y-1.5"
					)}
				/>
				<div
					className={clsx(
						MASK_CLASSES,
						"bg-white absolute inset-0 translate-x-0.75 -translate-y-0.75"
					)}
				/>
				<div className={clsx(
					MASK_CLASSES,
					"relative h-full"
				)}>
					{
						isFilled.keyText(slice.primary.youtube_id) ? (
							<LazyYouTubePlayer youTubeID={slice.primary.youtube_id} />
						) : null
					}
					<Image
					src="/image-texture.png"
					alt="Image texture"
					fill
					className="pointer-events-none select-none object-cover opacity-10"
					/>
				</div>
			</div>
		</Bounded>
	)
};

export default VideoBlock