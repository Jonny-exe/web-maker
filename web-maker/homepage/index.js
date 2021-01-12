import "./constants/textInstructions.js"
const $ = (element) => {
	return document.getElementById(element)
}

let mainNodeChildrenCopy = {}
Object.assign(mainNodeChildrenCopy, $("render").children)

const searchChanged = () => {
	const mainNode = $("render")
	const mainNodeChildren = {}
	Object.assign(mainNodeChildren, mainNodeChildrenCopy)
	const inputValue = $("searchbar").value

	const removeHtmlItems = () => {
		mainNode.innerHTML = ""
	}

	const addNewHtmlItems = (searchKey) => {
		const reorderInformation = () => {
			for (let child in mainNodeChildren) {
				child = mainNodeChildren[child]
				// With lower case I make it case insensitive
				if (child.textContent.toLowerCase().includes(searchKey.toLowerCase())) {
					mainNode.appendChild(child)
				}
			}
		}
		reorderInformation()
	}

	removeHtmlItems()
	addNewHtmlItems(inputValue)
}

$("searchbar").addEventListener("input", searchChanged)
