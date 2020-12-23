import React, { useEffect, useState } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownItems from './DropdownItems'


/* <FontAwesomeIcon icon={faPlusSquare} style={{ width: "" }} onClick={props.addToDivCount} className={props.previewMode ? "previewMode" : ""} /> */
const AddButton = (props: any) => {
  const [menuState, setMenuState] = useState(false)
  const [addImageOverlayActive, setAddImageOverlayActive] = useState(false)
  console.log(menuState)

  const handleClick = () => {
    setMenuState(!menuState)
  }

  return (
    <div className="addButtonContainer">
      <div className="">
        <FontAwesomeIcon size={"2x"} icon={faPlus} className={`addButton ${props.previewMode ? "previewMode" : ""}`} onClick={handleClick} />
      </div>
      <DropdownItems content={props.content} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} setAddImageOverlayActive={setAddImageOverlayActive} menuState={menuState} />
      <div className={`overlay addButtonOverlay ${menuState ? "overlayActive addButtonOverlayActive" : ""}`} onClick={() => setMenuState(false)}></div>
      <div className={`overlay addImageOverlay ${addImageOverlayActive ? "overlayActive addImageOverlayActive" : ""}`} onClick={() => setAddImageOverlayActive(false)}></div>
    </div>
  );
}


export default AddButton;
