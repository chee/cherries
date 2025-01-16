import {createSignal, createMemo, onMount, createEffect} from "solid-js"
import ColorHash from "color-hash"
import rangeSlider from "range-slider-input"
import "range-slider-input/dist/style.css"
import styles from "./color-picker.module.css"

let qs = new URLSearchParams("location" in globalThis ? location.search : "")

const [name, setName] = createSignal(qs.get("t") ?? "melissa.keen")
const [lowL, setLowL] = createSignal(Number(qs.get("ll") || 0.2))
const [highL, setHighL] = createSignal(Number(qs.get("hl") ?? 0.8))
const [lowS, setLowS] = createSignal(Number(qs.get("ls") ?? 0.7))
const [highS, setHighS] = createSignal(Number(qs.get("hs") ?? 0.8))
const [lowHue, setLowHue] = createSignal(Number(qs.get("lh") ?? 0))
const [highHue, setHighHue] = createSignal(Number(qs.get("hh") ?? 360))
const hex = createMemo(() => {
	const c = new ColorHash({
		lightness: [lowL(), highL()],
		saturation: [lowS(), highS()],
		hue: [{min: lowHue(), max: highHue()}],
	})
	return c.hex(name())
})

// https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
function luminance(colors: RGB) {
	const [r, g, b] = colors.map(v => {
		v /= 255
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
	})
	return r * 0.2126 + g * 0.7152 + b * 0.0722
}

const black = luminance([0, 0, 0])

type RGB = [number, number, number]

function hexrgb(hex: string) {
	let [r1, r2, g1, g2, b1, b2] = hex.slice(1)
	return [
		parseInt(r1 + r2, 0x10),
		parseInt(g1 + g2, 0x10),
		parseInt(b1 + b2, 0x10),
	] as RGB
}

const ratio = createMemo(() => {
	const lum = luminance(hexrgb(hex()))
	const light = Math.max(black, lum) + 0.05
	const dark = Math.min(black, lum) + 0.05
	return parseFloat((light / dark).toFixed(2))
})

const good = createMemo(() => {
	return ratio() >= 4.5
})

const initials = createMemo(() => {
	return name()
		.split(".")
		.map(n => n[0]?.toUpperCase() ?? "")
})

createEffect(() => {
	history.pushState(
		null,
		"",
		`?t=${encodeURIComponent(name())}&ll=${lowL()}&hl=${highL()}&ls=${lowS()}&hs=${highS()}&lh=${lowHue()}&hh=${highHue()}`
	)
})

export default function ColorPicker(props) {
	const light = (<div />) as HTMLDivElement
	const sat = (<div />) as HTMLDivElement
	const hue = (<div />) as HTMLDivElement
	const lightr = rangeSlider(light, {
		value: [lowL(), highL()],
		min: 0,
		max: 1.0,
		step: 0.01,
		onInput(x) {
			let [low, high] = x
			setLowL(low)
			setHighL(high)
		},
	})
	const satr = rangeSlider(sat, {
		value: [lowS(), highS()],
		min: 0,
		max: 1.0,
		step: 0.01,
		onInput(x) {
			let [low, high] = x
			setLowS(low)
			setHighS(high)
		},
	})
	const huer = rangeSlider(hue, {
		value: [lowHue(), highHue()],
		min: 0,
		max: 360,
		step: 1,
		onInput(x) {
			let [low, high] = x
			setLowHue(low)
			setHighHue(high)
		},
	})
	onMount(() => {
		lightr.value(lightr.value())
		satr.value(satr.value())
		huer.value(huer.value())
	})

	return (
		<article class={styles.article}>
			<figure style={{"text-align": "center"}}>
				<div
					class={styles.swatch}
					style={{
						background: hex(),
					}}>
					<span>{initials()}</span>
				</div>
				<figcaption style="display: flex; flex-direction: column; margin-top: 1em;">
					<code>{hex()}</code>
					<br />
					<code>
						{ratio() + ":1 "}
						<strong style={{"font-variant-emoji": "emoji"}}>
							{good() ? "✅ PASS" : "❌\uFE0F FAIL"}
						</strong>
					</code>
				</figcaption>
			</figure>

			<input
				autofocus
				type="name"
				value={name()}
				oninput={e => setName(e.target.value)}
			/>

			<fieldset>
				<legend>
					Lightness
					<code>
						[{lowL()}, {highL()}]
					</code>
				</legend>
				{light}
			</fieldset>

			<fieldset>
				<legend>
					Saturation
					<code>
						[{lowS()}, {highS()}]
					</code>
				</legend>
				{sat}
			</fieldset>

			<fieldset>
				<legend>
					Hue
					<code>
						[{lowHue()}°, {highHue()}°]
					</code>
				</legend>
				{hue}
			</fieldset>
		</article>
	)
}
