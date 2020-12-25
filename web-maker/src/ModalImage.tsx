import React, { useEffect, useState } from 'react';
import ModalImageSizeTabel from './ModalImageSizeTable'


/* <FontAwesomeIcon icon={faPlusSquare} style={{ width: "" }} onClick={props.addToDivCount} className={props.previewMode ? "previewMode" : ""} /> */
const ModalImage = (props: any) => {
	return (
		<div className="imageModalContainer">
			<div className={`overlay addImageOverlay ${props.addImageOverlayActive ? "overlayActive addImageOverlayActive" : ""}`} onClick={() => props.setAddImageOverlayActive(false)}></div>
			<div className={`addImageModal editModal ${props.addImageOverlayActive ? "editModalActive" : ""}`}>
				<h2 className="addImageModalHeader"> Add your image url </h2>
				<input type="text" className={`input ${props.previewMode ? "previewMode" : ""}`} value={props.imageSrc} placeholder="https:you-image-url" onChange={(e: any) => props.setImageSrc(e.target.value)}  ></input>
				<div className="imageModalInformationDiv"> Select your image messurement, if you image is already good leave everything blank</div>
				<div className="imageModalSizeInputContainer">
					<ModalImageSizeTabel imageSizes={props.imageSizes} />
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
