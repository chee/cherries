import {getCollection} from "astro:content"
export default async function (slug: string) {
	const entries = await getCollection("entries")
	const eleventyEntries = await getCollection("eleventyCherries")
	const all = [...entries, ...eleventyEntries].toSorted(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf()
	)
	const curr = all.findIndex(post => post.id === slug)

	if (curr == -1) {
		return [null, null]
	}
	const prev = curr + 1 === all.length ? null : all[curr + 1]
	const next = curr == 0 ? null : all[curr - 1]
	return [prev, next]
}
