import React from "react"
import StylesTextAlign from "../StylesTextAlign"
import StylesToggle from "../StylesToggle"

export const Modal = (props: any) => {
	return (
		<div className="inputContainer">
			<div className={`modal ${props.modalStateActive ? "modalActive" : ""}`}>
				<StylesToggle
					modalStateActive={props.modalStateActive}
					on="solid"
					off="none"
					setSavedStyle={props.setSavedStyle}
					savedStyle={props.savedStyle}
					propertyToToggle={"borderStyle"}
					nameOfStyle={"Border"}
				/>
				<StylesTextAlign
					savedStyle={props.savedStyle}
					modalStateActive={props.modalStateActive}
				/>
			</div>
			<div
				className={`overlay editOverlay ${
					props.modalStateActive ? "overlayActive" : ""
				}`}
				onClick={() => props.setModalStateActive(false)}
			></div>
		</div>
	)
}

export default Modal
