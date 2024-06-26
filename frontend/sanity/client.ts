import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId: string | undefined = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset: string | undefined = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion: string =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-11-07";
const token: string | undefined = process.env.NEXT_PUBLIC_SANITY_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
