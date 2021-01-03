import React, {useState} from 'react';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import DropdownItems from './DropdownItems';
import ModalImage from './Modals/ModalImage';
import ModalTable from './Modals/ModalTable';

const AddButton = (props: any) => {
  const [imageSrc, setImageSrc] = useState('');
  const [menuState, setMenuState] = useState(false);
  const [addImageOverlayActive, setAddImageOverlayActive] = useState(false);
  const [addTableOverlayActive, setAddTableOverlayActive] = useState(false);
  const [applyImageCount, setApplyImageCount] = useState(0);
  const [applyTableCount, setApplyTableCount] = useState(0);
  const [imageSizes, setImageSizes] = useState({
    width: 1,
    height: 1,
    magnitude: '',
  });
  const [tableSizes, setTableSizes] = useState({width: 2, height: 2});

  const handleClick = () => {
    setMenuState(!menuState);
  };

  return (
    <div className="addButtonContainer">
      <div className="">
        <FontAwesomeIcon
          size={'2x'}
          icon={faPlus}
          className={`addButton ${props.previewMode ? 'previewMode' : ''}`}
          onClick={handleClick}
        />
      </div>
      <DropdownItems
        applyTableCount={applyTableCount}
        imageSrc={imageSrc}
        imageSizes={imageSizes}
        tableSizes={tableSizes}
        setApplyTableCount={setApplyTableCount}
        applyImageCount={applyImageCount}
        content={props.content}
        setContent={props.setContent}
        editCount={props.editCount}
        setEditCount={props.setEditCount}
        setAddImageOverlayActive={setAddImageOverlayActive}
        setAddTableOverlayActive={setAddTableOverlayActive}
        menuState={menuState}
      />
      <div
        className={`overlay addButtonOverlay ${
          menuState ? 'overlayActive addButtonOverlayActive' : ''
        }`}
        onClick={() => setMenuState(false)}
      ></div>
      <ModalImage
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        imageSizes={imageSizes}
        setImageSizes={setImageSizes}
        setApplyImageCount={setApplyImageCount}
        applyImageCount={applyImageCount}
        addImageOverlayActive={addImageOverlayActive}
        setAddImageOverlayActive={setAddImageOverlayActive}
        setApplyTableCount={setApplyTableCount}
      />
      <ModalTable
        tableSizes={tableSizes}
        setTableSizes={setTableSizes}
        setApplyTableCount={setApplyTableCount}
        applyTableCount={applyTableCount}
        addTableOverlayActive={addTableOverlayActive}
        setAddTableOverlayActive={setAddTableOverlayActive}
      />
    </div>
  );
};

export default AddButton;
