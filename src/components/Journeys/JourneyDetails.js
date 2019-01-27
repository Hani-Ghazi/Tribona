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
  addOrUpdateComment,
  getJourneySteps
} from "../../actions/Journey";
import {
  openLoginModal
} from "../../actions/Modals";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { PropagateLoader } from "react-spinners";

const { REACT_APP_PUBLIC_FILES } = process.env;

class JourneyDetails extends Component {

  state = {
    isOpen: false,
    currentIndex: 0,
    journey: null
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const { getJourneyComments, getJourneySteps, getJourneyById } = this.props;
    getJourneyById(id)
      .then(async res => {
        // this.setState({ journey: res.payload });
        const temp = await Promise.all([getJourneyComments(id), getJourneySteps(id)]);
        this.setState({
          journey: {
            ...res.payload,
            comments: temp[0],
            steps: temp[1]
          }
        });
      });
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.journey && this.props.journey && nextProps.journey.id && this.props.journey.id && nextProps.journey.id !== this.props.journey.id) {
      const { id } = nextProps.journey;
      const { getJourneyComments, getJourneySteps} = this.props;
      const temp = await Promise.all([getJourneyComments(id), getJourneySteps(id)]);
      this.setState({
        journey: {
          ...nextProps.journey,
          comments: temp[0],
          steps: temp[1]
        }
      });
      // this.setState({ journey: nextProps.journey });
      // this.props.getJourneyComments(id).then(comments => this.setState({
      //   journey: {
      //     ...nextProps.journey,
      //     comments: comments.payload
      //   }
      // }));
    }
  }

  changeLikeStatus = () => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
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
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
    const { ownerName } = this.state.journey;
    this.setState({ journey: { ...this.state.journey, isFollowOwner: isFollowOwner } });
    toast.success(`You successfully ${isFollowOwner ? "followed" : "un followed"} ${ownerName}`, {
      hideProgressBar: true
    });
  };

  changeFavStatus = () => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
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
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
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
    const step = !!(journey || {}).steps ? journey.steps[currentIndex] : null;
    const images = (journey || {}).images || [];
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
                          .slice(0, 10)
                          .filter(x => x.images.length)
                          .map((j, key) =>
                            <span key={key} className="pointer" onClick={() => this.props.getJourneyById(j.id)}>
                              <img src={REACT_APP_PUBLIC_FILES + j.images[0]} alt="" className="test"/>
                            </span>
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
                      <div className={"w-100 text-center"}>
                        <ul className={"steps"}>
                          {
                            journey.steps
                              .map((step, currentIndex) =>
                                <li
                                  key={currentIndex}
                                  onClick={() => this.setState({ currentIndex })}
                                  className={`pointer ${currentIndex === this.state.currentIndex && "active"}`}>{currentIndex + 1}</li>
                              )
                          }
                        </ul>
                      </div>
                      <div className={"step-container"}>
                        {
                          step && <JourneyStep step={step}/>
                        }
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
  journeyToggleFavorite: PropTypes.func.isRequired,
  journeyToggleLike: PropTypes.func.isRequired,
  addOrUpdateComment: PropTypes.func.isRequired,
  getJourneySteps: PropTypes.func.isRequired,
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
  addOrUpdateComment,
  getJourneySteps,
  openLoginModal
})(JourneyDetails);