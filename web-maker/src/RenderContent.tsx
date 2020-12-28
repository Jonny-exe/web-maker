import React, { useState } from 'react'
import RenderContent1 from './RenderContent1'
import App from "./App"

export const RenderContent = (props: any) => {
	return (
		<div className="render">
			{console.log(props.content)}
			{
				props.content.map((x: any, i: number) => (
					// Images must be done separatly

					// {const hi = ""}
					x.type == "img" ? <img style={x.style} src={x.src} alt="Image"></img>: 
					React.createElement(x.type, {
            style: x.style,
            contentEditable: "true",
						placeholder: x.text,
						content: "",
						onClick: (e: any) => {
							console.log(x)
							// props.handleDiv(e.target.innerText, i, e) // this could be set to e.target.innerHTML to use " text "
							props.setDisplayButtons(true)
							// props.savedStyle.borderStyle = ""
							// e.target.style.border = "2px solid black"
							// e.target.style.borderRadius = "5px"
							props.setSavedStyle(e.target.style)
						},
						onInput: (e: any) => {
							console.log(e.target)
							console.log(e.target.textContent)
							x.content = e.target.textContent
						},
						focusout:  (e: any) => {
							props.setDisplayButtons(false)
						}
					},
						x.children.length != 0 && x.children != undefined ? <RenderContent1 content={x.children} /> : x.content,
					)
				))
			}
		</div>
	)
}

export default RenderContent