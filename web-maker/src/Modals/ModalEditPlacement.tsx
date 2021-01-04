import React from "react"
import { exceptionToRender } from "../constants/exceptionItems"

const ModalEditPlacement = (props: any) => {
	const moveItem = (newIndex: number) => {
		const itemToMove = props.content[props.itemIndex]
		props.content.splice(props.itemIndex, 1)
		if (props.itemIndex < newIndex) {
			newIndex--
		}
		props.content.splice(newIndex, 0, itemToMove)
		props.setModalEditPlacementActive(false)
	}

	const removeItem = () => {
		props.content.splice(props.itemIndex, 1)
		props.setModalEditPlacementActive(false)
	}

	return (
		<>
			<div
				className={`overlay editOverlay ${
					props.modalEditPlacementActive ? "overlayActive" : ""
				}`}
				onClick={() => props.setModalEditPlacementActive(false)}></div>
			<div
				className={`modal modalEditPlacement ${
					props.modalEditPlacementActive ? "modalActive" : ""
				}`}>
				<h1 style={{ margin: "1%" }}> Add your image url </h1>
				<h2>
					{" "}
					Your selected item:{" "}
					{props.content[props.indexItem] !== undefined &&
					props.itemIndex !== -1
						? props.content[props.itemIndex].text
						: ""}
				</h2>
				<div
					className="informationDiv"
					style={{ marginLeft: "3%", marginRight: "3%" }}>
					{" "}
					Click the on your new desired position{" "}
				</div>
				<div className="smallRenderContainer">
					{props.content.map((item: any, index: number) => (
						<>
							<div className="separator" onClick={() => moveItem(index)}></div>
							{exceptionToRender.includes(item.type) ? (
								<span>{item.type === "div" ? "columns" : item.text}</span>
							) : (
								React.createElement(
									item.type,
									{
										style: {
											margin: "0%",
										},
									},
									item.text
								)
							)}
							{props.content.length === index + 1 ? (
								<div
									className="separator"
									onClick={() => moveItem(index + 1)}></div>
							) : (
								""
							)}
						</>
					))}
					<button className="deleteItemButton" onClick={removeItem}>
						{" "}
						Delete item{" "}
					</button>
				</div>
			</div>
		</>
	)
}

export default ModalEditPlacement
