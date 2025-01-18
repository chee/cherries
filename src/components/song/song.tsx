import type {CollectionEntry} from "astro:content"
import {
	createEffect,
	createResource,
	createSignal,
	onMount,
	Show,
	Suspense,
} from "solid-js"
import "./song.css"
import {Slider} from "@kobalte/core/slider"
import {Button} from "@kobalte/core/button"
import play from "./play.svg?raw"
import pause from "./pause.svg?raw"
import {getImage} from "astro:assets"

export function Image(props: {
	src: NonNullable<
		NonNullable<CollectionEntry<"entries">["data"]["song"]>["art"]
	>
	class?: string
	alt?: string
}) {
	const [image] = createResource(() => getImage(props))
	const additional = {} as Record<any, any>
	if (import.meta.env.DEV) {
		additional["data-image-component"] = "true"
	}
	return (
		<Suspense>
			<img src={image()?.src} {...image()?.attributes} alt={props.alt || ""} />
		</Suspense>
	)
}

export const modifiers = (
	root: string,
	opts: Record<string, boolean | undefined>
) => {
	return Object.entries(opts).reduce((className, [name, value]) => {
		if (value) {
			return className + ` ${root}--${name}`
		}
		return className
	}, root)
}

function Playbar(props: {
	time: number
	duration: number
	setTime(time: number): void
	canplay: boolean
	canplaythrough: boolean
	paused: boolean
}) {
	return (
		<Slider
			onChange={values => {
				props.setTime(values[0])
				console.log(values[0], "set")
			}}
			onChangeEnd={values => {
				console.log(values[0])
			}}
			class={modifiers("song-playbar", {
				canplay: props.canplay,
				canplaythrough: props.canplaythrough,
				paused: props.paused,
			})}
			minValue={0}
			maxValue={props.duration}
			value={[props.time]}>
			<Slider.Track class="song-playbar__track">
				<Slider.Fill class="song-playbar__fill" />
				<Slider.Thumb class="song-playbar__thumb">
					<Slider.Input />
				</Slider.Thumb>
			</Slider.Track>
		</Slider>
	)
}

export default function Song(
	props: NonNullable<CollectionEntry<"entries">["data"]["song"]>
) {
	const [enhance, setEnhance] = createSignal(false)
	createEffect(() => {
		setEnhance(true)
	})

	const [time, setTime] = createSignal(0)
	const [duration, setDuration] = createSignal(0)
	const [paused, setPaused] = createSignal(true)
	const [canplay, setCanplay] = createSignal(false)
	const [canplaythrough, setCanplaythrough] = createSignal(false)

	let audio!: HTMLAudioElement

	onMount(() => {
		setDuration(audio.duration)
	})

	return (
		<article class="song">
			<Show when={props.art}>
				<Image src={props.art!} />
			</Show>
			<audio
				class="song-player song-player--audio"
				controls={!enhance()}
				src={props.music}
				oncanplay={() => setCanplay(true)}
				oncanplaythrough={() => setCanplaythrough(true)}
				ontimeupdate={() => {
					setTime(audio.currentTime)
				}}
				onplaying={() => setPaused(false)}
				onpause={() => setPaused(true)}
				ondurationchange={() => setDuration(audio.duration)}
				ref={audio}
			/>
			<Show when={enhance()}>
				<div class="song-player song-player--pretty">
					<div>
						<Button
							class="song-player__play"
							onclick={() => (paused() ? audio.play() : audio.pause())}
							aria-label={paused() ? "play" : "pause"}
							innerHTML={paused() ? play : pause}></Button>
					</div>
					<div class="song-player__meta">
						<Playbar
							time={time()}
							duration={duration()}
							canplay={canplay()}
							canplaythrough={canplaythrough()}
							paused={paused()}
							setTime={time => {
								setTime(time)
								audio.currentTime = time
							}}
						/>
						<div class="song-player__times">
							<Time time={time()} />
							<Time time={duration()} />
						</div>
					</div>
				</div>
			</Show>
		</article>
	)
}

function format(time: number) {
	const minutes = Math.floor(time / 60)
	const seconds = Math.floor(time % 60)
		.toString()
		.padStart(2, "0")
	return `${minutes}:${seconds}`
}

function Time(props: {time: number}) {
	return <div class="song-time">{format(props.time)}</div>
}
