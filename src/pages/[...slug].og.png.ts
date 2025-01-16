import type {APIRoute} from "astro"
import {satoriAstroOG} from "satori-astro"
import {html} from "satori-html"
import {stripHtml as stripHTML} from "string-strip-html"
import getEntries from "../entries.ts"
import fs from "fs"
import background from "../opengraph/background.jpg?base64"

export async function getStaticPaths() {
	const entries = await getEntries()
	return entries.map(post => {
		return {
			params: {slug: post.id},
			props: post,
		}
	})
}

function getOpengraphTitle(post: Record<string, any>) {
	if (post?.data?.og?.title) {
		return post.data.og.title
	} else if (post?.data?.titleHTML) {
		return post.data.titleHTML
	} else if (post?.data?.title) {
		return post?.data?.title
	} else {
		try {
			let text = stripHTML(post.body ?? "").result
			return text.split(".")[0]
		} catch {
			return post?.data?.description || "it's cherries season"
		}
	}
}

export const GET: APIRoute = async ({params, request, url, props}) => {
	return await satoriAstroOG({
		template: html`<div
			style="display: flex; 
			background: url('data:image/jpeg;base64,${background}'); 
			width: 1200px; 
			height: 630px;
			background-size: 1200px 630px;"
		>
			<h1
				style="
					background: linear-gradient(to bottom right,	#fff0f9,#fffef1,	rgb(241, 255, 246),	#f0f9ff,#f9fdff,	#f6fdff,	#fff3f9);
					background-clip: text;
					color: transparent;
					text-overflow: ellipses;
					font-size: 9em;
					width: 900px;
					padding-left: 0.25em;
					padding-top: 0.125em"
			>
				${getOpengraphTitle(props)}
			</h1>
		</div>`,
		width: 1200,
		height: 630,
	}).toResponse({
		satori: {
			fonts: [
				{
					name: "ITC Garamond Narrow",
					data: fs.readFileSync("./src/data/itc-garamond-std-book-narrow.otf"),
					style: "normal",
				},
			],
		},
	})
}
