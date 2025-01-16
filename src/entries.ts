import {getCollection, type CollectionEntry} from "astro:content"

type Entry = CollectionEntry<EntryCollectionName>

export default async function getEntries() {
	const entries = (await getCollection("entries")).filter(entry =>
		import.meta.env.PROD ? !entry.data.draft : true
	)
	const eleventyEntries = await getCollection("eleventyCherries")
	return [...entries, ...eleventyEntries]
}

export function byRecency(a: Entry, b: Entry) {
	return b.data.date.valueOf() - a.data.date.valueOf()
}
