import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SliderWithScroll from "../sliders/SliderWithScroll";
import PropTypes from "prop-types";
import ActionLoader from "../Loaders/actionLoader";

import {
  openLoginModal,
  openStepsDrawer
} from "../../actions/Modals";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import constants from "../../constans";
import moment from "moment";
import {
  getTripById,
  getTripsComments,
  getTripSteps,
  addOrUpdateComment,
  rateTrip,
  tripToggleFavorite,
  tripToggleLike,
  deleteComment
} from "../../actions/Trips";
import { Favorite, Follow, Like, DetailedRate, Comments } from "../Partials";
import { toast } from "react-toastify";
import PageLoader from "../Loaders/pageLoader";
import StarRatings from "react-star-ratings";

const { REACT_APP_PUBLIC_FILES } = process.env;

class TripDetails extends Component {
  state = {
    isLoading: true,
    isUpdating: false
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const { getTripById, getTripsComments, getTripSteps } = this.props;
    getTripById(id)
      .then(res => {
        Promise.all([
          getTripsComments(id),
          getTripSteps(id)
        ])
          .then(temp => {
            this.setState({
              trip: {
                ...res.payload,
                comments: temp[0].payload,
                steps: temp[1]
              },
              isLoading: false
            });
          });
      });
  }

  diffAsDays = () => {
    const { trip } = this.state;
    return moment(trip.endDate).diff(moment(trip.startDate), "days") + 1;
  };


  hasSocial = () => {
    const { trip } = this.state;
    return (
      trip.ownerTwitterURL ||
      trip.ownerFacebookURL ||
      trip.ownerGoogleURL ||
      trip.ownerLinkedInURL ||
      trip.ownerInstagramURL ||
      trip.ownerWhatsApp ||
      trip.ownerViber
    );
  };

  onSelectStep = () => {
    const { trip: { steps } } = this.state;
    this.props.openStepsDrawer({ steps });
  };

  onComment = (text) => {
    const { isAuthenticated, getTripsComments } = this.props;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
    const { trip } = this.state;
    this.setState({ isUpdating: true });
    this.props.addOrUpdateComment({ id: trip.id, text }).then(() => {
      getTripsComments(trip.id).then(res => this.setState({
        trip: { ...trip, comments: res.payload },
        isUpdating: false
      }));
    });
  };

