import React from "react"

const ModalTable = (props: any) => {
	return (
		<div className="imageModalContainer">
			<div
				className={`overlay addImageOverlay ${
					props.addTableOverlayActive
						? "overlayActive addImageOverlayActive"
						: ""
				}`}
				onClick={() => props.setAddTableOverlayActive(false)}
			></div>
			<div
				className={`addImageModal tableSizesContainer modal ${
					props.addTableOverlayActive ? "modalActive" : ""
				}`}
			>
				<h1 style={{ fontWeight: "normal" }}> Create table </h1>
				<input
					type="number"
					placeholder="Height"
					className="loginInput input tableSizesInput"
					onChange={(e: any) => (props.tableSizes.width = e.target.value)}
				/>
				<input
					type="number"
					placeholder="Width"
					className="loginInput input tableSizesInput"
					onChange={(e: any) => (props.tableSizes.height = e.target.value)}
				/>
				<button
					className="preview loginButton"
					onClick={() => {
						props.setAddTableOverlayActive(false)

						props.setApplyTableCount(props.applyTableCount + 1)
					}}
				>
					{" "}
					Apply{" "}
				</button>
			</div>
		</div>
	)
}

export default ModalTable
