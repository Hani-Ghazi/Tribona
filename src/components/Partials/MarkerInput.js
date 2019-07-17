// import React, { Component } from "react";
// import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
// import PropTypes from "prop-types";
//
// class MarkerInput extends Component {
//
//   state = {
//     marker: {}
//   };
//
//   constructor(props) {
//     super(props);
//     this.state.marker = props.marker;
//   }
//
//
//   onMapClicked = (mapProps, map, clickEvent) => {
//     if (this.props.disable) return;
//     const marker = {
//       latitude: clickEvent.latLng.lat(),
//       longitude: clickEvent.latLng.lngmapProps()
//     };
//     this.props.onChange(marker);
//     this.setState({ marker });
//   };
//
//   render() {
//     const { marker } = this.state;
//     const { center } = this.props;
//     console.log({ center, marker });
//     if (!this.props.google) {
//       return <div>Loading...</div>;
//     }
//     return (
//       <div style={{ position: "relative" }}>
//         <Map
//           className={"relative"}
//           style={{
//             width: "97%",
//             height: "400px",
//             position: "relative"
//           }}
//           google={this.props.google}
//           initialCenter={{
//             lat: center.latitude,
//             lng: center.longitude
//           }}
//           zoom={9}
//           onClick={this.onMapClicked}
//         >
//           <Marker
//             title={"The marker`s title will appear as a tooltip."}
//             name={"SOMA"}
//             position={{
//               lat: marker.latitude,
//               lng: marker.longitude
//             }}/>
//         </Map>
//       </div>
//     );
//   }
// }
//
//
// //41.012346,28.9608943
//
// MarkerInput.defaultProps = {
//   marker: {
//     longitude: 32.866045119695286,
//     latitude: 39.882533979173
//   },
//   center: {
//     longitude: 32.866045119695286,
//     latitude: 39.882533979173
//   },
//   disable: false
// };
//
// MarkerInput.propTypes = {
//   marker: PropTypes.shape({
//     longitude: PropTypes.number,
//     latitude: PropTypes.number
//   }),
//   onChange: PropTypes.func,
//   disable: PropTypes.bool,
//   center: PropTypes.shape({
//     longitude: PropTypes.number,
//     latitude: PropTypes.number
//   })
// };
//
//
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAOMFAOII_uhdU3GVpRNFDrlvf7CsdC9Z4",
//   v: "3"
// })(MarkerInput);


import React, {Component} from "react";
import ReactMapboxGl, {Feature, Layer, Popup} from "react-mapbox-gl";
import PropTypes from "prop-types";
import styled from "styled-components";
import MapPage from "../pages/MapPage";

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoibWVtbzk1IiwiYSI6ImNqcTZnbDViZjI3d2c0Mm11aWxnM3Bod2EifQ.RB17uMbr73RZINXqtK2A0g"
});

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

class MarkerInput extends Component {

    center_latitude = 39.882533979173;
    center_longitude = 32.866045119695286;

    state = {
        marker: {}
    };

    place = null;

    onToggleHover(cursor, {map}) {
        map.getCanvas().style.cursor = cursor;
    }


    markerClick = (place, {feature}) => {
        this.place = place;
        this.setState({
            // center: feature.geometry.coordinates,
            // zoom: [14],
        });
    };

    onDrag = () => {
        if (this.place) {
            this.place = null;
            this.setState({
                // center: feature.geometry.coordinates,
                // zoom: ,
            });
        }
    };

    constructor(props) {
        super(props);
        this.state.marker = props.marker;
    }


    onMapClicked = (mapProps, map, clickEvent) => {
        if (this.props.disable) return;
        const marker = {
            latitude: clickEvent.latLng.lat(),
            longitude: clickEvent.latLng.lngmapProps()
        };
        this.props.onChange(marker);
        this.setState({marker});
    };

    render() {
        const {marker} = this.state;
        const {center} = this.props;

        // if (!this.props.google) {
        //     return <div>Loading...</div>;
        // }
        console.log(center.place.latitude);
        console.log(center.place.longitude);
        return (
            <div style={{position: "relative"}}>
                <Map
                    style="mapbox://styles/mapbox/streets-v8"
                    center={[center.place.longitude, center.place.latitude]}
                    zoom={[4]}
                    onDrag={this.onDrag}
                    containerStyle={{
                        height: "75vh",
                        width: "97%",
                    }}>
                    <Layer
                        type="symbol"
                        id="marker"
                        layout={{"icon-image": "marker-15"}}>
                        <Feature
                            key={center.place.latitude}
                            onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                            onMouseLeave={this.onToggleHover.bind(this, '')}
                            onClick={this.markerClick.bind(this, center)}
                            coordinates={[marker.longitude, marker.latitude]}/>
                    </Layer>
                    {this.place && (
                        <Popup key={this.place.place.latitude} coordinates={[this.place.place.longitude, this.place.place.latitude]}>
                            <StyledPopup>
                                <h6>{this.place.place.name}</h6>
                                <div>
                                    {this.place.place.city ? this.place.place.city.cityNameAr : ''} - {this.place.place.country ? this.place.place.country.countryNameAr: ''}
                                </div>
                            </StyledPopup>
                        </Popup>
                    )}
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
    },
    center: {
        longitude: 32.866045119695286,
        latitude: 39.882533979173
    },
    disable: false
};

MarkerInput.propTypes = {
    marker: PropTypes.shape({
        longitude: PropTypes.number,
        latitude: PropTypes.number
    }),
    onChange: PropTypes.func,
    disable: PropTypes.bool,
    center: PropTypes.shape({
        longitude: PropTypes.number,
        latitude: PropTypes.number
    })
};


export default MarkerInput;