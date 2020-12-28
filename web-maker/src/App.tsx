import React, { useState } from 'react';
import './App.css';
import Preview from './Preview'
import AddButton from './AddButton'
import Modal from './Modal'
import DropdownMenu from './DropdownMenu'
import RenderContent from './RenderContent'
import Login from './Login'
// import Styles from './StylesTextAlign'
import Edit from './Edit'

function App() {
  // const [inputValue, setInputValue] = useState("")
  const [token, setToken] = useState("")
  const [modalStateActive, setModalStateActive] = useState(false)
  const [loginModalStateActive, setLoginModalStateActive] = useState(false)
  const [addButtonStateActive, setAddButtonStateActive] = useState(false)
  const [divCount, setDivCount] = useState(0)
  const [displayButtons, setDisplayButtons] = useState(false)
  const [array, setArray] = useState([""])
  const [input, setInput] = useState("")
  const [html, setHtml] = useState("")
  const [savedInput, setSavedInput] = useState({ textContent: "" })
  const [savedIndex, setSavedIndex] = useState(1)
  const [savedStyle, setSavedStyle] = useState({ textAlign: "", borderStyle: "" })
  const [editCount, setEditCount] = useState(0)
  const [previewMode, setPreviewMode] = useState(false)
  const [content, setContent] = useState([])

  const addToDivCount = () => {
    setDivCount(divCount + 1)
    var newArray: string[]
    array.push(input)
    var newArray = array
    setArray(newArray)
  }

  // const handleInput = (event: any) => {
  //   setInput(event.target.value)
  //   savedInput.textContent = event.target.value
  // }

  const handleDiv = (content: string, index: number, event: any) => {
    setInput(content)
    setSavedIndex(index)
    setSavedStyle(event.target.style)
    setSavedInput(event.target)
    setDisplayButtons(true)
  }

  // const editDiv = () => {
  //   var newArray = array
  //   newArray[savedIndex] = input
  //   setArray(newArray)
  //   setEditCount(editCount + 1)
  //   setDisplayButtons(false)
  //   savedStyle.borderStyle = "none"
  //   setSavedInput({textContent: ""}) // This cant be done savedInput.textContent because it is a reference to event.target.textContent
  //   setInput("")
  // }


  const logStyle = (e: any) => {
    console.log(e.target.style.borderStyle)
  }

  const handlePreview = (bool: boolean) => {
    setPreviewMode(bool)
  }


  console.log(content)
  return (
    <div className="App">
      <div className="tools">
        <Login content={content} setContent={setContent} token={token} setToken={setToken} setLoginModalStateActive={setLoginModalStateActive} loginModalStateActive={loginModalStateActive} />
        <Preview previewMode={previewMode} handlePreview={setPreviewMode} />
        <Edit previewMode={previewMode} savedStyle={savedStyle} setModalStateActive={setModalStateActive} displayButtons={displayButtons} />
        {/* <Styles previewMode={previewMode} displayButtons={displayButtons} /> */}
        <AddButton content={content} setContent={setContent} addButtonStateActive={addButtonStateActive} setAddButtonStateActive={setAddButtonStateActive} editCount={editCount} setEditCount={setEditCount} previewMode={previewMode} addToDivCount={addToDivCount} />
      </div>
      <Modal input={input} setInput={setInput} savedStyle={savedStyle} savedInput={savedInput} previewMode={previewMode} modalStateActive={modalStateActive} setModalStateActive={setModalStateActive} />
      <RenderContent setDisplayButtons={setDisplayButtons} setSavedStyle={setSavedStyle} savedStyle={savedStyle} content={content} />
      {/* <ol contentEditable>
        <li></li>
      </ol> */}
    </div>
  );
}

export default App;
