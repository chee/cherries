import type {AstroGlobal, Params, Props} from "astro"
import {PAGE_SIZE} from "./consts.ts"

/**
 * paginate a list of posts, with older entries before newer entries.
 *
 * history is ordered chronologically.
 *
 * keeps the overflowing remainder posts in the first (newest) chunk, so
 * paginated pages are stable. i.e. the posts that are on page 5 today will be
 * on page 5 forever, provided the pageSize does not change
 * @param items your diary entries
 * @param options
 * @returns chunks
 */
export default function paginateNaturally<T, PropsType, ParamsType>(
	items: T[],
	{
		pageSize = PAGE_SIZE,
		props,
		params,
	}: {pageSize?: number; params?: ParamsType; props?: PropsType} = {}
) {
	const chunks = chunkWithEarlyOverflow(items, pageSize)
	const totalPages = chunks.length

	return chunks.flatMap((chunk, index) => {
		const currentPage = totalPages - index
		const lastPage = 1
		const nextPage = currentPage + 1
		const prevPage = currentPage - 1
		return {
			params: {
				...params,
				page: "" + currentPage,
			} as ParamsType & {page: string} satisfies Params,
			props: {
				...props,
				page: {
					data: chunk,
					currentPage,
					lastPage,
					totalPages,
					start: 0,
					end: items.length - 1,
					total: items.length,
					size: pageSize,
					nextPage: nextPage < totalPages + 1 ? nextPage : undefined,
					previousPage: prevPage > 0 ? prevPage : undefined,
				} satisfies NaturalPage<T>,
			} as PropsType & {page: NaturalPage<T>} satisfies Props,
		}
	})
}

export type NaturalPage<T = any> = {
	data: T[]
	currentPage: number
	lastPage: number
	totalPages: number
	start: number
	end: number
	total: number
	size: number
	nextPage?: number
	previousPage?: number
}

export function chunkWithEarlyOverflow<T>(array: T[], chunkSize = 7): T[][] {
	if (typeof chunkSize != "number" || chunkSize <= 0) {
		throw new Error("Chunk size must be a number greater than 0")
	}

	const chunks = []
	const overflowSize = array.length % chunkSize

	if (overflowSize > 0) {
		chunks.push(array.slice(0, overflowSize))
	}

	for (let i = overflowSize; i < array.length; i += chunkSize) {
		chunks.push(array.slice(i, i + chunkSize))
	}

	return chunks
}

export function generateRoute(Astro: AstroGlobal, overrides: Params) {
	const params = {...Astro.params, ...overrides}
	return Astro.routePattern.replace(
		/\[([^\]]+)\]/g,
		(_, key) => params[key] || `[${key}]`
	)
}
