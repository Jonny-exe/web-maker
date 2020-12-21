import React, { useState } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownItems from './DropdownItems'


/* <FontAwesomeIcon icon={faPlusSquare} style={{ width: "" }} onClick={props.addToDivCount} className={props.previewMode ? "previewMode" : ""} /> */
const AddButton = (props: any) => {
  const [menuState, setMenuState] = useState(false)
  console.log(menuState)
  return (
    <div>
      <div className="addButtonContainer">
        <FontAwesomeIcon size={"2x"} icon={faPlus} className={`addButton ${props.previewMode ? "previewMode" : ""}`} onClick={() => setMenuState(!menuState)} />
      </div>
      <DropdownItems content={props.content} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} menuState={menuState} />
    </div>
  );
}


export default AddButton;
