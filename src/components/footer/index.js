import React from "react";
import { Link } from "react-router-dom";


const Footer = () => (
  <footer>
    <section id="footer">
      <div className="container">
        <div className="row text-center text-xs-center text-sm-left text-md-left">
          <div className="col-xs-12 col-md-4 col-lg-4">
            <h6 className="white mt-4">Contact Us</h6>
            <ul className="list-unstyled quick-links">
              <li><h5><i className="fa fa-envelope mr-2"/>hello@ourcompany.com</h5></li>
            </ul>
          </div>
          <div className="col-xs-12 col-md-4 col-lg-4">
            <h6 className="white mt-4">Hot Links</h6>
            <ul className="list-unstyled text-left quick-links mt-3">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/places">places</Link></li>
              <li><Link to="/tours">Tours</Link></li>
              <li><Link to="/contact">contact us</Link></li>
            </ul>
          </div>
          <div className="col-xs-12 col-md-4 col-lg-4">
            <img className="svgcenter mt-4 w-25" src={require("../../assets/images/logo.png")} alt=""/>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mt-2 mt-sm-2 text-center text-white">
            <div className="separatorfullwidth"/>
            <p className="white footer-bottom">
              © Copyright Sendibady
            </p>
          </div>
        </div>
      </div>

    </section>

  </footer>
);

export default Footer;