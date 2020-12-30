import React, { useState } from 'react'
import RenderContent1 from './RenderContent1'
import App from "./App"

export const RenderContent = (props: any) => {
	return (
		<>
			{console.log("Content: ", props.content)}
			{
				props.content.map((x: any, i: number) => (
					// Images must be done separatly

					// {const hi = ""}
					x.type == "img" ? <img style={x.style} src={x.src} alt="Image"></img> :
						React.createElement(x.type, {
							style: x.style,
							contentEditable: x.type != "table" && x.type != "tr" ? "true" : "false", // this is has to be like this because if not it doesnt detect the td only the table
							placeholder: x.text,
							content: "",
							onClick: (e: any) => {
								// props.handleDiv(e.target.innerText, i, e) // this could be set to e.target.innerHTML to use " text "
								props.setDisplayButtons(true)
								// props.savedStyle.borderStyle = ""
								// e.target.style.border = "2px solid red"
								// e.target.style.borderRadius = "5px"
								props.setSavedStyle(e.target.style)
							},
							onInput: (e: any) => {
								x.content = e.target.textContent
							},
							focusout: (e: any) => {
								props.setDisplayButtons(false)
							}
						},
							x.children != undefined && x.children.length != 0 ? <RenderContent1 content={x.children} setDisplayButtons={props.setDisplayButtons} setSavedStyle={props.setSavedStyle} savedStyle={props.savedStyle} /> : x.content,
						)
				))
			}
		</>
	)
}

export default RenderContent