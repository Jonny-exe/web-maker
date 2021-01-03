import React from 'react';
import ModalImageSizeTabel from './ModalImageSizeTable';

const ModalImage = (props: any) => {
  return (
    <div className="imageModalContainer">
      <div
        className={`overlay addImageOverlay ${
          props.addImageOverlayActive
            ? 'overlayActive addImageOverlayActive'
            : ''
        }`}
        onClick={() => props.setAddImageOverlayActive(false)}
      ></div>
      <div
        className={`addImageModal modal ${
          props.addImageOverlayActive ? 'modalActive' : ''
        }`}
      >
        <h2 className="addImageModalHeader" style={{margin: '1%'}}>
          {' '}
          Add your image url{' '}
        </h2>
        <input
          type="text"
          className={`input ${props.previewMode ? 'previewMode' : ''}`}
          value={props.imageSrc}
          placeholder="https:you-image-url"
          onChange={(e: any) => props.setImageSrc(e.target.value)}
        />
        <div className="informationDiv">
          {' '}
          Select your image messurement, if you image is already good leave
          everything blank
        </div>
        <div className="imageModalSizeInputContainer">
          <ModalImageSizeTabel imageSizes={props.imageSizes} />
        </div>
        <button
          className="preview loginButton modalImageButton"
          onClick={() => {
            props.setAddImageOverlayActive(false);
            debugger;
            props.setApplyImageCount(props.applyImageCount + 1);
          }}
        >
          {' '}
          Apply{' '}
        </button>
      </div>
    </div>
  );
};

export default ModalImage;
