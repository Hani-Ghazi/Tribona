import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Like, Favorite } from "./index";
import { placeToggleLike, placeToggleFavorite } from "../../actions/Places";
import { journeyToggleFavorite, journeyToggleLike } from "../../actions/Journey";
import { tripToggleFavorite, tripToggleLike } from "../../actions/Trips";
import { openLoginModal } from "../../actions/Modals";
import { toast } from "react-toastify";
import { parseDate } from "../../utils";
import ImageCardSlider from "../sliders/imageCardSlider";

const defaultImage = require("../../assets/images/peru.jpg");
const placeIcon = require("../../assets/images/icons/place-white.png");
const journeyIcon = require("../../assets/images/icons/journey-white.png");
const tripIcon = require("../../assets/images/icons/trip-white.png");


const { REACT_APP_PUBLIC_FILES } = process.env;
const {
  homeContent: { PLACE, JOURNEY, TRIP }
} = require("../../constants");

const getIcon = (type) => {
  switch (type) {
    case PLACE:
      return placeIcon;
    case JOURNEY:
      return journeyIcon;
    case TRIP:
      return tripIcon;
    default:
      return placeIcon;
  }
};

class TimelineCard extends Component {


  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      type: props.type
    };
  }


  onLike = () => {
    const { isAuthenticated, placeToggleLike, journeyToggleLike, tripToggleLike } = this.props;
    const { item, type } = this.state;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
    const data = { id: item.id, isLiked: item.isLiked };
    const onResponse = () => {
      this.setState({ item: { ...item, isLiked: !item.isLiked } });
      toast.success(`You successfully ${item.isLiked ? "unlike" : "like"}`, {
        hideProgressBar: true
      });
    };
    switch (type) {
      case PLACE:
        return placeToggleLike(data).then(onResponse);
      case JOURNEY:
        return journeyToggleLike(data).then(onResponse);
      case TRIP:
        return tripToggleLike(data).then(onResponse);
      default:
        return;
    }
  };

  onFav = () => {
    const { type, isAuthenticated, placeToggleFavorite, journeyToggleFavorite, tripToggleFavorite } = this.props;
    const { item } = this.state;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
    const data = { id: item.id, isFavorite: !item.isFavorite };
    const onResponse = () => {
      this.setState({ item: { ...item, isFavorite: !item.isFavorite } });
      toast.success(`You successfully ${!item.isFavorite ? "add to" : "remove from"} your favorites`, {
        hideProgressBar: true
      });
    };
    switch (type) {
      case PLACE:
        return placeToggleFavorite(data).then(onResponse);
      case JOURNEY:
        return journeyToggleFavorite(data).then(onResponse);
      case TRIP:
        return tripToggleFavorite(data).then(onResponse);
      default:
        return;
    }
  };

  goToDetails = () => {
    const { item, type } = this.state;
    const history = this.props.history;
    switch (type) {
      case PLACE:
        return history.push(`places/${item.id}`);
      case JOURNEY:
        return history.push(`journeys/${item.id}`);
      case TRIP:
        return history.push(`trips/${item.id}`);
      default:
        return;
    }
  };

  render() {
    const { item, type } = this.state;
    return (
      <div className="timeline-panel">
        <div className="timeline-heading pointer">
          <ImageCardSlider images={item.images} goToDetails={this.goToDetails} type={type}/>
        </div>
        <div className="timeline-body">
          <p>
            <span onClick={this.goToDetails}><strong><b>{item.name}</b></strong></span>
            <span className="pull-right">{parseDate(item.createdAt)}</span>
          </p>
        </div>
        <div className="timeline-footer">
          <span className="p-t-5">
            <span className="m-r-12">
              <Like isLike={item.isLiked} size={"1.5em"} onChange={this.onLike}/>
            </span>
            <span>
              <Favorite isFav={!!item.isFavorite} size={"1.5em"} onChange={this.onFav}/>
            </span>
          </span>
          <span style={{ marginLeft: "auto" }}>
            <StarRatings
              numberOfStars={5}
              name='rating'
              rating={item.ratingsAvg || 0}
              starRatedColor="#1a6bc4"
              starDimension="30px"
              starSpacing="3px"
            />
          </span>
        </div>
      </div>
    );
  }
}

const initMapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.id
  };
};

export default withRouter(connect(initMapStateToProps, {
  placeToggleLike,
  placeToggleFavorite,
  journeyToggleFavorite,
  journeyToggleLike,
  tripToggleFavorite,
  tripToggleLike,
  openLoginModal
})(TimelineCard));