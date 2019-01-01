import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TripCard from './TripCard'

class PopularTrips extends Component {

  render() {
    const {trips} = this.props;

    return (
      <section id="section1">

        <div className="container">

          <h2 className="black front">Popular Destinations</h2>

          <div className="row mb-5">
            <div className="col-sm-9 front">
              <div className="separator"/>
              <h5 className="primary-color section-title ">Find the one that suits you best </h5>
            </div>

            <div className="col-sm-3 front my-auto">
              <a className="btn btn-primary   mt-2 px-5 py-2" href="#" role="button">more destinations</a>
            </div>
          </div>

        </div>
        <div className="container destination-section">
          <div className="row">
            {
              trips.map(trip => <TripCard trip={trip}/>)
            }
          </div>
        </div>
      </section>
    );
  }
}

PopularTrips.propTypes = {
  trips: PropTypes.array.isRequired
};

export default PopularTrips;
