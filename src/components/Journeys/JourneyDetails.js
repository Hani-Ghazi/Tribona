import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";
import JourneyStep from "./JourneyStep";
import {connect} from "react-redux";
import SliderWithScroll from "../sliders/SliderWithScroll";
import PageLoader from "../Loaders/pageLoader";
import ActionLoader from "../Loaders/actionLoader";
import {Comments, DetailedRate, Favorite, Follow, ImagesGallery, Like, PopularAside, UserWidget} from "../Partials";
import {
    addOrUpdateComment,
    deleteComment,
    getJourneyById,
    getJourneyComments,
    getJourneySteps,
    journeyToggleFavorite,
    journeyToggleLike,
    rateJourney
} from "../../actions/Journey";
import {openLoginModal, openStepsDrawer} from "../../actions/Modals";
import {finishedLoading, finishedUpdating, startUpdating} from "../../actions/Loaders";
import {toast} from "react-toastify";
import {IoIosCreate} from "react-icons/io";
import {FaMapMarkerAlt} from "react-icons/fa";

import ReactMapboxGl, {Feature, Layer, Popup} from "react-mapbox-gl";
import styled from "styled-components";
import moment from "moment";


const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoibWVtbzk1IiwiYSI6ImNqcTZnbDViZjI3d2c0Mm11aWxnM3Bod2EifQ.RB17uMbr73RZINXqtK2A0g"
});

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

const lineLayout = {
    'line-cap': 'round',
    'line-join': 'round'
};

const linePaint = {
    'line-color': '#8363a5',
    'line-width': 4
};


class JourneyDetails extends Component {

    center_latitude = 39.882533979173;
    center_longitude = 32.866045119695286;
    points_road = [];
    
    place = null;

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

    onToggleHover(cursor, {map}) {
        map.getCanvas().style.cursor = cursor;
    }


    markerClick = (place, {feature}) => {
        this.place = place;
        this.setState({
            // center: feature.geometry.coordinates,
            // zoom: [14],
        });
    };

    onDrag = () => {
        if (this.place) {
            this.place = null;
            this.setState({
                // center: feature.geometry.coordinates,
                // zoom: ,
            });
        }
    };

