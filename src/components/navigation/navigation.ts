import {getCollection} from "astro:content"
import getEntries, {byRecency} from "../../entries.ts"
export default async function (slug: string) {
	const entries = (await getEntries()).toSorted(byRecency)

	const curr = entries.findIndex(post => post.id === slug)

	if (curr == -1) {
		return [null, null]
	}
	const next = curr + 1 === entries.length ? null : entries[curr + 1]
	const prev = curr == 0 ? null : entries[curr - 1]
	return [prev, next]
}
