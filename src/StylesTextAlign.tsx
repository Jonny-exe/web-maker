import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import TextAlignCheckbox from './TextAlignCheckbox'
import { preProcessFile } from 'typescript';

export const StylesTextAlign = (props: any) => {
  const [selected, setSelected] = useState("")

  return (
    <div className="textAlignContainer">
      <TextAlignCheckbox selected={selected} setSelected={setSelected} savedStyle={props.savedStyle} icon={faAlignJustify} type={"justify"}/>
      <TextAlignCheckbox selected={selected} setSelected={setSelected} savedStyle={props.savedStyle} icon={faAlignCenter} type={"center"}/>
      <TextAlignCheckbox selected={selected} setSelected={setSelected} savedStyle={props.savedStyle} icon={faAlignLeft} type={"left"}/>
      <TextAlignCheckbox selected={selected} setSelected={setSelected} savedStyle={props.savedStyle} icon={faAlignRight} type={"right"}/>
    </div>
  )
}

export default StylesTextAlign