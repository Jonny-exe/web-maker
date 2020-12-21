import React, { useState } from 'react';
import './App.css';
import Preview from './Preview'
import AddButton from './AddButton'
import Input from './Input'
import DropdownMenu from './DropdownMenu'
import RenderContent from './RenderContent'

function App() {
	// const [inputValue, setInputValue] = useState("")
  const [divCount, setDivCount] = useState(0)
  const [displayButtons, setDisplayButtons] = useState(false)
  const [array, setArray] = useState([""])
  const [input, setInput] = useState("")
  const [savedInput, setSavedInput] = useState({ textContent: "" })
  const [savedIndex, setSavedIndex] = useState(1)
  const [savedStyle, setSavedStyle] = useState({ borderStyle: "" })
  const [editCount, setEditCount] = useState(0)
  const [previewMode, setPreviewMode] = useState(false)
  const [content, setContent] = useState([
  ])

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
    setInput("")
  }


  const logStyle = (e: any) => {
    console.log(e.target.style.borderStyle)
  }

  const handlePreview = (bool: boolean) => {
    setPreviewMode(bool)
  }
  return (
    <div className="App">
      <div className="tools">
        <Preview previewMode={previewMode} handlePreview={setPreviewMode} />
        <Input input={input} setInput={setInput} savedInput={savedInput} previewMode={previewMode} />
        <button onClick={editDiv} className={`preview ${previewMode ? "previewMode" : ""} ${displayButtons ? "displayButtons" : "notDisplayButtons"}`}> Edit </button>
        <AddButton content={content} setContent={setContent} editCount={editCount} setEditCount={setEditCount} previewMode={previewMode} addToDivCount={addToDivCount} />
      </div>
      <RenderContent handleDiv={handleDiv} savedStyle={savedStyle} content={content} />
    </div>
  );
}

export default App;
