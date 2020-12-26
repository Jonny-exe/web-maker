import React, { useEffect, useState } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownItems from './DropdownItems'
import ModalImage from './ModalImage'


/* <FontAwesomeIcon icon={faPlusSquare} style={{ width: "" }} onClick={props.addToDivCount} className={props.previewMode ? "previewMode" : ""} /> */
const AddButton = (props: any) => {
  const [imageSrc, setImageSrc] = useState("")
  const [menuState, setMenuState] = useState(false)
  const [addImageOverlayActive, setAddImageOverlayActive] = useState(false)
  const [applyCount, setApplyCount] = useState(0)
  const [imageSizes, setImageSizes] = useState({ width: 1, height: 1, magnitude: "" })
  console.log(imageSizes)

  const handleClick = () => {
    setMenuState(!menuState)
  }

  return (
    <div className="addButtonContainer">
      <div className="">
        <FontAwesomeIcon size={"2x"} icon={faPlus} className={`addButton ${props.previewMode ? "previewMode" : ""}`} onClick={handleClick} />
      </div>
      <DropdownItems imageSrc={imageSrc} imageSizes={imageSizes} applyCount={applyCount} content={props.content} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} setAddImageOverlayActive={setAddImageOverlayActive} menuState={menuState} />
      <div className={`overlay addButtonOverlay ${menuState ? "overlayActive addButtonOverlayActive" : ""}`} onClick={() => setMenuState(false)}></div>
      <ModalImage imageSrc={imageSrc} setImageSrc={setImageSrc} imageSizes={imageSizes} setImageSizes={setImageSizes} setApplyCount={setApplyCount} applyCount={applyCount} addImageOverlayActive={addImageOverlayActive} setAddImageOverlayActive={setAddImageOverlayActive} />
    </div>
  );
}


export default AddButton;