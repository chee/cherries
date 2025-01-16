import {Tooltip} from "@kobalte/core/tooltip"

export default function Somet() {
	return (
		<Tooltip>
			<Tooltip.Trigger>Hello</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content>
					<Tooltip.Arrow />
					Yes, this is it
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip>
	)
}
