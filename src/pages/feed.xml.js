import rss from "@astrojs/rss"
import {getCollection} from "astro:content"
import {SITE_TITLE, SITE_DESCRIPTION} from "../consts"

export async function GET(context) {
	const entries = (await getCollection("documents")).filter(
		doc =>
			(doc.data.tags ? doc.data.tags.includes("entry") : true) &&
			(import.meta.env.PROD ? !doc.data.draft : true)
	)
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		stylesheet: "/stylesheet.xsl",
		items: entries.map(entry => ({
			...entry.data,
			pubDate: entry.data.date,
			link: `/${entry.id}/`,
		})),
		customData: /* html */ `<language>en-CA</language>`,
	})
}
