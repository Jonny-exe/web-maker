import React from "react"

export const Preveiw = (props: any) => {
	return (
		<div className="preview" title="preview">
			<button
				className={`preview ${props.previewMode ? "previewMode" : ""}`}
				onClick={() => props.handlePreview(true)}>
				{" "}
				Preview{" "}
			</button>
			<button
				className={`preview ${props.previewMode ? "" : "previewMode"}`}
				onClick={() => props.handlePreview(false)}>
				{" "}
				UnPreview{" "}
			</button>
		</div>
	)
}

export default Preveiw
