import type {APIRoute} from "astro"
import {satoriAstroOG} from "satori-astro"
import {html} from "satori-html"
import {stripHtml as stripHTML} from "string-strip-html"
import background from "../opengraph/background.jpg?base64"
import font from "../opengraph/itc-garamond-std-book-narrow.otf?bytes"
import fallback from "../opengraph/fallback.jpg?bytes"
import getEntries from "../entries.ts"
import {type CollectionEntry} from "astro:content"
export const prerender = false

async function getOpengraphText(post: CollectionEntry<EntryCollectionName>) {
	let html = post?.rendered?.html
	let data = post.data ?? {}

	let firstline = stripHTML(html ?? "").result
	firstline = firstline.split(".")[0]
	if (firstline.length > 80) {
		firstline = firstline.slice(0, 74) + "..."
	}

	const description = (data.opengraph?.description ||
		data?.description ||
		firstline ||
		"it's cherries season") as string

	const title = (function () {
		if (data?.opengraph?.title) {
			return data.opengraph.title
		} else if (data?.titleHTML) {
			return data.titleHTML
		} else if (data?.title) {
			return data?.title
		} else {
			try {
			} catch {
				return ""
			}
		}
	})()

	if (!title) return {title: description, description: ""}
	if (title == description) return {title, description: ""}
	return {title, description}
}

export const GET: APIRoute = async ({params, rewrite, redirect}) => {
	const entries = await getEntries()

	for (const entry of entries) {
		if (entry.id == params.slug) {
			const {title, description} = await getOpengraphText(entry)

			return await satoriAstroOG({
				template: html`<div
					style="display: flex; 
					flex-direction: column;
					background: url('data:image/jpeg;base64,${background}'); 
					width: 2400px; 
					height: 1260px;
					background-size: 2400px 1260px;
					line-height: 1"
				>
					<h1
						style="
							background: linear-gradient(to bottom right,	#fff0f9ec,#fffef1dc,	rgba(241, 255, 246, 0.9),	#f0f9ffea,#f9fdffe0,	#f6fdffd9,	#fff3f9ca);
							background-clip: text;
							color: transparent;
							
							margin-left: 84px;
							white-space: wrap;
							padding-top: 0.125em;
							font-size: 18em;
							margin-bottom: 0"
					>
						${title}
					</h1>
					<p
						style="
							display: flex;
							background: linear-gradient(to bottom right, #fcda40ff,#ffead069);
							background-clip: text;
							color: transparent;
							width: 1600px;
							padding-left: 104px;
							font-size: 8rem"
					>
						${description}
					</p>
				</div>`,
				width: 2400,
				height: 1260,
			}).toResponse({
				satori: {
					fonts: [
						{
							name: "ITC Garamond Narrow",
							data: Buffer.from(font, "binary"),
							style: "normal",
						},
					],
				},
			})
		}
	}

	return new Response(fallback, {headers: {"content-type": "image/jpeg"}})
}
