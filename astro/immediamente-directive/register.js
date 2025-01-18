/**
 * @type {() => import('astro').AstroIntegration}
 */
export default () => ({
	name: "client:click",
	hooks: {
		"astro:config:setup": setup => {
			setup.addClientDirective({
				name: "immediamente",
				entrypoint: "./astro/immediamente-directive/immediately.js",
			})
		},
	},
})
