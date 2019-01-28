import React, { Component, Fragment } from "react";
import Lightbox from "react-image-lightbox";
import { connect } from "react-redux";
import { closeLightBoxModal } from "../../actions/Modals";
import PropTypes from "prop-types";

const { REACT_APP_PUBLIC_FILES } = process.env;

class LightBox extends Component {
  state = {
    currentIndex: 0
  };

  render() {
    const { images, closeLightBoxModal, isLightBoxOpen } = this.props;
    const { currentIndex } = this.state;
    if (!isLightBoxOpen) return <Fragment/>;
    else
      return (
        <Lightbox
          mainSrc={REACT_APP_PUBLIC_FILES + images[currentIndex]}
          nextSrc={REACT_APP_PUBLIC_FILES + images[(currentIndex + 1) % images.length]}
          prevSrc={REACT_APP_PUBLIC_FILES + images[(currentIndex + images.length - 1) % images.length]}
          onCloseRequest={() => closeLightBoxModal()}
          onMovePrevRequest={() =>
            this.setState({
              currentIndex: (currentIndex + images.length - 1) % images.length
            })
          }
          onMoveNextRequest={() =>
            this.setState({
              currentIndex: (currentIndex + 1) % images.length
            })
          }
        />
      );
  }
}

LightBox.propTypes = {
  images: PropTypes.array.isRequired,
  closeLightBoxModal: PropTypes.func.isRequired,
  isLightBoxOpen: PropTypes.bool.isRequired
};


const initMapStateToProps = state => {
  return { images: state.modals.lightBoxImages, isLightBoxOpen: !!state.modals.isLightBoxOpen };
};

export default connect(initMapStateToProps, { closeLightBoxModal })(LightBox);