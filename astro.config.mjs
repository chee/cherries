// @ts-check
import {defineConfig} from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

import solid from "@astrojs/solid-js"
import yaml from "@rollup/plugin-yaml"
import wasm from "vite-plugin-wasm"
import lychee from "./lychee-theme.ts"
import civet from "@danielx/civet/astro"
import fs from "fs"

import node from "@astrojs/node"

import db from "@astrojs/db";

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

const bytesLoader = {
    name: "bytes-loader",
    /**
     *
     * @param {any} _
     * @param {string} id
     * @returns
     */
    transform(_, id) {
        const [path, query] = id.split("?")
        if (query != "bytes") return null

        const data = fs.readFileSync(path)

        return `export default Uint8Array.from([${Array.from(data)}])`
    },
}

// https://astro.build/config
export default defineConfig({
    site: "https://chee.party",

    integrations: [
      mdx({shikiConfig: {theme: lychee}, optimize: true}),
      sitemap(),
      civet({
          ts: "preserve",
      }),
      solid(),
      db(),
    ],

    vite: {
        plugins: [yaml(), wasm(), base64Loader, bytesLoader],
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
    experimental: {
        clientPrerender: true,
    },

    adapter: node({
        mode: "standalone",
    }),
})