  changeLikeStatus = () => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
    const { isLiked, id } = this.state.trip;
    this.setState({ isUpdating: true });
    this.props.tripToggleLike({ id, isLiked }).then(() => {
      this.setState({
        trip: {
          ...this.state.trip,
          isLiked: !isLiked
        },
        isUpdating: false
      });
      toast.success(`You successfully ${isLiked ? "unlike" : "like"} this trip`, {
        hideProgressBar: true
      });
    });
  };

  changeFollowStatus = (isFollowOwner) => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
    const { ownerName } = this.state.trip;
    this.setState({ isUpdating: true });

    this.setState({ trip: { ...this.state.trip, isFollowOwner: isFollowOwner }, isUpdating: false });
    toast.success(`You successfully ${isFollowOwner ? "followed" : "un followed"} ${ownerName}`, {
      hideProgressBar: true
    });
  };

  changeFavStatus = () => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
    const { isFavorite, id } = this.state.trip;
    this.setState({ isUpdating: true });
    this.props.tripToggleFavorite({ id, isFavorite })
      .then(() => {
        this.setState({ trip: { ...this.state.trip, isFavorite: !isFavorite }, isUpdating: false });
        toast.success(`You successfully ${isFavorite ? "add to" : "remove from"} your favorites`, {
          hideProgressBar: true
        });
      });
  };

  onRemoveComment = (commentId) => {
    const { deleteComment, getTripsComments } = this.props;
    const { trip: { id }, trip } = this.state;
    this.setState({ isUpdating: true });
    deleteComment({ id, commentId })
      .then(() => getTripsComments(id)
        .then(res => {
            this.setState({ trip: { ...trip, comments: res.payload }, isUpdating: false });
            toast.success(`Comment successfully deleted`, {
              hideProgressBar: true
            });
          }
        ));
  };

  changeRating = newRating => {
    this.setState({ isUpdating: true });
    const { trip: { id } } = this.state;
    this.setState({ isUpdating: true });
    this.props.rateTrip(id, newRating)
      .then(() => {
        this.setState({ trip: { ...this.state.trip, myRating: newRating }, isUpdating: false });
      });
  };

  render() {
    const { isLoading, isUpdating, trip } = this.state;
    const { isAuthenticated, userId } = this.props;
    return (
      <Fragment>
        {
          isLoading && <PageLoader/>
        }
        {
          isUpdating &&
          <ActionLoader/>
        }
        {
          !isLoading &&
          <Fragment>
            <SliderWithScroll slide={trip}/>
            <section id="section3" className="tour-list-sidebar tour-list-sidebar-2-col">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xs-12 col-md-6 col-lg-3 ml-lg-5 ml-sm-3 order-lg-first order-last mt-3 mt-lg-0">
                    <div className="form-container px-3 py-3">

                      <h4 className="black bold mt-3 px-4 pb-2 text-center">Book this tour</h4>

                      <form id="sidebar-form" className="px-xl-3 px-lg-3 px-3">

                        <div className="form-group">
                          <label className="" htmlFor="inputname">Your Name</label>
                          <input type="text" className="form-control" id="inputname" placeholder="John Doe"/>
                        </div>

                        <div className="form-group">
                          <label className="" htmlFor="inputmail">Email Adress</label>
                          <input type="text" className="form-control" id="inputmail" placeholder="johndoe@gmail.com"/>
                        </div>
                        <div className="form-group">
                          <label className="text-center" htmlFor="inputtours">Tour Interested In</label>
                          <input type="text" className="form-control" id="inputtours"
                                 placeholder="Mystical Machu Picchu"/>
                        </div>
                        <div className="form-group departure">
                          <label className="" htmlFor="datepicker">Departure Date</label>
                          <div className="input-group">
                            <input type="text" id="datepicker" placeholder="Choose your Date" className="form-control"/>
                            <div className="input-group-append">
                              <div className="input-group-text"><i className="fas fa-calendar"/></div>
                            </div>
                          </div>

                        </div>
                        <div className="form-group row">
                          <div className="col-sm-12">
                            <button type="submit" className="btn col-sm-12 my-2 btn-primary">Book Now</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-xs-12 col-md-12 col-lg-8 single-tour">
                    <h4 id="read-tour" className="black text-left mb-3  bold">{trip.name}
                      <span className="btn btn-outline-danger pt-2 px-3 float-right"
                            onClick={() => this.onSelectStep()}>See Steps <FaMapMarkerAlt/></span></h4>
                    <div className="row">
                      <div className="col-lg-9 col-sm-6 col-12 text-left">
                        <h6 className="primary-color semibold price-big">${trip.price}<span
                          className="semibold subtitle">&nbsp;/ {trip.type}</span>
                        </h6>
                      </div>
                      <div className="col-sm-6 col-lg-3 text-left ml-sm-0">
                        <div className="row text-center">
                          <div className="col align-self-md-center">
                            <Like isLike={!!trip.isLiked} onChange={this.changeLikeStatus}/>
                          </div>
                          <div className="col align-self-md-center">
                            <Favorite isFav={!!trip.isFavorite} onChange={this.changeFavStatus}/>
                          </div>
                          <div className="col align-self-md-center">
                            <Follow isFollowOwner={!!trip.isFollowOwner} userId={trip.ownerId}
                                    cb={this.changeFollowStatus}/>
                          </div>
                          {
                            isAuthenticated && userId === trip.ownerId &&
                            <div className="col align-self-md-center">
                              <IoIosCreate
                                size="2em"
                                className="pointer"
                                onClick={() => this.props.history.push(`edit/${trip.id}`)}/>
                            </div>
                          }
                        </div>
                      </div>
                      <div className="separator-tour"/>
                      <div className="row">
                        <div className="col-lg-4 col-6 order-2 order-lg-2">
                          <img className="svgcenter mt-2 mb-2 duration-icon"
                               src={require("../../assets/svgs/duration.svg")} alt=""/>
                        </div>
                        <div className="col-lg-4 col-6 order-5 order-lg-3">
                          <img className="svgcenter mb-2 location-icon" src={require("../../assets/svgs/location.svg")}
                               alt=""/>
                        </div>
                        <div className="col-lg-4 col-6 order-6 order-lg-4">
                          <img className="svgcenter mt-3 mb-2 calendar-icon"
                               src={require("../../assets/svgs/calendar.svg")} alt=""/>
                        </div>
                        <div className="col-lg-4 col-6 order-4 order-lg-6">
                          <p className="grey text-center">Duration<br/><span
                            className="black bold">{this.diffAsDays()} Days</span></p>
                        </div>
                        <div className="col-lg-4 col-6 order-7 order-lg-7">
                          <p className="grey text-center">Location<br/><span className="black bold">Netherlands</span>
                          </p>
                        </div>
                        <div className="col-lg-4 col-6 order-8 order-lg-8">
                          <p className="grey text-center mx-2">Dates<br/><span className="black bold">May, August, September, October</span>
                          </p>
                        </div>
                      </div>
                      <div className="separator-tour"/>
                      <ul className="single-tour-container w-100">
                        <li>
                          <div className="tour-item-title list-font">Company</div>
                          <div className="tour-item-description list-font">
                            <div className={"dis-block"}>{trip.ownerName}</div>
                            {trip.ownerImage &&
                            <img src={REACT_APP_PUBLIC_FILES + trip.ownerImage} alt=""
                                 className={"dis-block company-logo"}/>
                            }
                          </div>
                        </li>
                        {trip.ownerWebsite &&
                        <li>
                          <div className="tour-item-title list-font">Company Website</div>
                          <div className="tour-item-description list-font">
                            <div className={"dis-block"}>{trip.ownerWebsite}</div>
                          </div>
                        </li>
                        }
                        {trip.ownerContactEmail &&
                        <li>
                          <div className="tour-item-title list-font">Company Email</div>
                          <div className="tour-item-description list-font">
                            <a className={"dis-block"}
                               href={`mailto:${trip.ownerContactEmail}`}>{trip.ownerContactEmail}</a>
                          </div>
                        </li>
                        }
                        {this.hasSocial() &&
                        <li>
                          <div className="tour-item-title list-font">Company Social</div>
                          <div className="tour-item-description list-font">
                            <div className={"white-popup"} id={"test-popup"}>
                              {trip.ownerFacebookURL &&
                              <a href={trip.ownerFacebookURL} target="_blank">
                                <i className="fab fa-facebook-f"/>
                              </a>
                              }
                              {!trip.ownerGoogleURL &&
                              <a href={trip.ownerGoogleURL} target="_blank">
                                <i className="fab fa-google-plus-g"/>
                              </a>
                              }
                              {trip.ownerTwitterURL &&
                              <a href={trip.ownerTwitterURL} target="_blank">
                                <i className="fab fa-twitter"/>
                              </a>
                              }
                              {trip.ownerLinkedInURL &&
                              <a href={trip.ownerLinkedInURL} target="_blank">
                                <i className="fab fa-linkedin"/>
                              </a>
                              }
                              {trip.ownerInstagramURL &&
                              <a href={trip.ownerInstagramURL} target="_blank">
                                <i className="fab fa-instagram"/>
                              </a>
                              }
                              {trip.ownerWhatsApp &&
                              <a href={trip.ownerWhatsApp} target="_blank">
                                <i className="fab fa-whatsapp"/>
                              </a>
                              }
                              {trip.ownerViber &&
                              <a href={trip.ownerViber} target="_blank">
                                <i className="fab fa-viber"/>
                              </a>
                              }
                            </div>
                          </div>
                        </li>
                        }
                        <li>
                          <div className="tour-item-title list-font">Rate the Company</div>
                          <div className="tour-item-description list-font">
                            <StarRatings
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              name='rating'
                              rating={trip.myRating || 0}
                              starRatedColor="#f2b01e"
                              starDimension="40px"
                              starSpacing="8px"
                            />
                          </div>
                        </li>
                        {
                          trip.capacity &&
                          <li>
                            <div className="tour-item-title list-font">Trip Capacity</div>
                            <div className="tour-item-description list-font">{trip.capacity}</div>
                          </li>
                        }
                        {
                          trip.startDate &&
                          <li>
                            <div className="tour-item-title list-font">Trip Start Date</div>
                            <div className="tour-item-description list-font">{moment(trip.startDate).format("ll")}</div>
                          </li>
                        }
                        {
                          trip.endDate &&
                          <li>
                            <div className="tour-item-title list-font">Trip Start Date</div>
                            <div className="tour-item-description list-font">{moment(trip.endDate).format("ll")}</div>
                          </li>
                        }
                      </ul>
                      <div className={"w-100"}>
                        <div className="tour-schedule">
                          <h6 className={"black bold mt-4 mb-3 underline-title"}>Trip Review Details</h6>
                          <DetailedRate ratings={trip.ratings} ratingsAvg={trip.ratingsAvg}/>
                          <h6 className={"black bold mt-4 mb-3 underline-title"}>Comments</h6>
                          <Comments comments={trip.comments || []} onAdd={this.onComment}
                                    onRemove={this.onRemoveComment}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Fragment>
        }

      </Fragment>
    );
  }
}

TripDetails.propTypes = {
  getTripById: PropTypes.func.isRequired,
  getTripsComments: PropTypes.func.isRequired,
  getTripSteps: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  openStepsDrawer: PropTypes.func.isRequired,
  addOrUpdateComment: PropTypes.func.isRequired,
  rateTrip: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  tripToggleFavorite: PropTypes.func.isRequired,
  tripToggleLike: PropTypes.func.isRequired
};


const initMapStateToProps = state => {
  return {
    trip: state.trips.trip,
    isAuthenticated: !!state.user.id,
    userId: state.user.id
  };
};

export default connect(initMapStateToProps, {
  getTripById,
  getTripsComments,
  getTripSteps,
  openLoginModal,
  openStepsDrawer,
  addOrUpdateComment,
  rateTrip,
  deleteComment,
  tripToggleFavorite,
  tripToggleLike
})(TripDetails);