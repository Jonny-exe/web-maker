import React from "react"
import { item } from "./defaultTypes.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AddItem = (props: any) => {
  const addTitle = () => {
    // var content = props.content
    var itemCopy = JSON.parse(JSON.stringify(item))
    itemCopy.text = props.text
    itemCopy.type = props.type
    props.content.push(itemCopy)
    props.setEditCount(props.editCount + 1)
  }
  return (
    <div onClick={addTitle} className="dropdown">
      <div style={{ scale: `${props.size}` }}>
        <FontAwesomeIcon size={"2x"} icon={props.icon} />
      </div>
    </div>
  )
}

export default AddItem
