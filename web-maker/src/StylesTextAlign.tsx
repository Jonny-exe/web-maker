import React, { useState } from "react"
import {
	faAlignCenter,
	faAlignJustify,
	faAlignLeft,
	faAlignRight,
} from "@fortawesome/free-solid-svg-icons"
import TextAlignCheckbox from "./TextAlignCheckbox"

export const StylesTextAlign = (props: any) => {
	const [selected, setSelected] = useState("")

	return (
		<div className="textAlignContainer">
			<TextAlignCheckbox
				selected={selected}
				setSelected={setSelected}
				savedStyle={props.savedStyle}
				icon={faAlignJustify}
				type={"justify"}
				modalStateActive={props.modalStateActive}
			/>
			<TextAlignCheckbox
				selected={selected}
				setSelected={setSelected}
				savedStyle={props.savedStyle}
				icon={faAlignCenter}
				type={"center"}
				modalStateActive={props.modalStateActive}
			/>
			<TextAlignCheckbox
				selected={selected}
				setSelected={setSelected}
				savedStyle={props.savedStyle}
				icon={faAlignLeft}
				type={"left"}
				modalStateActive={props.modalStateActive}
			/>
			<TextAlignCheckbox
				selected={selected}
				setSelected={setSelected}
				savedStyle={props.savedStyle}
				icon={faAlignRight}
				type={"right"}
				modalStateActive={props.modalStateActive}
			/>
		</div>
	)
}

export default StylesTextAlign
