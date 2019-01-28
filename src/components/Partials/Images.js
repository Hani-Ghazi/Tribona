import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import PropTypes from "prop-types";

const { REACT_APP_PUBLIC_FILES } = process.env;

const Images = ({ images, removeImage }) => (
  <div className="row">
    {
      (images || []).map((image, i) =>
        <div key={i} className='col-md-3 pos-relative'>
          <div
            onClick={(e) => removeImage(image)}
            className='delete'
          >
            <FaTimesCircle size='1em'/>
          </div>
          <img
            src={REACT_APP_PUBLIC_FILES + image}
            alt=''
            className="img-border img-fluid test"
          />
        </div>
      )}
  </div>
);

Images.propTypes = {
  images: PropTypes.array.isRequired,
  removeImage: PropTypes.func.isRequired
};


export default Images;