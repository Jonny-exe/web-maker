import React, { useState } from 'react'
import RenderContent from './RenderContent'

export const RenderContent1 = (props: any) => {

	return (
		<div className="render">
			{
				props.content.map((x: any) =>
				(
					x.type == "span" ? <span style={x.style}> {x.text} </span> : x.type == "div" ? <div style={x.style}> {x.text} </div> : ""
				))
			}
		</div>
	)
}

export default RenderContent1