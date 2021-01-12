import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons"

export const Preveiw = (props: any) => {
	return (
		<div className="preview" title="preview">
			<button
				className={`preview ${props.previewMode ? "previewMode" : ""}`}
				onClick={() => props.handlePreview(true)}>
				{" "}
				<FontAwesomeIcon icon={faEye} size={"1x"} />
			</button>
			<button
				className={`preview ${props.previewMode ? "" : "previewMode"}`}
				onClick={() => props.handlePreview(false)}>
				{" "}
				<FontAwesomeIcon icon={faEyeSlash} size={"1x"} />
			</button>
		</div>
	)
}

export default Preveiw
