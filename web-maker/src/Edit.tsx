import React, { useState } from "react"

export const Edit = (props: any) => {
	return (
		<div className="preview">
			<button
				onClick={() => {
					props.setModalStateActive(true)
				}}
				className={`preview ${props.previewMode ? "previewMode" : ""} ${
					props.displayButtons ? "displayButtons" : "notDisplayButtons"
				}`}
			>
				{" "}
				Edit{" "}
			</button>
		</div>
	)
}

export default Edit
