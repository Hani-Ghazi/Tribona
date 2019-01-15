import React, { Component, Fragment } from "react";
import SliderWithScroll from "../sliders/SliderWithScroll";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import {
  getPlaceById,
  getPlaceComments,
  CheckPlaceLikeStatus,
  CheckPlaceFavStatus,
  placeLike,
  placeDisLike
} from "../../actions/Places";
import PropTypes from "prop-types";
import { PropagateLoader } from "react-spinners";
import "react-image-lightbox/style.css";
import GoogleMapReact from "google-map-react";
import { IoIosHeart, IoIosHeartEmpty, IoIosThumbsUp, IoIosThumbsDown } from "react-icons/io";


const { REACT_APP_PUBLIC_FILES } = process.env;

class PlaceDetails extends Component {
  state = {
    isOpen: false,
    currentIndex: 0,
    place: null
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPlaceById(id).then(() => {
      this.setState({ place: {...this.props.place }});
      this.props.getPlaceComments(id);
      this.props.CheckPlaceLikeStatus(id);
    });
  }

  changeLikeStatus = (e) => {
    const { isLike, id } = this.state.place;
    (!!isLike ? this.props.placeDisLike(id) : this.props.placeLike(id)).then(() => this.setState({
      place: {
        ...this.state.place,
        isLike: !isLike
      }
    }));
  };

  render() {
    const { place } = this.state;
    const { isOpen, currentIndex } = this.state;
    const images = (place || {}).images || [];
    return (
      <Fragment>
        {
          !place && <PropagateLoader/>
        }
        {
          place &&
          <Fragment>
            <SliderWithScroll slide={place}/>
            <section id="section3" className="tour-list-sidebar tour-list-sidebar-2-col">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xs-12 col-md-6 col-lg-3 ml-lg-5 order-lg-first order-last mt-5 mt-lg-0">
                    <div className="w-100  text-center">
                      <h3>{place.ownerName}</h3>
                    </div>
                    <div className="mb-lg-3 mb-4  text-center">
                      <a href="#gallery-1" role="button" className="btn-gallery mb-2 w-100 d-lg-inline-block d-block">
                        <span id="btnFA"
                              className="btn  btn-outline-danger pt-2 mr-1  px-3 w-100">#{place.category.nameEn}</span>
                      </a>
                    </div>
                    <div className="row text-center">
                      <div className="col">
                        {
                          !!place.isLike ?
                            <IoIosThumbsDown size="2em" className="pointer" onClick={this.changeLikeStatus}/> :
                            <IoIosThumbsUp size="2em" className="pointer" onClick={this.changeLikeStatus}/>
                        }
                      </div>
                      <div className="col">
                        {
                          !!place.isLike ? <IoIosHeartEmpty size="2em" className="pointer"/> :
                            <IoIosHeart size="2em" className="pointer"/>
                        }
                      </div>

                    </div>
                    <div id="instasidebar" className="grid2 runsidebar  text-center">
                      <h6 className="black semibold mx-4 mt-3 mb-2 ">Popular PLaces</h6>
                    </div>
                  </div>
                  <div className="col-xs-12 col-md-11 col-lg-8   single-tour">
                    <div className="row">
                      <div className="col-xs-12 col-md-12 col-lg-12">
                        <h6 className="underline-title">Images</h6>
                        <div className="cardHolder album">
                          {
                            (place.images || [])
                              .map((img, key) =>
                                <div key={key} className="image-link"
                                     onClick={e => this.setState({ isOpen: true, currentIndex: key })}>
                                  <img className="card-grid-popup2" src={`${REACT_APP_PUBLIC_FILES + img}`} alt=""/>
                                </div>
                              )
                          }
                        </div>
                        <div className="m-t-30">
                          <h6 className="underline-title">Map Location</h6>
                          <div className="list-font" style={{ height: "400px" }}>
                            <GoogleMapReact
                              bootstrapURLKeys={{ key: "AIzaSyAOMFAOII_uhdU3GVpRNFDrlvf7CsdC9Z4" }}
                              defaultCenter={{ lat: place.longitude, lng: place.latitude }}
                              defaultZoom={11}
                            />
                          </div>
                        </div>
                        <div className="m-t-30">
                          <h6 className="underline-title">Description</h6>
                          <div className="list-font">{place.description}</div>
                        </div>
                        <div className="m-t-30">
                          <h6 className="underline-title">Comments</h6>
                          {
                            place.comments && place.comments.length ?
                              "there is comments" : "No comments"
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
        }

      </Fragment>
    );
  }
}

PlaceDetails.propTypes = {
  getPlaceById: PropTypes.func.isRequired,
  getPlaceComments: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  place: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired
};


const initMapStateToProps = state => {
  return { place: state.places.place, isAuthenticated: !!state.user.id };
};

export default connect(initMapStateToProps, {
  getPlaceById,
  getPlaceComments,
  CheckPlaceFavStatus,
  CheckPlaceLikeStatus,
  placeLike,
  placeDisLike
})(PlaceDetails);