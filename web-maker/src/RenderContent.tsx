import React, { useEffect, useState } from "react"
import { notEditable } from "./exceptionItems"
import RenderContent1 from "./RenderContent1"

export const RenderContent = (props: any) => {
  const [holdCounter, setHoldCounter] = useState(-1)
  const [cancelHover, setCancelHover] = useState(false)
  useEffect(() => {
    if (props.itemIndex !== -1 && holdCounter !== -1) {
      if (!cancelHover) {
        if (holdCounter < 4) {
          var timer = setTimeout(increaseHoldIndex, 75)
        } else {
          setHoldCounter(-1)
          props.setModalEditPlacementActive(true)
          setCancelHover(true)
        }
      } else {
        setHoldCounter(-1)
      }
    }
    return () => {
      clearTimeout(timer)
    }
  }, [holdCounter])

  const increaseHoldIndex = () => {
    setHoldCounter(holdCounter + 1)
  }

  const handleMouseDown = (index: number) => {
    if (props.setItemIndex !== undefined) {
      props.setItemIndex(index)
    }
    increaseHoldIndex()
    setCancelHover(false)
  }

  return (
    <>
      {props.content.map((item: any, index: number) =>
        item.type === "img" ? (
          <img
            src={item.src}
            style={item.style}
            onMouseDown={() => handleMouseDown(index)}
            alt="Image"
          />
        ) : (
          React.createElement(
            item.type,
            {
              style: item.style,
              contentEditable:
                notEditable.includes(item.type) || props.previewMode
                  ? "false"
                  : "true", // this is has to be like this because if not it doesnt detect the td only the table
              key: index,
              placeholder:
                (notEditable.includes(item.type) && item.type !== "div") ||
                !props.previewMode
                  ? item.text
                  : "",
              content: "",
              onInput: (e: any) => {
                item.content = e.target.textContent
              },
              onClick: (e: any) => {
                props.setSavedStyle(e.target.style)
              },
              onMouseDown: (e: any) => {
                handleMouseDown(index)
              },
              onMouseUp: (e: any) => {
                setHoldCounter(-1)
                setCancelHover(true)
              },
            },
            item.children !== null &&
              item.children !== undefined &&
              item.children.length !== 0 ? (
              <RenderContent1
                content={item.children}
                setModalEditPlacementActive={props.setModalEditPlacementActive}
                previewMode={props.previewMode}
                setSavedStyle={props.setSavedStyle}
                setItemIndex={props.setItemIndex}
                itemIndex={props.itemIndex}
                savedStyle={props.savedStyle}
              />
            ) : (
              item.content
            )
          )
        )
      )}
    </>
  )
}

export default RenderContent
