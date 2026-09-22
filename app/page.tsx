import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, Content } from "@prismicio/client";
import { SliceComponentProps, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage").catch((e) => {
    console.error("Prismic error:", e);
    notFound();
  });
  const slices = bundleImageAndTextSlices(page.data.slices);

  return (
    <SliceZone 
    slices={slices}
    components={{
      ...components,
      image_and_text_bundle: ({
        slice,
      }: SliceComponentProps<ImageAndTextBundleSlice>) => (
        <div>
          <SliceZone slices={slice.slices} components={components} />
        </div>
      )
    }}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}


type ImageAndTextBundleSlice = {
  id: string;
  slice_type: "image_and_text_bundle";
  slices: Content.ImageAndTextSlice[];
}

function bundleImageAndTextSlices(slices: Content.HomepageDocumentDataSlicesSlice[]) {
  const res: (
    | Content.HomepageDocumentDataSlicesSlice
    | ImageAndTextBundleSlice
  )[] = [];

  for (const slice of slices) {
    if (slice.slice_type !== "image_and_text") {
      res.push(slice);
      continue;
    }

    const bundle = res.at(-1);
    if (bundle?.slice_type === "image_and_text_bundle") {
      bundle.slices.push(slice);
    } else {
      res.push({
        id: `${slice.id}-bundle`,
        slice_type: "image_and_text_bundle",
        slices: [slice],
      })
    }
  }

  return res;
}