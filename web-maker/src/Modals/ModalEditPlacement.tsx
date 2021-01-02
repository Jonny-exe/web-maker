import React from 'react'
import { exceptionToRender } from '../exceptionItems'


const ModalEditPlacement = (props: any) => {
	const moveItem = (newIndex: number) => {
		console.log("moveItem")
		console.log("newIndex: ", newIndex, "oldIndex: ", props.itemIndex)
		const itemToMove = props.content[props.itemIndex]
		props.content.splice(props.itemIndex, 1)
		if (props.itemIndex < newIndex) {
			newIndex--
		}
		props.content.splice(newIndex, 0, itemToMove)
		console.log("Props content 3:", props.content)
		props.setModalEditPlacementActive(false)
	}
	return (
		<>
			<div className={`overlay editOverlay ${props.modalEditPlacementActive ? "overlayActive" : ""}`} onClick={() => props.setModalEditPlacementActive(false)}></div>
			<div className={`modal modalEditPlacement ${props.modalEditPlacementActive ? "modalActive" : ""}`}>
				<h2 style={{ margin: "1%" }}> Add your image url </h2>
				<div className="informationDiv" style={{ marginLeft: "3%", marginRight: "3%" }}> Click the on your new desired position </div>
				<div>
					{
						props.content.map((item: any, index: number) => (
							<>
								<div className="separator" onClick={() => moveItem(index)}></div>
								{
									exceptionToRender.includes(item.type) ? <span>{item.type == "div" ? "columns" : item.type}</span> : React.createElement(item.type, {
										style: {
											margin: "0%",
										}
									},
										item.text)
								}
								{props.content.length == index + 1? (
								<div className="separator" onClick={() => moveItem(index + 1)}></div>) : ""}
							</>
						))
					}
				</div>
			</div>
		</>
	)
}

export default ModalEditPlacement
