import React from "react";
import { connect } from "react-redux";
import { openLightBoxModal } from "../../actions/Modals";
import PropTypes from "prop-types";

const { REACT_APP_PUBLIC_FILES } = process.env;


const ImagesGallery = ({ images, openLightBoxModal }) => (
  <div className="cardHolder album">
    {
      images.map((img, key) =>
        <div key={key} className="image-link"
             onClick={() => openLightBoxModal(images)}>
          <img className="card-grid-popup2 test" src={`${REACT_APP_PUBLIC_FILES + img}`}
               alt=""/>
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