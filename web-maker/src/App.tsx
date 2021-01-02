import React, { useState } from 'react';
import './App.css';
import Preview from './Preview'
import Alerts from './Alerts'
import AddButton from './AddButton'
import Modal from './Modals/Modal'
import DropdownMenu from './DropdownMenu'
import RenderContent from './RenderContent'
import Login from './Login'
// import Styles from './StylesTextAlign'
import Edit from './Edit'
import ModalEditPlacement from './Modals/ModalEditPlacement';

function AppMain() {
  // const [inputValue, setInputValue] = useState("")
	const [itemIndex, setItemIndex] = useState(-1)
	const [modalEditPlacementActive, setModalEditPlacementActive] = useState(false)
  const [token, setToken] = useState("")
  const [modalStateActive, setModalStateActive] = useState(false)
  const [loginModalStateActive, setLoginModalStateActive] = useState(false)
  const [addButtonStateActive, setAddButtonStateActive] = useState(false)
  const [divCount, setDivCount] = useState(0)
  const [array, setArray] = useState([""])
  const [input, setInput] = useState("")
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

  console.log("Content: ", content)
  return (
    <div className="App">
      <div className="tools">
        <Login content={content} setContent={setContent} token={token} previewMode={previewMode} setToken={setToken} setLoginModalStateActive={setLoginModalStateActive} loginModalStateActive={loginModalStateActive} />
        <Preview previewMode={previewMode} handlePreview={setPreviewMode} />
        {/* <Edit previewMode={previewMode} savedStyle={savedStyle} setModalStateActive={setModalStateActive} displayButtons={displayButtons} /> */}
        <AddButton content={content} setContent={setContent} addButtonStateActive={addButtonStateActive} setAddButtonStateActive={setAddButtonStateActive} editCount={editCount} setEditCount={setEditCount} previewMode={previewMode} addToDivCount={addToDivCount} />
      </div>
      <ModalEditPlacement itemIndex={itemIndex} setItemIndex={setItemIndex} setModalEditPlacementActive={setModalEditPlacementActive} modalEditPlacementActive={modalEditPlacementActive} content={content} />
      <Alerts  />
      <Modal input={input} setInput={setInput} setSavedStyle={setSavedStyle} savedStyle={savedStyle} previewMode={previewMode} modalStateActive={modalStateActive} setModalStateActive={setModalStateActive} />
      <div className="render">
        <RenderContent itemIndex={itemIndex} setItemIndex={setItemIndex} setModalEditPlacementActive={setModalEditPlacementActive} previewMode={previewMode} setSavedStyle={setSavedStyle} savedStyle={savedStyle} content={content} />
      </div>
    </div>
  );
}

export default AppMain;
