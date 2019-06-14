import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/Auth";
import { TextField, InputAdornment } from '@material-ui/core';
import { MdSearch } from "react-icons/md";
import isEmpty from "lodash/isEmpty";
import { withRouter } from 'react-router-dom';
import qs from "query-string";
import { getJourneys } from "../../actions/Journey";
import { getTrips } from "../../actions/Trips";
import { getPlaces } from "../../actions/Places";

class Header extends Component {
  state = {
    search: ''
  };
  onChange = () => event => {
    let { value, name } = event.target;
    this.setState({
      [name]: value,
    }, () =>
        this.getJourneys()
    );
  };

  getJourneys = () => {
    const { search } = this.state;
    this.props.getJourneys({ search });
    this.props.getTrips({ search });
    this.props.getPlaces({ search });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let search = this.state.search
    if (!isEmpty(search)) {
      this.props.history.push({
        pathname: "/search",
        search: qs.stringify({
          search
        }),
        state: {
          journeys: this.props.journeys,
          trips: this.props.trips,
          places: this.props.places,
        }
      });
    }


  };
  render() {
    const { isAuthenticated, logout, user } = this.props;
    return (
      <div id="wrapper-navbar">
        <nav id="top" className="navbar py-3 fixed-top navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand ml-sm-5" to={"/"}>
            <img src={require("../../assets/images/logo.png")} alt={"logo"} />
          </Link>
          <button className="navbar-toggler collapsed navbar-toggler-right" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="icon-bar top-bar" />
            <span className="icon-bar middle-bar" />
            <span className="icon-bar bottom-bar" />
            <span className="sr-only">Toggle navigation</span>
          </button>
          <div className="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
            <form onSubmit={this.onSubmit} className="col-6">

              <TextField
                id="search-bar"
                name="search"
                fullWidth
                placeholder="search"
                value={this.state.search}
                onChange={this.onChange()}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><MdSearch /></InputAdornment>,
                }}
              />
            </form>
            <ul className="navbar-nav ml-auto">



              <li className="nav-item">
                <Link to={"/places"} className={"nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3"}>Places</Link>
              </li>
              <li className="nav-item">
                <Link to={"/journeys"} className={"nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3"}>Journeys</Link>
              </li>
              <li className="nav-item">
                <Link to={"/trips"} className={"nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3"}>Tours</Link>
              </li>
              <li className="nav-item">
                <Link to={"/map"} className={"nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3"}>MAP</Link>
              </li>
              <li className="nav-item">
                <Link to={"/contact-us"} className={"nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3"}>Contact Us</Link>
              </li>
              {
                !isAuthenticated ?
                  [
                    <li className="nav-item" key={1}>
                      <Link to={"/login"} className={"nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3"}>Login</Link>
                    </li>,
                    <li className="nav-item" key={2}>
                      <Link to={"/sign-up"} className={"nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3"}>Join us</Link>
                    </li>
                  ]
                  :
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle dropdown-menu-right  ml-lg-0 ml-3 mr-4 my-lg-0 my-2 lastitem"
                      id="navbarDropdown6" role="button" data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false">
                      {user.firstName + " " + user.lastName}
                    </a>
                    <div className="dropdown-divider d-lg-none" />
                    <div className="dropdown-menu dropdownId dropdown-menu-right" aria-labelledby="navbarDropdown6">
                      <Link to={`/users/profile/${user.id}`} className="dropdown-item mt-1">Profile</Link>
                      <div className="dropdown-divider" />
                      <Link to={`/users/my-favorite`} className="dropdown-item mt-1">My Favorite</Link>
                      <div className="dropdown-divider" />
                      <Link to={"/places/add"} className="dropdown-item mt-1">New Place</Link>
                      <div className="dropdown-divider" />
                      <Link to={"/journeys/add"} className="dropdown-item mt-1">New Journey</Link>
                      <div className="dropdown-divider" />
                      <Link to={"/trips/add"} className="dropdown-item mt-1">New Trip</Link>
                      <div className="dropdown-divider" />
                      <Link to={"/profile"} className="dropdown-item mt-1">Edit Profile</Link>
                      <div className="dropdown-divider" />
                      <Link to={"/"} onClick={() => logout()} className="dropdown-item mt-1">Logout</Link>
                    </div>
                  </li>
              }
            </ul>
          </div>
        </nav>
      </div>
    );
  }

};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    isAuthenticated: !!state.user.id,
    user: state.user,
    journeys: state.journeys && state.journeys.list,
    places: state.places && state.places.list,
    trips: state.trips && state.trips.list,


  };
};

export default withRouter(connect(mapStateToProps, {
  logout,
  getJourneys,
  getTrips,
  getPlaces,
})(Header));