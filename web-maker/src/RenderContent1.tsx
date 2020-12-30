import React, { useState } from 'react'
import RenderContent from './RenderContent'
import App from "./App"

export const RenderContent1 = (props: any) => {
	return (
		<>
			{console.log(props.content)}
			{
				props.content.map((x: any, i: number) => (
					// Images must be done separatly

					x.type == "img" ? <img style={x.style} src={x.src} alt="Image"></img> :
						React.createElement(x.type, {
							style: x.style,
							contentEditable: x.type != "table" && x.type != "tr" ? "true" : "false", // this is has to be like this because if not it doesnt detect the td only the table
							placeholder: x.text,
							content: "hi",
							onClick: (e: any) => {
								console.log(x)
								// props.handleDiv(e.target.innerText, i, e) // this could be set to e.target.innerHTML to use " text "
								props.setDisplayButtons(true)
								props.setSavedStyle(e.target.style)
							},
							onInput: (e: any) => {
								// if (x.type != "table" && x.type != "tr") {
								x.content = e.target.textContent
								// }
							},
							focusout: (e: any) => {
								props.setDisplayButtons(false)
							}
						},
							x.children != undefined && x.children.length != 0 ? <RenderContent setDisplayButtons={props.setDisplayButtons} setSavedStyle={props.setSavedStyle} savedStyle={props.savedStyle} content={x.children} /> : x.content,
						)
				))
			}
		</>
	)
}

export default RenderContent1