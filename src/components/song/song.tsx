import type {CollectionEntry} from "astro:content"
import {createEffect, createSignal, For, onMount, Show} from "solid-js"
import "./song.css"
import {Slider} from "@kobalte/core/slider"
import {createMutable} from "solid-js/store"
import {Button} from "@kobalte/core/button"
import play from "./play.svg?raw"
import pause from "./pause.svg?raw"

interface AudioState {
	time: number
	duration: number
	canplay: boolean
	seeking: boolean
	paused: boolean
}

function Playbar(
	props: AudioState & {
		time: number
		setTime(time: number): void
	}
) {
	return (
		<Slider
			onChange={values => {
				props.setTime(values[0])
				console.log(values[0], "set")
			}}
			onChangeEnd={values => {
				console.log(values[0])
			}}
			class="song-playbar"
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

	const state = createMutable<AudioState>({
		time: 0,
		duration: 100,
		canplay: false,
		seeking: false,
		paused: true,
	})

	const [time, setTime] = createSignal(0)

	let audio!: HTMLAudioElement

	onMount(() => {
		state.duration = audio.duration
	})

	return (
		<article class="song">
			<Show when={props.art}>
				<img src={props.art!.src} />
			</Show>
			<audio
				class="song-player song-player--audio"
				controls={!enhance()}
				src={props.music}
				oncanplay={() => (state.canplay = true)}
				onseeking={() => (state.seeking = true)}
				onseeked={() => (state.seeking = false)}
				ontimeupdate={() => {
					console.log(state.seeking)
					setTime(audio.currentTime)
				}}
				onplaying={() => (state.paused = false)}
				onpause={() => (state.paused = true)}
				ondurationchange={() => (state.duration = audio.duration)}
				ref={audio}
			/>
			<Show when={enhance()}>
				<div class="song-player song-player--pretty">
					<div>
						<Button
							class="song-player__play"
							onclick={() => (state.paused ? audio.play() : audio.pause())}
							aria-label={state.paused ? "play" : "pause"}
							innerHTML={state.paused ? play : pause}></Button>
					</div>
					<div class="song-player__meta">
						<Playbar
							{...state}
							setTime={time => {
								setTime(time)
								audio.currentTime = time
							}}
							time={time()}
						/>
						<div class="song-player__times">
							<Time time={time()} />
							<Time time={state.duration} />
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
