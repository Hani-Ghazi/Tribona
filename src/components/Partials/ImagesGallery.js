import React from "react";
import { connect } from "react-redux";
import { openLightBoxModal } from "../../actions/Modals";
import PropTypes from "prop-types";

const { REACT_APP_PUBLIC_FILES } = process.env;


const ImagesGallery = ({ images, openLightBoxModal }) => (
  <div className="row p-t-10">
    {
      images.map((image, key) =>
        <div className="col-md-3 dis-inline" key={key}>
          <img
            onClick={() => openLightBoxModal(images)}
            src={REACT_APP_PUBLIC_FILES + image}
            alt=''
            className="img-border img-fluid"
          />
        </div>
      )
    }
  </div>
);

ImagesGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openLightBoxModal: PropTypes.func.isRequired
};


export default connect(null, { openLightBoxModal })(ImagesGallery);