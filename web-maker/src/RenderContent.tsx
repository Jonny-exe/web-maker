import React, { useEffect, useRef, useState } from 'react'
import { notEditable } from './exceptionItems'
import RenderContent1 from './RenderContent1'

export const RenderContent = (props: any) => {
	const [holdCounter, setHoldCounter] = useState(-1)
	const [cancelHover, setCancelHover] = useState(false)
	useEffect(() => {
		if (props.itemIndex != -1 && holdCounter != -1) {
			if (!cancelHover) {
				if (holdCounter < 4) {
					var timer = setTimeout(increaseHoldIndex, 250)
				} else {
					setHoldCounter(-1)
					props.setModalEditPlacementActive(true)
					setCancelHover(true)
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
							placeholder: notEditable.includes(x.type) && x.type != "div" || !props.previewMode ? x.text : "",
							content: "",
							onInput: (e: any) => {
								x.content = e.target.textContent
								console.log("ONINPUT")
							},
							onClick: (e: any) => {
								props.setSavedStyle(e.target.style)
							},
							onMouseDown: (e: any) => {
								if (props.setItemIndex != undefined) {
									props.setItemIndex(i)
								}
								increaseHoldIndex()
								setCancelHover(false)
							},
							onMouseUp: (e: any) => {
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