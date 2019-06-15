import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/Auth";
import { TextField, InputAdornment } from '@material-ui/core';
import { MdSearch } from "react-icons/md";
import isEmpty from "lodash/isEmpty";
import { withRouter } from 'react-router-dom';
import qs from "query-string";

class Header extends Component {
  state = {
    filter: {
      search: ''
    },

  };
  componentDidMount() {
    this.setState({
      filter: { ...qs.parse(this.props.location.search) },
    });
  }
  componentWillReceiveProps(nextProps) {
    let newfilter = qs.parse(nextProps.location.search);
    if (newfilter !== this.state.filter && isEmpty(newfilter)) {
      this.setState({
        filter: {
          search:''
        }
      });

    }
  }

  onChange = () => event => {
    let { value, name } = event.target;
    this.setState({
      filter: {
        [name]: value,
      }
    });
  };


  sendToSearch = () => {
    let search = this.state.filter.search
    this.props.history.push({
      pathname: "/search",
      search: qs.stringify({
        search
      })
    });

  }

  onSubmit = (e) => {
    e.preventDefault();
    let search = this.state.filter.search
    if (!isEmpty(search)) {
      this.sendToSearch();


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
            <form onSubmit={this.onSubmit} className="col-6 row">

              <TextField
                id="search-bar"
                name="search"
                className="col-6 mr-3"
                placeholder="search"
                value={this.state.filter.search}
                onChange={this.onChange()}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><MdSearch /></InputAdornment>,
                }}
              />
               <div className="container-login100-form-btn col-2" style={{ justifyContent: "flex-end" }}>
                  <button className="login100-form-btn">
                    Search
                  </button>
                </div>

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
  return {
    isAuthenticated: !!state.user.id,
    user: state.user,
  };
};

export default withRouter(connect(mapStateToProps, {
  logout,
})(Header));