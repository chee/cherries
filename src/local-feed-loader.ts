import type {Loader} from "astro/loaders"
import FeedParser from "feedparser"
import {z} from "astro/zod"
import {Readable} from "node:stream"
import type {ReadableStream} from "node:stream/web"
import {createReadStream} from "node:fs"

export function webToNodeStream(
	webStream: ReadableStream<Uint8Array>
): Readable {
	const reader = webStream.getReader()
	return new Readable({
		async read() {
			try {
				const {done, value} = await reader.read()
				if (done) {
					this.push(null)
				} else {
					this.push(Buffer.from(value))
				}
			} catch (err) {
				this.destroy(err as Error)
			}
		},
	})
}

export const NSSchema = z.record(z.string())

export const ImageSchema = z.object({
	url: z.string().optional(),
	title: z.string().optional(),
})

export const MetaSchema = z.object({
	"#ns": z.array(NSSchema),
	"#type": z.enum(["atom", "rss", "rdf"]),
	"#version": z.string(),
	title: z.string(),
	description: z.string().nullable(),
	date: z.coerce.date().nullable(),
	pubdate: z.coerce.date().nullable(),
	link: z.string().nullable(),
	xmlurl: z.string().nullable(),
	author: z.string().nullable(),
	language: z.string().nullable(),
	image: ImageSchema.nullable(),
	favicon: z.string().nullable(),
	copyright: z.string().nullable(),
	generator: z.string().nullable(),
	categories: z.array(z.string()),
})

// Enclosure schema
export const EnclosureSchema = z.object({
	length: z.string().nullable().optional(),
	type: z.string().nullable().optional(),
	url: z.string(),
})

// Item schema
export const ItemSchema = z.object({
	title: z.string().nullable(),
	description: z.string().nullable(),
	summary: z.string().nullable(),
	date: z.coerce.date(),
	pubdate: z.coerce.date(),
	link: z.string().nullable(),
	origlink: z.string().nullable(),
	author: z.string().nullable(),
	guid: z.string(),
	comments: z.string().nullable(),
	image: ImageSchema,
	categories: z.array(z.string()),
	enclosures: z.array(EnclosureSchema),
	meta: MetaSchema,
	dateLocale: z.string().optional(),
	timezone: z.string().optional(),
	plain: z.coerce.boolean(),
	tags: z.array(z.string()),
})

type Simplify<T> = {
	[P in keyof T]: T[P]
}

export type NS = z.infer<typeof NSSchema>
export type Image = z.infer<typeof ImageSchema>
export type Meta = z.infer<typeof MetaSchema>
export type Enclosure = z.infer<typeof EnclosureSchema>
export type Item = Simplify<
	z.infer<typeof ItemSchema> & {
		[key: string]: unknown
	}
>

export interface FeedLoaderOptions {
	url?: URL
	/** path to the feed */
	path: string
}

export function localFeedLoader({url, path}: FeedLoaderOptions): Loader {
	return {
		name: "feed-loader",
		load: async ({store, logger, parseData, meta}) => {
			logger.info("Loading posts")
			const parser = new FeedParser({feedurl: url?.toString()})
			const stream = createReadStream(path)
			store.clear()
			parser.on("readable", async () => {
				let item: Item | null
				while ((item = parser.read() as Item) !== null) {
					const id = item.guid
						?.replace("https://chee.party/", "")
						.replace(/\/$/, "")
					if (!id) {
						logger.warn("Item does not have a guid, skipping")
						continue
					}

					if (item.description?.match(/^[^<]/)) {
						item.plain = true
					}

					item.dateLocale = item["chee:date-locale"]?.["#"]
					item.timezone = item["chee:timezone"]?.["#"]

					let tags = item["chee:tag"] as {"#": string}[]
					if (tags && !Array.isArray(tags)) {
						tags = [tags]
					}
					item.tags =
						tags
							?.map(tag => tag["#"])
							.filter(tag => !["entries", "feed"].includes(tag)) || []

					const data = await parseData({
						id,
						data: item,
					})

					store.set({
						id,
						data,
						rendered: {
							html: data.description ?? "",
						},
					})
				}
			})

			stream.pipe(parser)

			return new Promise((resolve, reject) => {
				parser.on("end", () => {
					resolve()
				})
				parser.on("error", (err: Error) => {
					reject(err)
				})
			})
		},
		schema: ItemSchema,
	}
}
