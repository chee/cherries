import {db, Guestbook} from "astro:db"

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Guestbook).values([
		{
			name: "chee",
			url: "https://chee.party",
			message: `hello, i spent some time here.
			
i like this website`,
		},
	])
}
