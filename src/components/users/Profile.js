import React, { Component, Fragment } from "react";
import UserProfileBg from "../sliders/UserProfileBg";
import { getJourneys } from "../../actions/Journey";
import { getTrips } from "../../actions/Trips";
import { getPlaces } from "../../actions/Places";
import { getCitiesByCountryId } from "../../actions/Country";
import { connect } from "react-redux";
import PageLoader from "../Loaders/pageLoader";
import ActionLoader from "../Loaders/actionLoader";
import JourneysGrid from "../Journeys/JourneysGrid";
import TripsGrid from "../Trips/TripsGrid";
import PlacesGrid from "../Places/PlacesGrid";
import { getUserById, getFollowers, getFollowedBy } from "../../actions/User";
import CountryFilter from "../filters/CountryFilter";
import CityFilter from "../filters/CityFilter";
import UsersGrid from "./UsersGrid";

const { REACT_APP_PUBLIC_FILES } = process.env;
const defaultAvatar = require("../../assets/images/avatar.jpeg");

class Profile extends Component {
  state = {
    isLoading: true,
    isUpdating: false,
    activeTab: "JOURNEYS",
    pagination: {
      first: 6
    },
    filters: {
      countryId: undefined
    }
  };

  componentDidMount() {
    const { ownerId } = this.props.match.params;
    const tab = this.state.activeTab;
    this.props.getUserById(ownerId)
      .then(user => this.setState({ user, ownerId }));
    this.fetchData(tab)
      .then(res => {
        this.setState({ [tab]: res.payload, isLoading: false, activeTab: tab });
        window.scrollTo({
          top: 300,
          behavior: "smooth"
        });
      })
      .catch(error => this.setState({ isLoading: false }));
  }

  onTabChanged = (tab) => {
    this.setState({ isUpdating: true });
    tab = tab || this.state.activeTab;
    this.fetchData(tab)
      .then(res =>{
        this.setState({ [tab]: res.payload || res , isUpdating: false, activeTab: tab })
      })
      .catch(error => this.setState({ isUpdating: false }));
  };

  async fetchData(tab) {
    const { pagination, filters } = this.state;
    const { ownerId } = this.props.match.params;
    const { getJourneys, getTrips, getPlaces, getFollowers, getFollowedBy, currentUser } = this.props;
    switch (tab) {
      case "JOURNEYS":
        return getJourneys({ pagination, filters: { ...filters, ownerId } });
      case "TRIPS":
        return getTrips({ pagination, filters: { ...filters, ownerId } });
      case "FOLLOWERS":
        return getFollowers(currentUser.id, { pagination });
      case "FOLLOWED_BY":
        return getFollowedBy(currentUser.id, { pagination });
      default:
        return getPlaces({ pagination, filters: { ...filters, ownerId } });
    }
  }

  onFilter = (value, key) => {
    if (key === "countryId") {
      if (value) {
        this.props.getCitiesByCountryId(value.geonameId)
          .then(cities => this.setState({ cities }));
      } else {
        this.setState({ cities: [] });
      }

    }
    this.setState({
      filters: { ...this.state.filters, [key]: (value || {}).geonameId },
      [key]: value
    }, this.onTabChanged);
  };

  render() {
    const {
      isLoading, JOURNEYS, TRIPS, PLACES, FOLLOWERS, FOLLOWED_BY,
      activeTab, user, isUpdating, countryId, cities, cityId
    } = this.state;
    if (isLoading) {
      return <PageLoader/>;
    }
    return (
      <Fragment>
        <UserProfileBg slide={user}/>
        <section id="section3" className="tour-list-sidebar tour-list-sidebar-2-col">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-6  col-lg-3 order-lg-first order-last mt-3 mt-lg-0">
                {
                  user &&
                  <Fragment>
                    <img className="team-holder circle mx-auto svgcenter black-border"
                         src={user.ownerImage ? REACT_APP_PUBLIC_FILES + user.ownerImage : defaultAvatar}
                         alt=""/>
                    < div className="w-100 m-t-20 text-center">
                      <h3>{(`${user.firstName} ${user.lastName}`)}</h3>
                    </div>
                  </Fragment>
                }
                <div className="row text-center">
                  <div className="col-12 align-self-md-center">
                    <div onClick={() => this.onTabChanged("JOURNEYS")}
                         className={`btn btn-outline-primary px-3 w-100 mr-1 mb-1 custom-btn ${activeTab === "JOURNEYS" ? "active" : ""}`}>JOURNEYS
                    </div>
                  </div>
                  <div className="col-12 align-self-md-center">
                    <div onClick={() => this.onTabChanged("TRIPS")}
                         className={`btn btn-outline-primary px-3 w-100 mr-1 mb-1 custom-btn ${activeTab === "TRIPS" ? "active" : ""}`}>TRIPS
                    </div>
                  </div>
                  <div className="col-12 align-self-md-center">
                    <div onClick={() => this.onTabChanged("PLACES")}
                         className={`btn btn-outline-primary px-3 w-100 mr-1 mb-1 custom-btn ${activeTab === "PLACES" ? "active" : ""}`}>PLACES
                    </div>
                  </div>
                  {
                    (user && this.props.currentUser.id === user.id) ?
                      <Fragment>
                        <div className="col-12 align-self-md-center">
                          <div onClick={() => this.onTabChanged("FOLLOWERS")}
                               className={`btn btn-outline-primary px-3 w-100 mr-1 mb-1 custom-btn ${activeTab === "FOLLOWERS" ? "active" : ""}`}>FOLLOWERS
                          </div>
                        </div>
                        <div className="col-12 align-self-md-center">
                          <div onClick={() => this.onTabChanged("FOLLOWED_BY")}
                               className={`btn btn-outline-primary px-3 w-100 mr-1 mb-1 custom-btn ${activeTab === "FOLLOWED_BY" ? "active" : ""}`}>FOLLOWED
                            BY
                          </div>
                        </div>
                      </Fragment>
                      : <Fragment/>
                  }
                </div>
                <div className="form-container p-3">
                  <h3 className="black bold mt-3 px-4 pb-2 text-center">Filter by</h3>
                  <div className="form-group">
                    <CountryFilter onFilter={this.onFilter} value={countryId}/>
                  </div>
                  <div className="form-group">
                    <CityFilter cities={cities} onFilter={this.onFilter} value={cityId}/>
                  </div>
                </div>
              </div>
              {
                isUpdating && <ActionLoader/>
              }
              {
                activeTab === "JOURNEYS" && <JourneysGrid journeys={JOURNEYS}/>
              }
              {
                activeTab === "TRIPS" && <TripsGrid trips={TRIPS}/>
              }
              {
                activeTab === "PLACES" && <PlacesGrid places={PLACES}/>
              }
              {
                activeTab === "FOLLOWERS" && <UsersGrid users={FOLLOWERS}/>
              }
              {
                activeTab === "FOLLOWED_BY" && <UsersGrid users={FOLLOWED_BY}/>
              }
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.id,
    currentUser: state.user
  };
};

export default connect(mapStateToProps, {
  getJourneys,
  getTrips,
  getPlaces,
  getUserById,
  getCitiesByCountryId,
  getFollowers,
  getFollowedBy
})(Profile);