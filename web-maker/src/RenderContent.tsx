import React, { useEffect, useRef, useState } from 'react'
import { notEditable } from './exceptionItems'
import RenderContent1 from './RenderContent1'

export const RenderContent = (props: any) => {
	const [itemToChange, setItemToChange] = useState({ style: { opacity: "0", position: "absolute", left: "0", top: "0" } })
	const [holdCounter, setHoldCounter] = useState(-1)
	const [cancelHover, setCancelHover] = useState(false)
	useEffect(() => {
		if (props.itemIndex != -1 && holdCounter != -1) {
			console.log("holdCounter: ", holdCounter)
			if (!cancelHover) {
				if (holdCounter < 4) {
					var timer = setTimeout(increaseHoldIndex, 250)
					console.log(holdCounter)
					console.log("hoverIndexToLow")
					itemToChange.style.opacity = "1"
				} else {
					console.log("hold activated")
					setHoldCounter(-1)
					props.setModalEditPlacementActive(true)
					setCancelHover(true)
					itemToChange.style.opacity = "0.5"
				}
			} else {
				setHoldCounter(-1)
			}
		}
		return () => {
			clearTimeout(timer)
		}
	}, [holdCounter])

	const increaseHoldIndex = () => {
		setHoldCounter(holdCounter + 1)
	}

	return (
		<>
			{
				props.content.map((x: any, i: number) => (
					// Images must be done separatly
					x.type == "img" ? <img style={x.style} src={x.src} alt="Image"></img> :
						React.createElement(x.type, {
							style: x.style,
							contentEditable: notEditable.includes(x.type) || props.previewMode ? "false" : "true", // this is has to be like this because if not it doesnt detect the td only the table
							key: i,
							placeholder: x.text,
							content: "",
							onInput: (e: any) => {
								x.content = e.target.textContent
								console.log("ONINPUT")
							},
							onClick: (e: any) => {
								props.setSavedStyle(e.target.style)
							},
							onMouseDown: (e: any) => {
								console.log(props)
								console.log("ONMOUSEDOWN")
								if (props.setItemIndex != undefined) {
									props.setItemIndex(i)
								}
								increaseHoldIndex()
								setCancelHover(false)
								setItemToChange(e.target)
							},
							onMouseUp: (e: any) => {
								console.log("ONMOUSEUP")
								setHoldCounter(-1)
								setCancelHover(true)
							}
						},
							x.children != undefined && x.children.length != 0 ? <RenderContent1 content={x.children} setModalEditPlacementActive={props.setModalEditPlacementActive} previewMode={props.previewMode} setSavedStyle={props.setSavedStyle} setItemIndex={props.setItemIndex} itemIndex={props.itemIndex} savedStyle={props.savedStyle} /> : x.content,
						)
				)
				)
			}
		</>
	)
}

export default RenderContent