import React from 'react';
import RenderContent from './RenderContent';
import {notEditable} from './exceptionItems';

export const RenderContent1 = (props: any) => {
  return (
    <>
      {props.content.map((x: any, i: number) =>
        // Images must be done separatly
        x.type === 'img' ? (
          <h1 key={i * 999}> hi </h1>
        ) : (
          React.createElement(
            x.type,
            {
              style: x.style,
              key: i * 100,
              contentEditable:
                notEditable.includes(x.type) || props.previewMode
                  ? 'false'
                  : 'true', // this is has to be like this because if not it doesnt detect the td only the table
              placeholder:
                (notEditable.includes(x.type) && x.type !== 'div') ||
                !props.previewMode
                  ? x.text
                  : '',
              content: 'hi',
              onClick: (e: any) => {
                props.setSavedStyle(e.target.style);
              },
              onInput: (e: any) => {
                x.content = e.target.textContent;
              },
            },
            x.children !== undefined && x.children.length !== 0 ? (
              <RenderContent
                setSavedStyle={props.setSavedStyle}
                savedStyle={props.savedStyle}
                setModalEditPlacementActive={props.setModalEditPlacementActive}
                setItemIndex={props.setItemIndex}
                l
                itemIndex={props.itemIndex}
                content={x.children}
              />
            ) : (
              x.content
            ),
          )
        ),
      )}
    </>
  );
};

export default RenderContent1;
