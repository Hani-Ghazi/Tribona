import React, { Component, Fragment } from "react";
import SliderWithScroll from "../sliders/SliderWithScroll";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import StarRatings from "react-star-ratings";

import {
  getPlaceById,
  getPlaceComments,
  placeToggleLike,
  placeToggleFavorite,
  addOrUpdateComment
} from "../../actions/Places";
import PropTypes from "prop-types";
import { PropagateLoader } from "react-spinners";
import "react-image-lightbox/style.css";
import GoogleMapReact from "google-map-react";
import { Favorite, Comments, Like, Follow, UserWidget, DetailedRate } from "../Partials";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


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
      this.setState({ place: this.props.place });
      this.props.getPlaceComments(id).then(comments => this.setState({
        place: {
          ...this.props.place,
          comments: comments.payload
        }
      }));
    });
  }

  changeLikeStatus = () => {
    const { isLiked, id } = this.state.place;
    this.props.placeToggleLike({ id, isLiked }).then(() => {
      this.setState({
        place: {
          ...this.state.place,
          isLiked: !isLiked
        }
      });
      toast.success(`You successfully ${isLiked ? "unlike" : "like"} this place`, {
        hideProgressBar: true
      });
    });
  };

  changeFollowStatus = (isFollowOwner) => {
    const { ownerName } = this.state.place;
    this.setState({ place: { ...this.state.place, isFollowOwner: isFollowOwner } });
    toast.success(`You successfully ${isFollowOwner ? "followed" : "un followed"} ${ownerName}`, {
      hideProgressBar: true
    });
  };

  changeFavStatus = () => {
    const { isFavorite, id } = this.state.place;
    this.props.placeToggleFavorite({ id, isFavorite })
      .then(() => {
        this.setState({ place: { ...this.state.place, isFavorite: !isFavorite } });
        toast.success(`You successfully ${isFavorite ? "add to" : "remove from"} your favorites`, {
          hideProgressBar: true
        });
      });
  };

  onComment = (text) => {
    const { place } = this.state;
    this.props.addOrUpdateComment({ id: place.id, text }).then(() => {
      this.setState({
        place: {
          ...place,
          comments: [...place.comments]
        }
      });
    });
  };

  render() {
    const { popularPlaces } = this.props;
    const { isOpen, currentIndex, place } = this.state;
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
                  <div className="col-xs-12 col-md-6 col-lg-3 ml-lg-5 mt-5 mt-lg-0 mx-auto my-3">
                    {/*<userWidget user={place}/>*/}
                    <UserWidget user={place}/>
                    <div className="mb-lg-3 mb-4  text-center">
                      <Link to={"/places"} role="button" className="btn-gallery mb-2 w-100 d-lg-inline-block d-block">
                        <span id="btnFA"
                              className="btn  btn-outline-danger pt-2 mr-1  px-3 w-100">#{place.category.nameEn}</span>
                      </Link>
                    </div>
                    <div className="row">
                      <div className="col text-center">
                        <StarRatings
                          rating={place.ratingsAvg || 0}
                          starRatedColor="#f2b01e"
                          starDimension="40px"
                          starSpacing="8px"
                        />
                      </div>
                    </div>
                    <div className="row text-center">
                      <div className="col align-self-md-center">
                        <Like isLike={!!place.isLiked} onChange={this.changeLikeStatus}/>
                      </div>
                      <div className="col align-self-md-center">
                        <Favorite isFav={!!place.isFavorite} onChange={this.changeFavStatus}/>
                      </div>
                      <div className="col align-self-md-center">
                        <Follow isFollowOwner={!!place.isFollowOwner} userId={place.ownerId}
                                cb={this.changeFollowStatus}/>
                      </div>
                    </div>
                    <div id="instasidebar" className="grid2 runsidebar  text-center">
                      <h6 className="black semibold mx-4 mt-3 mb-2 underline-title">Popular PLaces</h6>
                      {
                        (popularPlaces || [])
                          .map((p, key) =>
                            <Link key={key} className="grid-item2" to={`places/${p.id}`}>
                              <img src={REACT_APP_PUBLIC_FILES + p.images[0]} alt=""/>
                            </Link>
                          )
                      }
                    </div>
                  </div>
                  <div className="col-xs-12 col-md-11 col-lg-8 single-tour">
                    <div className="row">
                      <div className="col-xs-12 col-md-12 col-lg-12">
                        <h6 className="underline-title">Images</h6>
                        <div className="cardHolder album">
                          {
                            (place.images || [])
                              .map((img, key) =>
                                <div key={key} className="image-link"
                                     onClick={() => this.setState({ isOpen: true, currentIndex: key })}>
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
                          {place.description}
                        </div>
                        <div className="m-t-30">
                          <h6 className="underline-title">Review Details</h6>
                          <DetailedRate ratings={place.ratings} ratingsAvg={place.ratingsAvg}/>
                        </div>
                        <div className="m-t-30">
                          <h6 className="underline-title m-b-0">Comments</h6>
                          <Comments comments={place.comments || []} onAdd={this.onComment}/>

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
  popularPlaces: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired
};


const initMapStateToProps = state => {
  return {
    place: state.places.place,
    isAuthenticated: !!state.user.id,
    popularPlaces: state.places.popular
  };
};

export default connect(initMapStateToProps, {
  getPlaceById,
  getPlaceComments,
  placeToggleLike,
  placeToggleFavorite,
  addOrUpdateComment
})(PlaceDetails);