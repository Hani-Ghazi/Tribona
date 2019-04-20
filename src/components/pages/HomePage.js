import React, { Fragment, Component } from "react";
import StaticSlider from "../sliders/StaticSlider";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { finishedLoading } from "../../actions/Loaders";
import Timeline from "../../components/Partials/Timeline";
import utilsAPI from "../../api/utils";
import { scrollToTop } from "../../utils";

class HomePage extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    this.props.finishedLoading();
    this.getHomeContents();
  }

  getHomeContents = () => {
    const { items } = this.state;
    utilsAPI.getHomeContents({
      pagination: {
        first: 6,
        skip: items.length
      }
    }).then(items => {
      this.setState({ items: [...this.state.items, ...items] }, () => {
        if (!this.state.items.length) {
          scrollToTop(400);
        }
      });
    });
  };

  render() {
    const { items } = this.state;
    return (
      <Fragment>
        <StaticSlider curveImage={require("../../assets/svgs/curvegrey.svg")}/>
        <div id="pagesection" className="timeline-container">
          <Timeline items={items} loadMore={this.getHomeContents}/>
        </div>
      </Fragment>
    );
  }
}


HomePage.propTypes = {
  places: PropTypes.string
};

const initMapStateToProps = state => {
  return { popularPlaces: state.places.popular, popularTrips: state.trips.popular };
};

export default connect(initMapStateToProps, { finishedLoading })(HomePage);