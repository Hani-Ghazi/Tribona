import React, { Component, Fragment } from "react";

const { REACT_APP_PUBLIC_FILES } = process.env;

class imageCardSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      translateValue: 0
    };
  }


  goToPrevSlide = () => {
    if (this.state.currentIndex === 0)
      return;

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }));
  };

  goToNextSlide = () => {
    // Exiting the method early if we are at the end of the images array.
    // We also want to reset currentIndex and translateValue, so we return
    // to the first image in the array.
    if (this.state.currentIndex === (this.props.images || []).length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      });
    }

    // This will not run if we met the if condition above
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -(this.slideWidth())
    }));
  };

  slideWidth = () => {
    return document.querySelector(".slide").clientWidth;
  };

  render() {

    return (
      <div className="slider">
        <div className="slider-wrapper"
             style={{
               transform: `translateX(${this.state.translateValue}px)`,
               transition: "transform ease-out 0.45s"
             }}>
          {
            (this.props.images || []).map((image, i) => (
              <Slide
                key={i}
                image={image}
                goToDetails={this.props.goToDetails}
                type={this.props.type}/>
            ))
          }
        </div>

        <LeftArrow
          goToPrevSlide={this.goToPrevSlide}
        />

        <RightArrow
          goToNextSlide={this.goToNextSlide}
        />
      </div>
    );
  }
}


const Slide = ({ image, goToDetails, type }) => {
  const styles = {
    backgroundImage: `url(${REACT_APP_PUBLIC_FILES + image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 60%"
  };
  return <Fragment>
    <div className="pos-absolute bg-blue">
      <img src={require(`../../assets/images/icons/${type}-white.png`) || ""} alt="" className="w-40"/>
    </div>
    <div className="slide" style={styles} onClick={goToDetails}/>
  </Fragment>;
};


const LeftArrow = (props) => {
  return (
    <div className="backArrow arrow" onClick={props.goToPrevSlide}>
      <i className="fa fa-arrow-left" aria-hidden="true"/>
    </div>
  );
};


const RightArrow = (props) => {
  return (
    <div className="nextArrow arrow" onClick={props.goToNextSlide}>
      <i className="fa fa-arrow-right" aria-hidden="true"/>
    </div>
  );
};

export default imageCardSlider;