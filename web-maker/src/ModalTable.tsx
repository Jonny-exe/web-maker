import React, { useEffect, useState } from 'react';


/* <FontAwesomeIcon icon={faPlusSquare} style={{ width: "" }} onClick={props.addToDivCount} className={props.previewMode ? "previewMode" : ""} /> */
const ModalTable = (props: any) => {
	return (
		<div className="imageModalContainer">
			<div className={`overlay addImageOverlay ${props.addTableOverlayActive ? "overlayActive addImageOverlayActive" : ""}`} onClick={() => props.setAddTableOverlayActive(false)}></div>
			<div className={`addImageModal tableSizesContainer editModal ${props.addTableOverlayActive ? "editModalActive" : ""}`}>
				<input type="number" placeholder="Height" className="loginInput input tableSizesInput" onChange={(e: any) => props.tableSizes.width = e.target.value}></input>
				<input type="number" placeholder="Width" className="loginInput input tableSizesInput" onChange={(e: any) => props.tableSizes.height = e.target.value}></input>
				<button className="preview addImageModalButton" onClick={() => {
					props.setAddTableOverlayActive(false)
					props.setApplyTableCount(props.applyCount + 1)
				}}> Apply </button>
			</div>
		</div>
	);
}


export default ModalTable;