  componentWillReceiveProps(nextProps) {
    if (nextProps.journey && this.props.journey && nextProps.journey.id && this.props.journey.id && nextProps.journey.id !== this.props.journey.id) {
      const { id } = nextProps.journey;
      const { getJourneyComments, getJourneySteps } = this.props;
      this.setState({ isLoading: true });
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
    this.setState({ isUpdating: true });
    this.props.journeyToggleLike({ id, isLiked }).then(() => {
      this.setState({
        journey: {
          ...this.state.journey,
          isLiked: !isLiked
        },
        isUpdating: false
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
    this.setState({ isUpdating: true });

    this.setState({ journey: { ...this.state.journey, isFollowOwner: isFollowOwner }, isUpdating: false });
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
    this.setState({ isUpdating: true });
    this.props.journeyToggleFavorite({ id, isFavorite })
      .then(() => {
        this.setState({ journey: { ...this.state.journey, isFavorite: !isFavorite }, isUpdating: false });
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
    this.setState({ isUpdating: true });
    this.props.addOrUpdateComment({ id: journey.id, text }).then(() => {
      getJourneyComments(journey.id).then(res => this.setState({
        journey: { ...journey, comments: res.payload },
        isUpdating: false
      }));
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
    this.setState({ isUpdating: true });
    this.props.rateJourney(id, newRating)
      .then(() => {
        this.setState({ journey: { ...this.state.journey, myRating: newRating }, isUpdating: false });
      });
  };

  onSelectStep = () => {
    const { journey: { steps } } = this.state;
    this.props.openStepsDrawer({ steps, StopComponent: JourneyStep });
  };

  render() {

    const { popularJourneys, isAuthenticated, userId } = this.props;
    const { currentIndex, journey, isLoading, isUpdating, isOpen } = this.state;
    console.log(journey);
    let step = !!(journey || {}).steps ? journey.steps[currentIndex] : null;

    return (
      <Fragment>
          {(
              this.points_road = []
          )}
        {
          isLoading && <PageLoader/>
        }
        {
          isUpdating && <ActionLoader/>
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
                          <IoIosCreate
                            size="2em"
                            className="pointer"
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
                    <h4 id="read-tour" className="black text-left mb-3 flex-sb-m bold">
                      {journey.name} <a role="button" className="d-lg-inline-block d-block pointer"
                                        onClick={() => this.onSelectStep()}>
                      <span className="btn btn-outline-danger pt-2 px-3 ">See Steps <FaMapMarkerAlt/></span>
                    </a>
                    </h4>
                    <div className="tour-schedule">
                      {
                        !!journey.images.length &&
                        <Fragment>
                          <h6 className="underline-title">Images</h6>
                          <ImagesGallery images={journey.images}/>
                        </Fragment>
                      }
                      {
                        journey.description &&
                        <Fragment>
                          <h6 className="black bold mt-4 mb-3 underline-title">Description</h6>
                            <p>{journey.description}</p>
                        </Fragment>
                      }

                        {
                            <Fragment>
                                <h6 className="black bold mt-4 mb-3 underline-title">Steps on Map</h6>
                                <div className="">
                                    <Map
                                        style="mapbox://styles/mapbox/streets-v8"
                                        center={[this.center_longitude, this.center_latitude]}
                                        zoom={[4]}
                                        onDrag={this.onDrag}
                                        containerStyle={{
                                            height: "75vh",
                                            width: "97%",
                                        }}>
                                        {(journey.steps || []).filter(x => x.place.latitude && x.place.longitude).map(step =>
                                            this.points_road.push([step.place.longitude, step.place.latitude])
                                        )}
                                        <Layer type="line" layout={lineLayout} paint={linePaint}>
                                            <Feature coordinates={this.points_road} />
                                        </Layer>
                                        <Layer
                                            type="symbol"
                                            id="marker"
                                            layout={{"icon-image": "bus-15"}}>
                                            {(journey.steps || []).filter(x => x.place.latitude && x.place.longitude).map(step =>
                                            <Feature
                                            key={step.id}
                                            onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                                            onMouseLeave={this.onToggleHover.bind(this, '')}
                                            onClick={this.markerClick.bind(this, step)}
                                            coordinates={[step.place.longitude, step.place.latitude]}/>
                                            )}
                                        </Layer>
                                        {this.place && (
                                        <Popup key={this.place.id}
                                               coordinates={[this.place.place.longitude, this.place.place.latitude]}>
                                            <StyledPopup>
                                                <h6>{this.place.priority + 1} - {this.place.place.name}</h6>
                                                <div>
                                                    {this.place.description}
                                                </div>
                                            </StyledPopup>
                                        </Popup>
                                        )}

                                    </Map>
                                </div>
                            </Fragment>
                        }

                      <h6 className={"black bold mt-4 mb-3 underline-title"}>Journey Review Details</h6>
                      <DetailedRate ratings={journey.ratings} ratingsAvg={journey.ratingsAvg}/>
                        {
                            journey.createdAt &&
                            <Fragment>
                                <h6 className="black bold mt-4 mb-3 underline-title">Created At</h6>
                                <p> {moment(journey.createdAt).format('YYYY-MM-DD HH:mm')}</p>
                            </Fragment>
                        }
                        {
                            journey.views &&
                            <Fragment>
                                <h6 className="black bold mt-4 mb-3 underline-title">Views</h6>
                                <p>{journey.views} views</p>
                            </Fragment>
                        }
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
  finishedLoading: PropTypes.func.isRequired,
  startUpdating: PropTypes.func.isRequired,
  finishedUpdating: PropTypes.func.isRequired,
  openStepsDrawer: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  journey: PropTypes.shape({}),
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
  rateJourney,
  finishedLoading,
  startUpdating,
  finishedUpdating,
  openStepsDrawer
})(JourneyDetails);