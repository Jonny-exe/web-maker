import React from "react"
import ModalImageSizeTabel from "./ModalImageSizeTable"

const ModalImage = (props: any) => {
	return (
		<div className="imageModalContainer">
			<div
				className={`overlay addImageOverlay ${
					props.addImageOverlayActive
						? "overlayActive addImageOverlayActive"
						: ""
				}`}
				onClick={() => props.setAddImageOverlayActive(false)}></div>
			<div
				className={`addImageModal modal ${
					props.addImageOverlayActive ? "modalActive" : ""
				}`}>
				<h2 className="addImageModalHeader" style={{ margin: "1%" }}>
					{" "}
					Add your image url{" "}
				</h2>
				<div>
					<input
						type="text"
						className={`defaultInput ${props.previewMode ? "previewMode" : ""}`}
						value={props.imageSrc}
						placeholder="https:you-image-url"
						onChange={(e: any) => props.setImageSrc(e.target.value)}
					/>
				</div>
				<div className="informationDiv">
					Select your image messurement, if you image is already good leave
					everything blank
				</div>
				<div className="imageModalSizeInputContainer">
					<ModalImageSizeTabel imageSizes={props.imageSizes} />
				</div>
				<button
					className="preview defaultButton modalImageButton"
					onClick={() => {
						props.setAddImageOverlayActive(false)
						props.setApplyImageCount(props.applyImageCount + 1)
					}}>
					{" "}
					Apply{" "}
				</button>
			</div>
		</div>
	)
}

export default ModalImage
