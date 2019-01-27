import React, { Fragment } from "react";
import Lightbox from "react-image-lightbox";
import PropTypes from "prop-types";
import { DetailedRate, Favorite, Follow, Like, UserWidget } from "../Partials";

const { REACT_APP_PUBLIC_FILES } = process.env;

class JourneyStep extends React.Component {
  state = {
    isOpen: false,
    currentIndex: 0
  };

  render() {
    const { step, step: { images } } = this.props;
    const { isOpen, currentIndex } = this.state;
    return (
      <Fragment>
        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-md-12"}>
              <h6 className="black bold mt-4 mb-3 underline-title">Step's Place
                <span className={"pull-right"}>
                <Like isLike={!!step.isLiked} onChange={this.changeLikeStatus} size={"1em"}/>
                <Favorite isFav={!!step.isFavorite} onChange={this.changeFavStatus} size={"1em"}/>
              </span>
              </h6>
              <p>{step.place.name}</p>

              {
                !!images.length &&
                <Fragment>
                  <h6 className="underline-title">Images</h6>
                  <div className="cardHolder album">
                    {
                      images.map((img, key) =>
                        <div key={key} className="image-link"
                             onClick={() => this.setState({ isOpen: true, currentIndex: key })}>
                          <img className="card-grid-popup2 test" src={`${REACT_APP_PUBLIC_FILES + img}`}
                               alt=""/>
                        </div>
                      )
                    }
                  </div>
                </Fragment>
              }

              <h6 className="black bold mt-4 mb-3 underline-title">Step's Description</h6>
              <p>{step.description}</p>
              <h6 className="underline-title">Step's Review Details</h6>
              <DetailedRate ratings={step.ratings} ratingsAvg={step.ratingsAvg}/>
            </div>
          </div>
        </div>
        {
          isOpen &&
          <Lightbox
            mainSrc={REACT_APP_PUBLIC_FILES + images[currentIndex]}
            nextSrc={REACT_APP_PUBLIC_FILES + images[(currentIndex + 1) % images.length]}
            prevSrc={REACT_APP_PUBLIC_FILES + images[(currentIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
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
        }
      </Fragment>
    );
  }
};

JourneyStep.propTypes = {
  // step: PropTypes.shape({.isRequired
};


export default JourneyStep;