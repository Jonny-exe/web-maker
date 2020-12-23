import React, { useEffect, useState } from 'react';


/* <FontAwesomeIcon icon={faPlusSquare} style={{ width: "" }} onClick={props.addToDivCount} className={props.previewMode ? "previewMode" : ""} /> */
const ModalImage = (props: any) => {
	return (
		<div className="imageModalContainer">
			<div className={`overlay addImageOverlay ${props.addImageOverlayActive ? "overlayActive addImageOverlayActive" : ""}`} onClick={() => props.setAddImageOverlayActive(false)}></div>
			<div className={`addImageModal editModal ${props.addImageOverlayActive ? "editModalActive" : ""}`}>
				<h2 className="addImageModalHeader"> Add your image url </h2>
				<input type="text" className={`input ${props.previewMode ? "previewMode" : ""}`} value={props.imageSrc} placeholder="https:you-image-url" onChange={(e: any) => props.setImageSrc(e.target.value)}  ></input>
				<div className="imageModalSizeInputContainer">
					<table>
						<tr>
							<td>
								<div> Select messurement </div>
							</td>
							<td>
								<select className="preview imageModalSelect">
									<option value="px"> Pixel </option>
									<option value="%"> Percentage </option>
								</select>
							</td>
						</tr>
						<tr className="imageModalTable">
							<td>
								<span> Width </span>
							</td>
							<td>
								<input type="number" placeholder="Desired Image width" className="preview"></input>
							</td>
						</tr>
						<tr>
							<td>
								<span> Height </span>
							</td>
							<td>
								<input type="number" placeholder="Desired Image width" className="preview"></input>
							</td>
						</tr>
					</table>
					<div className="imageModalSelect">
					</div>
				</div>
				<button className="preview addImageModalButton" onClick={() => {
					props.setAddImageOverlayActive(false)
					props.setApplyCount(props.applyCount + 1)
				}}> Apply </button>
			</div>
		</div>
	);
}


export default ModalImage;
