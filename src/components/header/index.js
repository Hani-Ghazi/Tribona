import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/Auth";

const Header = ({ isAuthenticated, logout, user }) => (
  <div id="wrapper-navbar">
    <nav id="top" className="navbar py-3 fixed-top navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand ml-sm-5" to={"/"}>
        <img src={require("../../assets/images/logo.png")} alt={"logo"}/>
      </Link>
      <button className="navbar-toggler collapsed navbar-toggler-right" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
        <span className="icon-bar top-bar"/>
        <span className="icon-bar middle-bar"/>
        <span className="icon-bar bottom-bar"/>
        <span className="sr-only">Toggle navigation</span>
      </button>
      <div className="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/places"} className={"nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3"}>Places</Link>
          </li>
          <li className="nav-item">
            <Link to={"/journeys"} className={"nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3"}>Journeys</Link>
          </li>
          <li className="nav-item">
            <Link to={"/trips"} className={"nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3"}>Trips</Link>
          </li>
          {
            !isAuthenticated ?
              <li className="nav-item">
                <Link to={"/login"} className={"nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3"}>Login/Join us</Link>
              </li>
              :
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle dropdown-menu-right  ml-lg-0 ml-3 mr-4 my-lg-0 my-2 lastitem"
                   href="#" id="navbarDropdown6" role="button" data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false">
                  {user.firstName + " " + user.lastName}
                </a>
                <div className="dropdown-divider d-lg-none"/>
                <div className="dropdown-menu dropdownId dropdown-menu-right" aria-labelledby="navbarDropdown6">
                  <Link to={"/places/add"} className="dropdown-item mt-1">New Place</Link>
                  <div className="dropdown-divider"/>
                  <Link to={"/journeys/add"} className="dropdown-item mt-1">New Journey</Link>
                  <div className="dropdown-divider"/>
                  <Link to={"/"} onClick={() => logout()} className="dropdown-item mt-1">Logout</Link>
                </div>
              </li>
          }
        </ul>
      </div>
    </nav>
  </div>
);

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.user.id,
    user: state.user
  };
};

export default connect(mapStateToProps, { logout })(Header);