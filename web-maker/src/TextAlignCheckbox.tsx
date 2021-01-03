import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TextAlignCheckbox = (props: any) => {
  const handleClick = () => {
    props.setSelected(props.type)
    props.savedStyle.textAlign = props.type
  }

  useEffect(() => {
    props.setSelected(props.savedStyle.textAlign)
  }, [props.modalStateActive])

  return (
    <label className="checkboxContainer" onClick={handleClick}>
      <input type="checkbox" className="checkbox" checked={props.selected === props.type ? true : false} />
      <FontAwesomeIcon className="textAlignIcon" icon={props.icon} />
    </label>
  )
}

export default TextAlignCheckbox