import React, { useState } from "react"
import "./App.css"
import Preview from "./Preview"
import Alerts from "./Alerts"
import AddButton from "./AddComponents/AddButton"
import Modal from "./Modals/Modal"
import RenderContent from "./RenderContent"
import Login from "./Login"
import ModalEditPlacement from "./Modals/ModalEditPlacement"
import Settings from "./SettingsComponents/Settings"
import { bodyObject } from "./constants/defaultTypes"

const App = () => {
	const [itemIndex, setItemIndex] = useState(-1)
	const [modalEditPlacementActive, setModalEditPlacementActive] = useState(
		false
	)
	const [token, setToken] = useState(
		localStorage.getItem("web-maker-token") != null
			? localStorage.getItem("web-maker-token")
			: ""
	)
	const [modalStateActive, setModalStateActive] = useState(false)
	const [loginModalStateActive, setLoginModalStateActive] = useState(false)
	const [addButtonStateActive, setAddButtonStateActive] = useState(false)
	const [savedStyle, setSavedStyle] = useState({
		textAlign: "",
		borderStyle: "",
	})
	const [editCount, setEditCount] = useState(0)
	const [previewMode, setPreviewMode] = useState(false)
	const [content, setContent] = useState([bodyObject])
	console.log(content)

	return (
		<div className="App">
			<div className="tools">
				<Login
					content={content}
					setContent={setContent}
					token={token}
					previewMode={previewMode}
					setToken={setToken}
					setLoginModalStateActive={setLoginModalStateActive}
					loginModalStateActive={loginModalStateActive}
				/>
				<Preview previewMode={previewMode} handlePreview={setPreviewMode} />
				<AddButton
					content={content}
					setContent={setContent}
					addButtonStateActive={addButtonStateActive}
					setAddButtonStateActive={setAddButtonStateActive}
					editCount={editCount}
					setEditCount={setEditCount}
					previewMode={previewMode}
				/>
			</div>
			<ModalEditPlacement
				itemIndex={itemIndex}
				setItemIndex={setItemIndex}
				setModalEditPlacementActive={setModalEditPlacementActive}
				modalEditPlacementActive={modalEditPlacementActive}
				content={content}
			/>
			<Alerts />
			<Modal
				setSavedStyle={setSavedStyle}
				savedStyle={savedStyle}
				previewMode={previewMode}
				modalStateActive={modalStateActive}
				setModalStateActive={setModalStateActive}
			/>
			<div style={content[0]} className="render">
				<RenderContent
					itemIndex={itemIndex}
					setItemIndex={setItemIndex}
					setModalEditPlacementActive={setModalEditPlacementActive}
					previewMode={previewMode}
					setSavedStyle={setSavedStyle}
					savedStyle={savedStyle}
					content={content}
				/>
			</div>
			<Settings
				setContent={setContent}
				previewMode={previewMode}
				content={content}
			/>
		</div>
	)
}

export default App
