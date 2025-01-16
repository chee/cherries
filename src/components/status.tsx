import {createDocumentStore} from "automerge-repo-solid-primitives"
import {start} from "../automerge/repo.ts"
import type {AutomergeUrl} from "@automerge/automerge-repo/slim"

const repo = await start()

export default function Status() {
	const store = createDocumentStore(() =>
		repo.find<{text: string}>(
			"automerge:26oAmUA4iBiRyzVaz7VJPdQnVbU4" as AutomergeUrl
		)
	)
	return (
		<pre innerHTML={store()?.text ?? ":)"} style={{"white-space": "wrap"}} />
	)
}
