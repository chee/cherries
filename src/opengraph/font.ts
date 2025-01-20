import fs from "fs"
export default await fs.promises.readFile(
	new URL("./itc-garamond-std-book-narrow.otf", import.meta.url)
)
