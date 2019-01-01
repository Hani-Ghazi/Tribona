import React from 'react';
import {Link} from 'react-router-dom';


const Header = () => (
  <div id="wrapper-navbar">
    <nav id="top" className="navbar py-3 fixed-top navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand ml-sm-5" href="#">
        <img src={require("../../assets/images/logo.png")} alt={"logo"}/>
      </a>
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
            <Link to={'/places'} className={'nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3'}>Places</Link>
          </li>
          <li className="nav-item">
            <Link to={'/journeys'} className={'nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3'}>Journeys</Link>
          </li>
          <li className="nav-item">
            <Link to={'/trips'} className={'nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3'}>Trips</Link>
          </li>
          <li className="nav-item">
            <Link to={'/login'} className={'nav-link  mr-3 open my-lg-0 my-2 ml-lg-0 ml-3'}>Login/Join us</Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Header;