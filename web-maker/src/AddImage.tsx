import React, {useEffect} from 'react';
import {image} from './defaultTypes.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const AddImage = (props: any) => {
  const addImage = () => {
    props.setAddImageOverlayActive(true);
  };

  useEffect(() => {
    if (props.applyImageCount === 0) {
      return;
    }
    var itemCopy: any = {};
    Object.assign(itemCopy, image);
    console.log(props);
    itemCopy.text = props.text;
    itemCopy.type = props.type;
    itemCopy.src = props.src;
    itemCopy.style = {
      width: props.imageSizes.width + props.imageSizes.magnitude,
      height: props.imageSizes.width + props.imageSizes.magnitude,
      margin: '1%',
    };
    props.content.push(itemCopy);
    props.setEditCount(props.editCount + 1);
  }, [props.applyImageCount]);

  return (
    <>
      <div onClick={addImage} className="dropdown">
        <FontAwesomeIcon size={'2x'} icon={props.icon} />
      </div>
    </>
  );
};

export default AddImage;
