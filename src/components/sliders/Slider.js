import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Carousel from 'react-bootstrap/es/Carousel';

class Slider extends Component {

  render() {
    const {slides} = this.props;
    return (
      <section id="sectioncarousel">
        <Carousel bsClass="carousel"
                  interval={100000}
                  nextIcon={
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                       data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"/>
                      <span className="sr-only">Previous</span>
                    </a>
                  }
                  prevIcon={
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                       data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"/>
                      <span className="sr-only">Previous</span>
                    </a>
                  }
                  defaultActiveIndex={0}>
          {
            slides.map(slide => (

              <Carousel.Item>
                <img className="d-block img-fluid" src={require('../../assets/images/girls-beach.jpg')}
                     alt="First slide"/>
                <Carousel.Caption
                  bsClass="carousel-caption justify-content-center  mb-lg-4 mb-0 align-items-center text-center">
                  <div className="toggleCaption">
                    <h1 className="white shadow-text  align-middle">{slide.captionTitle}</h1>
                  </div>
                  <div className="toggleButton">
                    <h4 className="white shadow-text align-middle">{slide.captionButton}</h4>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>

            ))
          }
        </Carousel>
        <div className="chapter2">
          <img className="curve2 d-none d-xl-block" src={require("../../assets/svgs/curve.svg")} alt=""/>
        </div>
        {/*<div id="carouselExampleIndicators" className="carousel carousel-home2  slide" data-ride="carousel">*/}
        {/*<ol className="carousel-indicators">*/}
        {/*<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"/>*/}
        {/*<li data-target="#carouselExampleIndicators" data-slide-to="1"/>*/}
        {/*<li data-target="#carouselExampleIndicators" data-slide-to="2"/>*/}
        {/*</ol>*/}
        {/*<div className="carousel-inner " role="listbox">*/}
        {/*<div className="carousel-item active">*/}

        {/*<div className="carousel-caption">*/}
        {/*<div className="toggleCaption">*/}
        {/*<h1 className="white shadow-text  align-middle">Thailand</h1>*/}
        {/*</div>*/}
        {/*<div className="toggleButton">*/}
        {/*<h4 className="white shadow-text align-middle">Get to know the best of Thailand</h4>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*<div className="carousel-item">*/}
        {/*<img className="d-block img-fluid" src={require("../../assets/images/bigcarousel.jpg")}*/}
        {/*alt="Second slide"/>*/}
        {/*<div className="carousel-caption justify-content-center  mb-lg-4 mb-0 align-items-center text-center">*/}
        {/*<div className="toggleCaption">*/}
        {/*<h1 className="white shadow-text  align-middle">California</h1>*/}
        {/*</div>*/}
        {/*<div className="toggleButton">*/}
        {/*<h4 className="white shadow-text align-middle">Meet Santa Monica Beach</h4>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*<div className="carousel-item">*/}
        {/*<img className="d-block img-fluid" src={require("../../assets/images/male-tourist.jpg")}*/}
        {/*alt="Third slide"/>*/}
        {/*<div className="carousel-caption justify-content-center  mb-lg-4 mb-0 align-items-center text-center">*/}
        {/*<div className="toggleCaption">*/}
        {/*<h1 className="white shadow-text align-middle">Norway</h1>*/}
        {/*</div>*/}
        {/*<div className="toggleButton">*/}
        {/*<h4 className="white shadow-text align-middle">Adventure for outdoorsy travelers</h4>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">*/}
        {/*<span className="carousel-control-prev-icon" aria-hidden="true"/>*/}
        {/*<span className="sr-only">Previous</span>*/}
        {/*</a>*/}
        {/*<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">*/}
        {/*<span className="carousel-control-next-icon" aria-hidden="true"/>*/}
        {/*<span className="sr-only">Next</span>*/}
        {/*</a>*/}

        {/*</div>*/}
      </section>
    );
  }
}

Slider.propTypes = {
  slides: PropTypes.array.isRequired
};

export default Slider;
