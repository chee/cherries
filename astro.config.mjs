// @ts-check
import {defineConfig} from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

import solid from "@astrojs/solid-js"
import netlify from "@astrojs/netlify"
import yaml from "@rollup/plugin-yaml"
import wasm from "vite-plugin-wasm"
import lychee from "./lychee-theme.ts"
import civet from "@danielx/civet/astro"
import fs from "fs"

import immediamenteDirective from "./astro/immediamente-directive/register.js"

const base64Loader = {
	name: "base64-loader",
	/**
	 *
	 * @param {any} _
	 * @param {string} id
	 * @returns
	 */
	transform(_, id) {
		const [path, query] = id.split("?")
		if (query != "base64") return null

		const data = fs.readFileSync(path)
		const base64 = data.toString("base64")

		return `export default '${base64}';`
	},
}

// https://astro.build/config
export default defineConfig({
	site: "https://chee.party",
	integrations: [
		immediamenteDirective(),
		mdx({shikiConfig: {theme: lychee}, optimize: true}),
		sitemap(),
		civet({
			ts: "preserve",
		}),
		solid(),
	],

	vite: {
		plugins: [yaml(), wasm(), base64Loader],
	},
	markdown: {
		shikiConfig: {
			theme: lychee,
		},
	},
	experimental: {
		contentIntellisense: true,
		svg: true,
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "viewport",
	},
})
