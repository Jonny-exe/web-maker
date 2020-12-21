import React, { useState } from 'react'
import RenderContent1 from './RenderContent1'
import App from "./App"

export const RenderContent = (props: any) => {
	console.log(props.content)
	// return (

	// 	<div className="render">
	//  		{
	// 			props.content.map((x: any, i: number) =>
	// 			(
	// 				x.type == "span" ? <span style={x.style}> {x.children != null ? <RenderContent1 content={x.children} /> : x.text} </span> : x.type == "h1" ? <h1 onClick={(e: any) => {
	// 					props.handleDiv(e.target.innerText, i, e) // this could be set to e.target.innerHTML to use " text "
	// 					props.savedStyle.borderStyle = ""
	// 					e.target.style.border = "1px solid black"
	// 					e.target.style.borderRadius = "5px"
	// 					console.log(e.target)
	// 				}} style={x.style}> {x.text} </h1> : ""
	// 			))
	// 		}
	// 	</div>
	// )


	return (
		<div className="render">
			{console.log(props.content)}
			{
				props.content.map((x: any, i: number) => (
					React.createElement(x.type, {
						style: x.style,
						onClick: (e: any) => {
							console.log(x)
							props.handleDiv(e.target.innerText, i, e) // this could be set to e.target.innerHTML to use " text "
							props.savedStyle.borderStyle = ""
							e.target.style.border = "2px solid black"
							e.target.style.borderRadius = "5px"
						}
					},
						x.children.length != 0 ? <RenderContent1 content={x.children} /> : x.text,
					)
				))
			}
		</div>
	)
}

export default RenderContent