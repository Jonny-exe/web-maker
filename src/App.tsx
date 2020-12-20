import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [divCount, setDivCount] = useState(0)
  const [displayButtons, setDisplayButtons] = useState(false)
  const [array, setArray] = useState([""])
  const [input, setInput] = useState("")
  const [savedInput, setSavedInput] = useState({textContent: ""})
  const [savedIndex, setSavedIndex] = useState(1)
  const [savedStyle, setSavedStyle] = useState({borderStyle: ""})
  const [editCount, setEditCount] = useState(0)
  const [previewMode, setPreviewMode] = useState(false)

  const addToDivCount = () => {
    setDivCount(divCount + 1)
    var newArray: string[]
    array.push(input)
    var newArray = array
    setArray(newArray)
  }

  const handleInput = (event: any) => {
    setInput(event.target.value)
    savedInput.textContent = event.target.value
  }

  const handleDiv = (content: string, index: number, event: any) => {
    setInput(content)
    setSavedIndex(index)
    setSavedStyle(event.target.style)
    setSavedInput(event.target)
    setDisplayButtons(true)
  }

  const editDiv = () => {
    var newArray = array
    newArray[savedIndex] = input
    setArray(newArray)
    setEditCount(editCount + 1)
    setDisplayButtons(false)
    savedStyle.borderStyle = "none"
    savedInput.textContent = ""
    setInput("")
  }

  const logStyle = (e: any) => {
    console.log(e.target.style.borderStyle)
  }

  const handlePreview = () => {
    setPreviewMode(true)
  }

  const handleUnPreview = () => {
    setPreviewMode(false)
  }
  
  return (
    <div className="App">
      <button className={previewMode ? "previewMode" : ""} onClick={handlePreview}> Preview </button>
      <button className={previewMode ? "" : "previewMode"} onClick={handleUnPreview}> UnPreview </button>
      <button className={previewMode ? "previewMode" : ""} onClick={addToDivCount}> Add div </button>
      <input type="text" className={previewMode ? "previewMode" : ""} onChange={handleInput} value={input}></input>
      <button onClick={editDiv} className={`${previewMode ? "previewMode" : ""} ${displayButtons ? "displayButtons" : "notDisplayButtons"}`}> Edit </button>
      <h1 className={previewMode ? "previewMode" : ""}> {divCount} </h1>
      <h1 className={previewMode ? "previewMode" : ""}> {editCount} </h1>
      <div> {
        array.map((x, i) => (
          <div onClick={(e: any) => {
            console.log(logStyle)
            handleDiv(x, i, e)
            savedStyle.borderStyle = ""
            e.target.style.border = "1px solid black"
            e.target.style.borderRadius = "5px"
            console.log(e.target.textContent)
          }}>{x}</div>
          )
        )
      }

      </div>
    </div>
  );
}

export default App;
