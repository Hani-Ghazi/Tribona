import React, { Component, Fragment } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import api from "../../api/places";
import { PageLoader } from "../Loaders";
import { scrollToTop } from "../../utils";


class MapPage extends Component {

  state = {
    isLoading: true
  };

  componentDidMount() {
    this.setState({isLoading: false});
  }

  render() {
    const { center, places } = this.props;
    const { isLoading } = this.state;
    if (isLoading) {
      return <PageLoader/>;
    }
    return (
      <Fragment>
        <div className="">
          <Map
            className={"relative"}
            style={{
              width: "97%",
              height: "75vh",
              position: "relative"
            }}
            google={this.props.google}
            initialCenter={{
              lat: center.latitude,
              lng: center.longitude
            }}
            zoom={4}
            onClick={this.onMapClicked}
          >
            {
              (places || []).filter(x => x.latitude && x.longitude).map(place =>
                <Marker
                  title={"The marker`s title will appear as a tooltip."}
                  name={place.name}
                  position={{
                    lat: parseFloat(place.latitude),
                    lng: parseFloat(place.longitude)
                  }}/>
              )
            }
          </Map>
        </div>
      </Fragment>
    );
  }
}


MapPage.defaultProps = {
  marker: {
    longitude: 32.866045119695286,
    latitude: 39.882533979173
  },
  center: {
    longitude: 32.866045119695286,
    latitude: 39.882533979173
  },
  disable: false
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAOMFAOII_uhdU3GVpRNFDrlvf7CsdC9Z4",
  v: "3"
})(MapPage);