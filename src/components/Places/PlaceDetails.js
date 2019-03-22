import React, { Component, Fragment } from "react";
import SliderWithScroll from "../sliders/SliderWithScroll";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";
import {
  getPlaceById,
  getPlaceComments,
  placeToggleLike,
  placeToggleFavorite,
  addOrUpdateComment,
  deleteComment,
  ratePlace
} from "../../actions/Places";
import {
  openLoginModal
} from "../../actions/Modals";
import PropTypes from "prop-types";
import {
  Favorite,
  Comments,
  Like,
  Follow,
  UserWidget,
  DetailedRate,
  ImagesGallery,
  PopularAside,
  MarkerInput
} from "../Partials";
import { toast } from "react-toastify";
import { IoIosCreate } from "react-icons/io";
import { PageLoader, ActionLoader } from "../Loaders";
import { scrollToTop } from "../../utils";

class PlaceDetails extends Component {
  state = {
    isOpen: false,
    currentIndex: 0,
    place: null,
    isUpdating: false,
    isLoading: true
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getPlaceById(id).then(() => {
      this.setState({ place: this.props.place }, scrollToTop);
      this.props.getPlaceComments(id).then(comments => {
        this.setState({
          place: {
            ...this.props.place,
            comments: comments.payload
          },
          isLoading: false
        }, scrollToTop);
      });
    });
  }

  changeLikeStatus = () => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
    const { isLiked, id } = this.state.place;
    this.setState({ isUpdating: true });
    this.props.placeToggleLike({ id, isLiked }).then(() => {
      this.setState({
        place: {
          ...this.state.place,
          isLiked: !isLiked
        },
        isUpdating: false
      });
      toast.success(`You successfully ${isLiked ? "unlike" : "like"} this place`, {
        hideProgressBar: true
      });
    });
  };

  changeFollowStatus = (isFollowOwner) => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated)
      return this.props.openLoginModal();
    const { ownerName } = this.state.place;
    this.setState({ isUpdating: true });
    this.setState({ place: { ...this.state.place, isFollowOwner: isFollowOwner }, isUpdating: false });
    toast.success(`You successfully ${isFollowOwner ? "followed" : "un followed"} ${ownerName}`, {
      hideProgressBar: true
    });
  };

  changeFavStatus = () => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated)
      return this.props.openLoginModal();
    const { isFavorite, id } = this.state.place;
    this.setState({ isUpdating: true });
    this.props.placeToggleFavorite({ id, isFavorite })
      .then(() => {
        this.setState({ place: { ...this.state.place, isFavorite: !isFavorite }, isUpdating: false });
        toast.success(`You successfully ${isFavorite ? "add to" : "remove from"} your favorites`, {
          hideProgressBar: true
        });
      });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.place && this.props.place && nextProps.place.id && this.props.place.id && nextProps.place.id !== this.props.place.id) {
      const { id } = nextProps.place;
      this.setState({ place: nextProps.place, isUpdating: true });
      this.props.getPlaceComments(id).then(comments => this.setState({
        place: {
          ...nextProps.place,
          comments: comments.payload
        },
        isUpdating: false
      }, scrollToTop));
    }
  }

  onComment = (text) => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated)
      return this.props.openLoginModal();
    const { place } = this.state;
    this.setState({ isUpdating: true });
    this.props.addOrUpdateComment({ id: place.id, text }).then(() => {
      this.setState({
        place: {
          ...place,
          comments: [...place.comments]
        },
        isUpdating: false
      });
    });
  };

  onRemoveComment = (commentId) => {
    const { deleteComment, getPlaceComments } = this.props;
    const { place: { id }, place } = this.state;
    this.setState({ isUpdating: true });
    deleteComment({ id, commentId })
      .then(() => getPlaceComments(id)
        .then(res => {
            this.setState({ place: { ...place, comments: res.payload }, isUpdating: false });
            toast.success(`Comment successfully deleted`, {
              hideProgressBar: true
            });
          }
        ));
  };

  changeRating = newRating => {
    this.setState({ isUpdating: true });
    const { place: { id } } = this.state;
    this.props.ratePlace(id, newRating)
      .then(() => {
        this.setState({
          place: {
            ...this.state.place, myRating: newRating
          },
          isUpdating: false
        });
      });

  };

  render() {
    const { popularPlaces, isAuthenticated, userId } = this.props;
    const { place, isUpdating, isLoading } = this.state;
    if (isLoading) {
      return <PageLoader/>;
    }
    return (
      <Fragment>
        {
          isUpdating && <ActionLoader/>
        }
        <Fragment>
          <SliderWithScroll slide={place}/>
          <section id="section3" className="tour-list-sidebar tour-list-sidebar-2-col">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-12 col-md-6 col-lg-3 ml-lg-5 mt-5 mt-lg-0 mx-auto my-3">
                  <UserWidget user={place}/>
                  <span className="btn active-category w-100 btn-outline-danger pt-2 mr-1 mb-4 px-3 w-100">
                    #{place.category.nameEn}
                  </span>
                  <div className="row">
                    <div className="col text-center">
                      <StarRatings
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name='rating'
                        rating={place.myRating || 0}
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
                    {
                      isAuthenticated && userId === place.ownerId &&
                      <div className="col align-self-md-center">
                        <IoIosCreate size="2em" className="pointer"
                                     onClick={() => this.props.history.push(`edit/${place.id}`)}/>
                      </div>
                    }
                  </div>
                  <div id="instasidebar" className="grid2 runsidebar  text-center">
                    <h6 className="black semibold mx-4 mt-3 mb-2 underline-title">Popular PLaces</h6>
                    <PopularAside list={popularPlaces} action={this.props.getPlaceById}/>
                  </div>
                </div>
                <div className="col-xs-12 col-md-11 col-lg-8 single-tour">
                  <div className="row">
                    <div className="col-xs-12 col-md-12 col-lg-12">
                      {
                        (place.images && place.images.length) ?
                        [
                          <h6 key={1} className="underline-title" tabIndex="0">Images</h6>,
                          <ImagesGallery key={2} images={place.images}/>
                        ] : <Fragment/>
                      }
                      <div className="m-t-30">
                        <h6 className="underline-title">Map Location</h6>
                        <MarkerInput
                          marker={{ longitude: place.longitude, latitude: place.latitude }}
                          center={{ latitude: place.latitude, longitude: place.longitude }}
                          disable={true}
                        />
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
                        <Comments comments={place.comments || []} onAdd={this.onComment}
                                  onRemove={this.onRemoveComment}/>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      </Fragment>
    );
  }
}

PlaceDetails.propTypes = {
  getPlaceById: PropTypes.func.isRequired,
  getPlaceComments: PropTypes.func.isRequired,
  placeToggleLike: PropTypes.func.isRequired,
  placeToggleFavorite: PropTypes.func.isRequired,
  addOrUpdateComment: PropTypes.func.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  ratePlace: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  place: PropTypes.object,
  popularPlaces: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired,
  userId: PropTypes.string
};


const initMapStateToProps = state => {
  return {
    place: state.places.place,
    isAuthenticated: !!state.user.id,
    popularPlaces: state.places.popular,
    userId: state.user.id
  };
};

export default connect(initMapStateToProps, {
  getPlaceById,
  getPlaceComments,
  placeToggleLike,
  placeToggleFavorite,
  addOrUpdateComment,
  openLoginModal,
  deleteComment,
  ratePlace
})(PlaceDetails);