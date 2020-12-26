import React, { useEffect, useState } from 'react'
import StylesTextAlign from './StylesTextAlign'
import StylesToggle from './StylesToggle'

export const Modal = (props: any) => {

  // const handleInput = (event: any) => {
  //   props.setInput(event.target.value)
  //   props.savedInput.textContent = props.html
  // }
  console.log(props.savedStyle)
  console.log(props.html)

  return (
    <div className="inputContainer">
      {/* <input type="text" value={props.input} className={`input ${props.previewMode ? "previewMode" : ""}`}></input> */}
      {/* <button onClick={() => props.setModalStateActive(true)}> modal </button> */}
      <div className={`editModal ${props.modalStateActive ? "editModalActive" : ""}`}>
        <StylesToggle modalStateActive={props.modalStateActive} on="solid" off="none" savedStyle={props.savedStyle} propertyToToggle={"borderStyle"} nameOfStyle={"Border"} />
        <StylesTextAlign savedStyle={props.savedStyle} modalStateActive={props.modalStateActive} />
      </div>
      <div className={`overlay editOverlay ${props.modalStateActive ? "overlayActive" : ""}`} onClick={() => props.setModalStateActive(false)}></div>
    </div>
  )
}

export default Modal