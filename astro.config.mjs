// @ts-check
import {defineConfig} from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

import solid from "@astrojs/solid-js"
import netlify from "@astrojs/netlify"
import yaml from "@rollup/plugin-yaml"
import wasm from "vite-plugin-wasm"
import lychee from "./lychee-theme.json"

// https://astro.build/config
export default defineConfig({
	site: "https://chee.party",
	integrations: [mdx(), sitemap(), solid()],
	adapter: netlify(),
	vite: {
		plugins: [yaml(), wasm()],
	},
	markdown: {
		shikiConfig: {
			theme: lychee,
		},
	},
})
