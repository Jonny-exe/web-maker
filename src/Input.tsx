import React, { useState } from 'react'

export const Input = (props: any) => {

  const handleInput = (event: any) => {
    props.setInput(event.target.value)
    props.savedInput.textContent = event.target.value
  }
  return (
    <div className="inputContainer">
			<input type="text" value={props.input} onChange={handleInput} className={`input ${props.previewMode ? "previewMode" : ""}`}></input>
    </div>
  )
}

export default Input