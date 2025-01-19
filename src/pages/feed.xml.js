import rss from "@astrojs/rss"
import {SITE_TITLE, SITE_DESCRIPTION} from "../consts"
import getEntries from "../entries.ts"

export async function GET(context) {
	const entries = (await getEntries()).filter(doc =>
		import.meta.env.PROD ? !doc.data.draft : true
	)
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		stylesheet: "/stylesheet.xsl",
		items: entries.map(entry => ({
			...entry.data,
			title: entry.data.title ?? "",
			description: entry.data.description ?? "",
			pubDate: entry.data.date,
			link: `/${entry.id}/`,
		})),
		customData: /* html */ `<language>en-CA</language>`,
	})
}
