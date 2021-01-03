import React from 'react';

const ModalImageSizeTable = (props: any) => {
  return (
    <table className="imageModalTable">
      <tbody>
        <tr>
          <td>
            <div> Select magnitude </div>
          </td>
          <td>
            <select
              onChange={(e: any) =>
                (props.imageSizes.magnitude = e.target.value)
              }
              className="preview imageModalSelect"
            >
              <option value=""></option>
              <option value="%"> Percentage </option>
              <option value="px"> Pixel </option>
            </select>
          </td>
        </tr>
        <tr className="imageModalTable">
          <td>
            <span> Width </span>
          </td>
          <td>
            <input
              type="number"
              onChange={(e: any) => (props.imageSizes.width = e.target.value)}
              placeholder="Desired Image width"
              className="preview"
            />
          </td>
        </tr>
        <tr>
          <td>
            <span> Height </span>
          </td>
          <td>
            <input
              type="number"
              placeholder="Desired Image width"
              onChange={(e: any) => (props.imageSizes.height = e.target.value)}
              className="preview"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ModalImageSizeTable;
