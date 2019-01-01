import React from 'react';
import {Link} from 'react-router-dom';


const Footer = () => (
  <footer>

    <section id="footer">
      <div className="container">
        <div className="row text-center text-xs-center text-sm-left text-md-left">
          <div className="col-xs-12 col-md-6 col-lg-4">
            <h6 className="white mt-4">Contact Us</h6>
            <ul className="list-unstyled quick-links">
              <li>
                <p className="white light">Lorem ipsum dolor sit amet, consectetur adipi. Suspend isse ultri sit amet,
                  consectetur adipi. Suspend isse ultri t amet, consectetur adipi. </p>
              </li>
              <li><h5><i className="fas fa-map-marker-alt mr-2"/>Mave Avenue, New York</h5></li>
              <li><h5><i className="fas fa-phone-square mr-2"/>United States (+1) 3333.1111</h5></li>
              <li><h5><i className="fas fa-envelope mr-2"/>hello@ourcompany.com</h5></li>
            </ul>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-4">
            <img className="svgcenter mt-4 logo-light" src={require("../../assets/svgs/logolight.svg")} alt=""/>
            <ul className="list-unstyled list-inline mt-3 social text-center">
              <li className="list-inline-item"><a href="http://www.facebook.com"><i className="fab fa-facebook-f"/></a>
              </li>
              <li className="list-inline-item"><a href="http://www.twitter.com"><i className="fab fa-twitter"/></a>
              </li>
              <li className="list-inline-item"><a href="http://www.instagram.com"><i className="fab fa-instagram"/></a>
              </li>
            </ul>
            <ul className="list-unstyled text-center quick-links mt-3">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/"><i className="fa fa-angle-double-right"/>See our Tours</Link></li>
              <li><Link to="/">About us</Link></li>
              <li><Link to="/">Contact us</Link></li>
            </ul>
          </div>

          <div id="instafeed" className="col-xs-12 col-md-6 col-lg-4 grid mx-auto">
            <h6 className="white mt-4 mb-3">Instagram Gallery</h6>
            <div className="grid-sizer"/>
            <a className="grid-item" href="https://www.instagram.com/p/BkLar6iBtGY/"><img
              src="https://scontent.cdninstagram.com/vp/8967e8d083573dcc76766a052db9c09e/5CCCEF99/t51.2885-15/e35/s150x150/34310912_610533519302381_6174758787925147648_n.jpg?_nc_ht=scontent.cdninstagram.com"/></a>
            <a className="grid-item" href="https://www.instagram.com/p/BkLar6iBtGY/"><img
              src="https://scontent.cdninstagram.com/vp/8967e8d083573dcc76766a052db9c09e/5CCCEF99/t51.2885-15/e35/s150x150/34310912_610533519302381_6174758787925147648_n.jpg?_nc_ht=scontent.cdninstagram.com"/></a>
            <a className="grid-item" href="https://www.instagram.com/p/BkLar6iBtGY/"><img
              src="https://scontent.cdninstagram.com/vp/8967e8d083573dcc76766a052db9c09e/5CCCEF99/t51.2885-15/e35/s150x150/34310912_610533519302381_6174758787925147648_n.jpg?_nc_ht=scontent.cdninstagram.com"/></a>
            <a className="grid-item" href="https://www.instagram.com/p/BkLar6iBtGY/"><img
              src="https://scontent.cdninstagram.com/vp/8967e8d083573dcc76766a052db9c09e/5CCCEF99/t51.2885-15/e35/s150x150/34310912_610533519302381_6174758787925147648_n.jpg?_nc_ht=scontent.cdninstagram.com"/></a>
            <a className="grid-item" href="https://www.instagram.com/p/BkLar6iBtGY/"><img
              src="https://scontent.cdninstagram.com/vp/8967e8d083573dcc76766a052db9c09e/5CCCEF99/t51.2885-15/e35/s150x150/34310912_610533519302381_6174758787925147648_n.jpg?_nc_ht=scontent.cdninstagram.com"/></a>
            <a className="grid-item" href="https://www.instagram.com/p/BkLar6iBtGY/"><img
              src="https://scontent.cdninstagram.com/vp/8967e8d083573dcc76766a052db9c09e/5CCCEF99/t51.2885-15/e35/s150x150/34310912_610533519302381_6174758787925147648_n.jpg?_nc_ht=scontent.cdninstagram.com"/></a>
          </div>

        </div>
        <div className="scale-up">
          <a className="smooth-scroll  rectangle-right" href="#">
            <div className="go-up px-1"><i className="fas mb-2 fa-arrow-up"/><br/>
              <h6 className="text-center letters-up">GO<br/>UP</h6>
            </div>
          </a>
        </div>

        <div className="row">
          <div className="col-12 mt-2 mt-sm-2 text-center text-white">
            <div className="separatorfullwidth"/>
            <p className="white footer-bottom">
              © Copyright Turbino Demo - <a className="text-green ml-2" href="https://www.uxithemes.com"
                                            target="_blank">template by UxiThemes</a>
            </p>
          </div>
        </div>
      </div>

    </section>

  </footer>
);

export default Footer;