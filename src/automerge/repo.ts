import {Repo} from "@automerge/automerge-repo"
import {BrowserWebSocketClientAdapter} from "@automerge/automerge-repo-network-websocket"
import {IndexedDBStorageAdapter} from "@automerge/automerge-repo-storage-indexeddb"

export async function start() {
	const repo = new Repo({
		storage: new IndexedDBStorageAdapter("cherries"),
		network: [new BrowserWebSocketClientAdapter("https://galaxy.observer")],
	})
	return repo
}
