import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PropTypes from "prop-types";

class MarkerInput extends Component {

  state = {
    marker: {}
  };

  constructor(props) {
    super(props);
    this.state.marker = props.marker;
  }

  onChange = (e) => this.setState({ e });

  onMapClicked = (mapProps, map, clickEvent) => {
    const marker = {
      latitude: clickEvent.latLng.lat(),
      longitude: clickEvent.latLng.lng()
    };
    this.props.onChange(marker);
    this.setState({ marker });
  };

  render() {
    const { marker } = this.state;
    if (!this.props.google) {
      return <div>Loading...</div>;
    }
    return (
      <div style={{ position: "relative" }}>
        <Map
          className={"relative"}
          style={{
            width: "97%",
            height: "400px",
            position: "relative"
          }}
          google={this.props.google}

          zoom={7}
          onClick={this.onMapClicked}
        >
          <Marker
            title={"The marker`s title will appear as a tooltip."}
            name={"SOMA"}
            position={{
              lat: marker.latitude,
              lng: marker.longitude
            }}/>
        </Map>
      </div>
    );
  }
}


//41.012346,28.9608943

MarkerInput.defaultProps = {
  marker: {
    longitude: 32.866045119695286,
    latitude: 39.882533979173
  }
};

MarkerInput.propTypes = {
  marker: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number
  }),
  onChange: PropTypes.func.isRequired
};


export default GoogleApiWrapper({
  apiKey: "AIzaSyAOMFAOII_uhdU3GVpRNFDrlvf7CsdC9Z4",
  v: "3"
})(MarkerInput);