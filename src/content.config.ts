import {glob, file} from "astro/loaders"
import {defineCollection, z} from "astro:content"
import {localFeedLoader} from "./local-feed-loader.ts"

const documents = defineCollection({
	loader: glob({base: "./src/documents", pattern: "**/*.{md,mdx}"}),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional(),
		timezone: z.string().optional(),
		dateLocale: z.string().optional(),
	}),
})

const freeTrainStations = defineCollection({
	loader: file("./src/data/free-train-stations.yaml"),
	schema: z.object({
		name: z.string(),
		status: z.enum(["YES", "NO", "SOMETIMES"]),
		note: z.string(),
		date: z.coerce.date(),
	}),
})

const genderNeutralBathrooms = defineCollection({
	loader: file("./src/data/gender-neutral-bathrooms.yaml"),
	schema: z.object({
		name: z.string(),
		kind: z.string(),
		address: z.string(),
		lat: z.number(),
		lon: z.number(),
		date: z.coerce.date(),
		reporter: z.string(),
		code: z.coerce.string().optional(),
		status: z.enum([
			"YES",
			"ACCESSIBLE-OPEN",
			"ACCESSIBLE-KEY-NQA",
			"ACCESSIBLE-KEY-QA",
			"NOPE",
		]),
	}),
})

const eleventyCherries = defineCollection({
	loader: localFeedLoader({
		path: "./src/data/old-cherries.xml",
		url: new URL("https://chee.party/feed.xml"),
	}),
})

export const collections = {
	documents,
	freeTrainStations,
	genderNeutralBathrooms,
	eleventyCherries,
}
