import React, { Component, Fragment } from "react";
import StarRatings from "react-star-ratings";
import SliderWithScroll from "../sliders/SliderWithScroll";
import PropTypes from "prop-types";
import moment from "moment";
import TripStep from "./TripStep";

import { connect } from "react-redux";
import { ActionLoader, PageLoader } from "../Loaders";
import {
  openLoginModal,
  openStepsDrawer
} from "../../actions/Modals";
import { FaMapMarkerAlt, FaPlaneDeparture } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import {
  getTripById,
  getTripsComments,
  getTripSteps,
  addOrUpdateComment,
  rateTrip,
  tripToggleFavorite,
  tripToggleLike,
  deleteComment,
  booking
} from "../../actions/Trips";
import { Favorite, Follow, Like, DetailedRate, Comments, PopularAside } from "../Partials";
import { toast } from "react-toastify";
import { scrollToTop } from "../../utils";
import BookModal from "./BookTripModal";

const { REACT_APP_PUBLIC_FILES } = process.env;
const { trips: { types } } = require("../../constants");


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
            }, scrollToTop);
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
    this.props.openStepsDrawer({ steps, StopComponent: TripStep });
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

  onBook = (data) => {
    const { booking } = this.props;
    const { trip } = this.state;
    this.setState({ isUpdating: true });
    booking({ ...data, id: trip.id }).then(() => {
      toast.success("You booked successfully!", {
        hideProgressBar: true
      });
      this.setState({ isUpdating: false, isBookModalOpen: false });
    });
  };

  render() {
    const { isLoading, isUpdating, trip } = this.state;
    const { isAuthenticated, userId, popularTrips } = this.props;
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
                    <div id="instasidebar" className="grid2 runsidebar  text-center">
                      <h6 className="black semibold mx-4 mb-2 underline-title">Popular Trips</h6>
                      <PopularAside list={popularTrips} action={console.log}/>
                    </div>
                  </div>

                  <div className="col-xs-12 col-md-12 col-lg-8 single-tour">
                    <h4 id="read-tour" className="black text-left mb-3  bold">{trip.name}
                      <span className="btn btn-outline-danger pt-2 px-3 float-right"
                            onClick={() => this.onSelectStep()}>See Steps <FaMapMarkerAlt/></span>
                      <span className="btn btn-outline-danger pt-2 px-3 m-r-10 float-right"
                            onClick={() => this.setState({ isBookModalOpen: true })}>Book <FaPlaneDeparture/></span>
                    </h4>
                    <div className="row">
                      <div className="col-lg-8 col-sm-6 col-12 text-left">
                        <h6 className="primary-color semibold price-big">${trip.price}
                          {
                            types.all.includes(trip.type) &&
                            <span className="semibold subtitle">&nbsp;/ {types[trip.type]}</span>
                          }
                        </h6>
                      </div>
                      <div className="col-sm-6 col-lg-4 text-left ml-sm-0">
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
            <BookModal
              isOpen={!!this.state.isBookModalOpen} trip={trip}
              onClose={() => this.setState({ isBookModalOpen: false })}
              onBook={this.onBook}/>
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
  tripToggleLike: PropTypes.func.isRequired,
  booking: PropTypes.func.isRequired
};


const initMapStateToProps = state => {
  return {
    trip: state.trips.trip,
    isAuthenticated: !!state.user.id,
    userId: state.user.id,
    popularTrips: state.trips.popular
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
  tripToggleLike,
  booking
})(TripDetails);