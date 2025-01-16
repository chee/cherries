export function toString(
	date: Date | null,
	locale: Intl.Locale["baseName"],
	timeZone: Intl.DateTimeFormatOptions["timeZone"]
) {
	if (!date) return ""
	return new Date(date)
		.toLocaleString(locale, {
			timeZone,
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
			day: "numeric",
			weekday: "short",
			year: "numeric",
			month: "short",
		})
		.replace(/, /g, " ")
		.replace(/(\d) ([ap])/, (_, dig, ap) => dig + ap)
}

export function toTimeZoneName(
	date: Date | null,
	locale: Intl.Locale["baseName"],
	timeZone: Intl.DateTimeFormatOptions["timeZone"],
	timeZoneName: Intl.DateTimeFormatOptions["timeZoneName"] = "long"
) {
	if (!date) return
	date = new Date(date)
	if (Number.isNaN(date)) {
		return ""
	}
	let fmt = new Intl.DateTimeFormat(locale, {
		timeZone,
		timeZoneName,
	})
	let parts = fmt.formatToParts(date)
	let zone = parts.find(part => part.type == "timeZoneName") || {
		value: "",
	}
	return zone.value
}
