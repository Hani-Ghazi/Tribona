// import React, { Component, Fragment } from "react";
// import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
// import api from "../../api/places";
// import { PageLoader } from "../Loaders";
// import { scrollToTop } from "../../utils";
//
//
// class MapPage extends Component {
//
//   state = {
//     isLoading: true
//   };
//
//   componentDidMount() {
//     this.setState({isLoading: false});
//   }
//
//   render() {
//     const { center, places } = this.props;
//     const { isLoading } = this.state;
//     if (isLoading) {
//       return <PageLoader/>;
//     }
//     return (
//       <Fragment>
//         <div className="">
//           <Map
//             className={"relative"}
//             style={{
//               width: "97%",
//               height: "75vh",
//               position: "relative"
//             }}
//             google={this.props.google}
//             initialCenter={{
//               lat: center.latitude,
//               lng: center.longitude
//             }}
//             zoom={4}
//             onClick={this.onMapClicked}
//           >
//             {
//               (places || []).filter(x => x.latitude && x.longitude).map(place =>
//                 <Marker
//                   title={"The marker`s title will appear as a tooltip."}
//                   name={place.name}
//                   position={{
//                     lat: parseFloat(place.latitude),
//                     lng: parseFloat(place.longitude)
//                   }}/>
//               )
//             }
//           </Map>
//         </div>
//       </Fragment>
//     );
//   }
// }
//
//
// MapPage.defaultProps = {
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
// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAOMFAOII_uhdU3GVpRNFDrlvf7CsdC9Z4",
//   v: "3"
// })(MapPage);

//

import React, {Component, Fragment} from "react";
import {PageLoader} from "../Loaders";

import ReactMapboxGl, {Feature, Layer, Popup} from "react-mapbox-gl";

import styled from "styled-components";
import StarRatings from "react-star-ratings";
import {Favorite, Follow, Like} from "../Partials";
import {IoIosCreate} from "react-icons/io";


const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoibWVtbzk1IiwiYSI6ImNqcTZnbDViZjI3d2c0Mm11aWxnM3Bod2EifQ.RB17uMbr73RZINXqtK2A0g"
});

const layoutLayer = {'icon-image': 'londonCycle'};

const image = new Image();
image.src = '../../assets/images/icons/marker.png';

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

class MapPage extends Component {

    center_latitude = 39.882533979173;
    center_longitude = 32.866045119695286;

    place = null;

    state = {
        isLoading: true
    };

    componentDidMount() {
        this.setState({isLoading: false});
    }

    onToggleHover(cursor, {map}) {
        map.getCanvas().style.cursor = cursor;
    }


    markerClick = (place, {feature}) => {
        console.log(place);
        this.place = place;
        this.center_longitude = place.longitude;
        this.center_latitude = place.latitude;
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


    render() {
        console.log('in map we are');
        const {center, places} = this.props;
        const {isLoading} = this.state;
        if (isLoading) {
            return <PageLoader/>;
        }
        return (
            <Fragment>
                <div className="">
                    <Map
                        style="mapbox://styles/mapbox/streets-v8"
                        center={[this.center_longitude, this.center_latitude]}
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
                            {(places || []).filter(x => x.latitude && x.longitude).map(place =>
                                <Feature
                                    key={place.id}
                                    onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
                                    onMouseLeave={this.onToggleHover.bind(this, '')}
                                    onClick={this.markerClick.bind(this, place)}
                                    coordinates={[place.longitude, place.latitude]}/>
                            )}
                        </Layer>
                        {this.place && (
                            <Popup style={{width: "350px", height: "40px"}} key={this.place.id} coordinates={[this.place.longitude, this.place.latitude]}>
                                <StyledPopup>
                                    <p style={{textAlign: "center", textSize: "12px",}}><b>{this.place.category.nameEn}</b></p>
                                    <hr/>
                                    <h6 style={{textAlign: "center"}}>{this.place.name}</h6>
                                    <div style={{textAlign: "center"}}>
                                        {this.place.country ? this.place.country.countryNameAr: ''} - {this.place.city ? this.place.city.cityNameAr: ''}
                                    </div>
                                    <div className="row" style={{textAlign: "left", width: "170px", height: "10px"}}>
                                        <div className="col text-left">
                                            <Like isLike={!!this.place.isLiked} />
                                            {this.place.likesCount}
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col text-left">
                                            <StarRatings
                                                changeRating={this.changeRating}
                                                numberOfStars={5}
                                                name='rating'
                                                rating={this.place.myRating || 0}
                                                starRatedColor="#f2b01e"
                                                starDimension="20px"
                                                starSpacing="1px"
                                            />
                                        </div>
                                        <div className="col text-right">
                                            <a href={'http://maps.google.com/maps?daddr=' + this.place.latitude + ',' + this.place.longitude + '&amp;ll='} target="_blank"><i className="fa fa-paper-plane" aria-hidden="true"/> Get Direction</a>
                                        </div>
                                    </div>
                                </StyledPopup>
                            </Popup>
                        )}
                    </Map>
                </div>
            </Fragment>
        );
    }
}


export default MapPage;

