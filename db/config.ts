import {column, defineDb, defineTable, NOW} from "astro:db"

const Guestbook = defineTable({
	columns: {
		id: column.number({primaryKey: true}),
		name: column.text(),
		message: column.text(),
		url: column.text({optional: true}),
		timestamp: column.date({default: NOW}),
	},
})

// https://astro.build/db/config
export default defineDb({
	tables: {Guestbook},
})
