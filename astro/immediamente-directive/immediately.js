/**
 * Hydrate immediately
 * @type {import('astro').ClientDirective}
 */
export default (load, opts, el) => {
	load().then(hydrate => hydrate())
}
