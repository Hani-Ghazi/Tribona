import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SliderWithScroll from "../sliders/SliderWithScroll";
import { Favorite, Follow, Like, UserWidget } from "../Partials";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import JourneyStep from "./JourneyStep";
import {
  getJourneyById,
  getJourneyComments,
  journeyToggleFavorite,
  journeyToggleLike,
  addOrUpdateComment
} from "../../actions/Journey";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { PropagateLoader } from "react-spinners";

import "../../assets/iconfont.css";
import "../../assets/index.css";
import Steps from "rc-steps";


const { REACT_APP_PUBLIC_FILES } = process.env;

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fe7013",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#fe7013",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#fe7013",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013"
};

const labels = ["Cart", "Delivery Address", "Order Summary", "Payment Method", "Track"];


class JourneyDetails extends Component {

  state = {
    isOpen: false,
    currentIndex: 0,
    journey: null
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getJourneyById(id).then(() => {
      this.setState({ journey: this.props.journey });
      this.props.getJourneyComments(id).then(res => this.setState({
        journey: {
          ...this.props.journey,
          comments: res.payload
        }
      }));
    });
  }

  changeLikeStatus = () => {
    const { isLiked, id } = this.state.journey;
    this.props.journeyToggleLike({ id, isLiked }).then(() => {
      this.setState({
        journey: {
          ...this.state.journey,
          isLiked: !isLiked
        }
      });
      toast.success(`You successfully ${isLiked ? "unlike" : "like"} this journey`, {
        hideProgressBar: true
      });
    });
  };

  changeFollowStatus = (isFollowOwner) => {
    const { ownerName } = this.state.journey;
    this.setState({ journey: { ...this.state.journey, isFollowOwner: isFollowOwner } });
    toast.success(`You successfully ${isFollowOwner ? "followed" : "un followed"} ${ownerName}`, {
      hideProgressBar: true
    });
  };

  changeFavStatus = () => {
    const { isFavorite, id } = this.state.journey;
    this.props.journeyToggleFavorite({ id, isFavorite })
      .then(() => {
        this.setState({ journey: { ...this.state.journey, isFavorite: !isFavorite } });
        toast.success(`You successfully ${isFavorite ? "add to" : "remove from"} your favorites`, {
          hideProgressBar: true
        });
      });
  };

  onComment = (text) => {
    const { journey } = this.state;
    this.props.addOrUpdateComment({ id: journey.id, text }).then(() => {
      this.setState({
        journey: {
          ...journey,
          comments: [...journey.comments]
        }
      });
    });
  };

  render() {

    const { popularJourneys } = this.props;
    const { isOpen, currentIndex, journey } = this.state;
    const images = (journey || {}).images || [];
    const steps =
      [
        { name: "Step 1", component: <JourneyStep step={{}}/> },
        { name: "Step 2", component: <JourneyStep step={{}}/> },
        { name: "Step 3", component: <JourneyStep step={{}}/> },
        { name: "Step 4", component: <JourneyStep step={{}}/> },
        { name: "Step 5", component: <JourneyStep step={{}}/> }
      ];
    return (
      <Fragment>
        {
          !journey && <PropagateLoader/>
        }
        {
          journey &&
          <Fragment>
            <SliderWithScroll slide={journey}/>
            <section id="section3" className="tour-list-sidebar tour-list-sidebar-2-col">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xs-12 col-md-6 col-lg-3 ml-lg-5 mt-5 mt-lg-0 mx-auto my-3">
                    <UserWidget user={journey}/>
                    <div className="row">
                      <div className="col text-center">
                        <StarRatings
                          rating={journey.ratingsAvg || 0}
                          starRatedColor="#f2b01e"
                          starDimension="40px"
                          starSpacing="8px"
                        />
                      </div>
                    </div>
                    <div className="row text-center">
                      <div className="col align-self-md-center">
                        <Like isLike={!!journey.isLiked} onChange={this.changeLikeStatus}/>
                      </div>
                      <div className="col align-self-md-center">
                        <Favorite isFav={!!journey.isFavorite} onChange={this.changeFavStatus}/>
                      </div>
                      <div className="col align-self-md-center">
                        <Follow isFollowOwner={!!journey.isFollowOwner} userId={journey.ownerId}
                                cb={this.changeFollowStatus}/>
                      </div>
                    </div>
                    <div id="instasidebar" className="grid2 runsidebar  text-center">
                      <h6 className="black semibold mx-4 mt-3 mb-2 underline-title">Popular Journeys</h6>
                      {
                        (popularJourneys || [])
                          .filter(x => x.images.length)
                          .map((j, key) =>
                            <div key={key} className="col-xs-12 col-md-6 col-lg-6 mb-1 mt-1"
                                 style={{ display: "inline-flex" }}>
                              <Link className="" to={`journeys/${j.id}`}>
                                <img src={REACT_APP_PUBLIC_FILES + j.images[0]} alt=""
                                     className="img-fluid img-border test"/>
                              </Link>
                            </div>
                          )
                      }
                    </div>
                  </div>
                  <div className="col-xs-12 col-md-12 col-lg-8   single-tour">
                    <h4 id="read-tour" className="black text-left mb-3  bold">{journey.name}</h4>
                    <div className="separator-tour"/>
                    <div className="row">
                      <div className="col-lg-3 col-6 order-5 order-lg-3">
                        <img className="svgcenter mb-2 location-icon" src={require("../../assets/svgs/location.svg")}
                             alt=""/>
                      </div>
                      <div className="col-lg-3 col-6 order-6 order-lg-4">
                        <img className="svgcenter mt-3 mb-2 calendar-icon"
                             src={require("../../assets/svgs/calendar.svg")}
                             alt=""/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-6 order-7 order-lg-7">
                        <p className="grey text-center">Location<br/><span className="black bold">Netherlands</span></p>
                      </div>
                      <div className="col-lg-3 col-6 order-8 order-lg-8">
                        <p className="grey text-center mx-2">Dates<br/><span className="black bold">May, August, September, October</span>
                        </p>
                      </div>
                    </div>
                    <div className="tour-schedule">
                      <h6 className="black bold mt-4 mb-3 underline-title">Description</h6>
                      <p>{journey.description}</p>
                      <h6 className="black bold mt-4 mb-3 underline-title">Steps</h6>
                      <div className='step-progress'>
                        <Steps current={currentIndex}>
                          <Steps.Step />
                          <Steps.Step />
                          <Steps.Step onClick={() => this.setState({
                            currentIndex: 2
                          })} />
                          <Steps.Step />
                          <Steps.Step />
                          <Steps.Step />
                          <Steps.Step />
                        </Steps>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>
          </Fragment>
        }
      </Fragment>);
  }
}


JourneyDetails.propTypes = {
  getJourneyById: PropTypes.func.isRequired,
  getJourneyComments: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  journey: PropTypes.object,
  popularJourneys: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired
};

const initMapStateToProps = state => {
  return { journey: state.journeys.journey, popularJourneys: state.journeys.popular, isAuthenticated: !!state.user.id };
};

export default connect(initMapStateToProps, {
  getJourneyById,
  getJourneyComments,
  journeyToggleFavorite,
  journeyToggleLike,
  addOrUpdateComment
})(JourneyDetails);