import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SliderWithScroll from "../sliders/SliderWithScroll";
import { Favorite, Follow, Like, UserWidget, ImagesGallery, PopularAside, DetailedRate, Comments } from "../Partials";
import StarRatings from "react-star-ratings";
import JourneyStep from "./JourneyStep";
import {
  getJourneyById,
  getJourneyComments,
  journeyToggleFavorite,
  journeyToggleLike,
  addOrUpdateComment,
  getJourneySteps,
  deleteComment,
  rateJourney
} from "../../actions/Journey";
import {
  openLoginModal
} from "../../actions/Modals";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import PageLoader from "../Loaders/pageLoader";
import { IoIosCreate } from "react-icons/io";


class JourneyDetails extends Component {

  state = {
    isOpen: false,
    currentIndex: 0,
    journey: null,
    isLoading: true,
    isUpdating: false
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const { getJourneyComments, getJourneySteps, getJourneyById } = this.props;
    getJourneyById(id)
      .then(res => {
        Promise.all([
          getJourneyComments(id),
          getJourneySteps(id)
        ]).then(temp => this.setState({
            journey: {
              ...res.payload,
              comments: temp[0].payload,
              steps: temp[1]
            },
            isLoading: false
          })
        );
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.journey && this.props.journey && nextProps.journey.id && this.props.journey.id && nextProps.journey.id !== this.props.journey.id) {
      const { id } = nextProps.journey;
      const { getJourneyComments, getJourneySteps } = this.props;
      Promise.all([
        getJourneyComments(id),
        getJourneySteps(id)
      ]).then(temp => this.setState({
          journey: {
            ...nextProps.journey,
            comments: temp[0],
            steps: temp[1]
          },
          isLoading: false
        })
      );
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
    const { isAuthenticated, getJourneyComments } = this.props;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
    const { journey } = this.state;
    this.props.addOrUpdateComment({ id: journey.id, text }).then(() => {
      getJourneyComments(journey.id).then(res => this.setState({ journey: { ...journey, comments: res.payload } }));
    });
  };

  onRemoveComment = (commentId) => {
    const { deleteComment, getJourneyComments } = this.props;
    const { journey: { id }, journey } = this.state;
    this.setState({ isUpdating: true });
    deleteComment({ id, commentId })
      .then(() => getJourneyComments(id)
        .then(res => {
            this.setState({ journey: { ...journey, comments: res.payload }, isUpdating: false });
            toast.success(`Comment successfully deleted`, {
              hideProgressBar: true
            });
          }
        ));
  };

  changeRating = newRating => {
    this.setState({ isUpdating: true });
    const { journey: { id } } = this.state;
    this.props.rateJourney(id, newRating)
      .then(() => {
        this.setState({ journey: { ...this.state.journey, myRating: newRating }, isUpdating: false });
      });

  };

  render() {

    const { popularJourneys, isAuthenticated, userId } = this.props;
    const { currentIndex, journey, isLoading, isUpdating } = this.state;
    let step = !!(journey || {}).steps ? journey.steps[currentIndex] : null;

    return (
      <Fragment>
        {
          (isLoading || isUpdating) && <PageLoader/>
        }
        {
          !isLoading &&
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
                          changeRating={this.changeRating}
                          numberOfStars={5}
                          name='rating'
                          rating={journey.myRating || 0}
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
                      {
                        isAuthenticated && userId === journey.ownerId &&
                        <div className="col align-self-md-center">
                          <IoIosCreate size="2em" className="pointer"
                                       onClick={() => this.props.history.push(`edit/${journey.id}`)}/>
                        </div>
                      }
                    </div>
                    <div id="instasidebar" className="grid2 runsidebar  text-center">
                      <h6 className="black semibold mx-4 mt-3 mb-2 underline-title">Popular Journeys</h6>
                      <PopularAside list={popularJourneys} action={this.props.getJourneyById}/>
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
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-6 order-7 order-lg-7">
                        <p className="grey text-center">Location<br/><span className="black bold">Netherlands</span></p>
                      </div>
                    </div>
                    <div className="tour-schedule">
                      <h6 className="underline-title">Images</h6>
                      <ImagesGallery images={journey.images}/>
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
                      <h6 className={"black bold mt-4 mb-3 underline-title"}>Journey Review Details</h6>
                      <DetailedRate ratings={journey.ratings} ratingsAvg={journey.ratingsAvg}/>
                      <h6 className={"black bold mt-4 mb-3 underline-title"}>Comments</h6>
                      <Comments comments={journey.comments || []} onAdd={this.onComment}
                                onRemove={this.onRemoveComment}/>
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


JourneyDetails.propTypes = {
  getJourneyById: PropTypes.func.isRequired,
  getJourneyComments: PropTypes.func.isRequired,
  journeyToggleFavorite: PropTypes.func.isRequired,
  journeyToggleLike: PropTypes.func.isRequired,
  addOrUpdateComment: PropTypes.func.isRequired,
  getJourneySteps: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  rateJourney: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  journey: PropTypes.object,
  popularJourneys: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired,
  userId: PropTypes.string
};

const initMapStateToProps = state => {
  return {
    journey: state.journeys.journey,
    popularJourneys: state.journeys.popular,
    isAuthenticated: !!state.user.id,
    userId: state.user.id
  };
};

export default connect(initMapStateToProps, {
  getJourneyById,
  getJourneyComments,
  journeyToggleFavorite,
  journeyToggleLike,
  addOrUpdateComment,
  getJourneySteps,
  openLoginModal,
  deleteComment,
  rateJourney
})(JourneyDetails);