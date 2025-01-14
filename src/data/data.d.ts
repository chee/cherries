declare module "*.yml" {
	const value: any
	export default value
}

declare module "free-train-stations.yaml" {
	const stations: {
		name: string
		status: "YES" | "NO" | "SOMETIMES"
		note: string
		date: string
	}[]
	export default stations
}

declare module "gender-neutral-bathrooms.yaml" {
	const stations: {
		name: string
		kind: string
		address: string
		lat: number
		lon: number
		date: string
		reporter: string
		status:
			| "YES"
			| "ACCESSIBLE-OPEN"
			| "ACCESSIBLE-KEY-NQA"
			| "ACCESSIBLE-KEY-QA"
			| "NOPE"
	}[]
	export default stations
}

declare module "*.toml" {
	const value: any
	export default value
}

declare module "*.txt" {
	const content: string
	export default content
}
