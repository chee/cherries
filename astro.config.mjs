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

// https://astro.build/config
export default defineConfig({
	site: "https://chee.party",
	integrations: [
		mdx({shikiConfig: {theme: lychee}, optimize: true}),
		sitemap(),
		civet({
			ts: "preserve",
		}),
		solid({devtools: true}),
	],
	adapter: netlify(),
	vite: {
		plugins: [yaml(), wasm()],
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
})
