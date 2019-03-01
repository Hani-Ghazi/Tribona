// import React, { Component, Fragment } from "react";
// import { connect } from "react-redux";
// import SliderWithScroll from "../sliders/SliderWithScroll";
// import PropTypes from "prop-types";
// import ActionLoader from "../Loaders/actionLoader";
// import PageLoader from "../Loaders/pageLoader";
// import {
//   getTripById,
//   getTripsComments,
//   getTripSteps
// } from "../../actions/Trips";
//
//
// class TripDetails extends Component {
//   state = {
//     isLoading: true,
//     isUpdating: false
//   };
//
//   componentDidMount() {
//     const id = this.props.match.params.id;
//     const { getTripById, getTripsComments, getTripSteps } = this.props;
//     getTripById(id)
//       .then(res => {
//         Promise.all([
//           getTripsComments(id),
//           getTripSteps(id)
//         ])
//           .then(temp => {
//             this.setState({
//               trip: {
//                 ...res.payload,
//                 comments: temp[0].payload,
//                 steps: temp[1]
//               },
//               isLoading: false
//             });
//           });
//       });
//   }
//  
//
//   // render() {
//   //   const { trip } = this.props;
//   //   const { isLoading, isUpdating } = this.state;
//   //   return (
//   //     <Fragment>
//   //       {
//   //         (isLoading || isUpdating) &&
//   //         <ActionLoader/>
//   //       }
//   //       {
//   //         (!isLoading && !isUpdating) &&
//   //         <Fragment>
//   //           <SliderWithScroll slide={trip}/>
//   //           <section id="section3" className="tour-list-sidebar tour-list-sidebar-2-col">
//   //             <div className="container-fluid">
//   //               <div className="row">
//   //                 <div className="col-xs-12 col-md-6 col-lg-3 ml-lg-5 ml-sm-3 order-lg-first order-last mt-3 mt-lg-0">
//   //                   <div className="form-container px-3 py-3">
//   //
//   //                     <h4 className="black bold mt-3 px-4 pb-2 text-center">Book this tour</h4>
//   //
//   //                     <form id="sidebar-form" className="px-xl-3 px-lg-3 px-3">
//   //
//   //                       <div className="form-group text-center">
//   //                         <label className="" htmlFor="inputname">Your Name</label>
//   //                         <input type="text" className="form-control" id="inputname" placeholder="John Doe"/>
//   //                       </div>
//   //
//   //                       <div className="form-group text-center">
//   //                         <label className="" htmlFor="inputmail">Email Adress</label>
//   //                         <input type="text" className="form-control" id="inputmail" placeholder="johndoe@gmail.com"/>
//   //                       </div>
//   //                       <div className="form-group text-center">
//   //                         <label className="text-center" htmlFor="inputtours">Tour Interested In</label>
//   //                         <input type="text" className="form-control" id="inputtours"
//   //                                placeholder="Mystical Machu Picchu"/>
//   //                       </div>
//   //                       <div className="form-group text-center departure">
//   //                         <label className="" htmlFor="datepicker">Departure Date</label>
//   //                         <div className="input-group">
//   //                           <input type="text" id="datepicker" placeholder="Choose your Date" className="form-control"/>
//   //                           <div className="input-group-append">
//   //                             <div className="input-group-text"><i className="fas fa-calendar"/></div>
//   //                           </div>
//   //                         </div>
//   //
//   //                       </div>
//   //                       <div className="form-group row">
//   //                         <div className="col-sm-12">
//   //                           <button type="submit" className="btn col-sm-12 my-2 btn-primary">Book Now</button>
//   //                         </div>
//   //                       </div>
//   //                     </form>
//   //
//   //                   </div>
//   //                 </div>
//   //               </div>
//   //             </div>
//   //           </section>
//   //         </Fragment>
//   //       }
//   //
//   //     </Fragment>
//   //   );
//   // }
// }
//
// TripDetails.propTypes = {
//   getTripById: PropTypes.func.isRequired,
//   getTripsComments: PropTypes.func.isRequired,
//   getTripSteps: PropTypes.func.isRequired
// };
//
//
// const initMapStateToProps = state => {
//   return {
//     trip: state.trips.trip,
//     isAuthenticated: !!state.user.id,
//     userId: state.user.id
//   };
// };
//
// export default connect(null, {
//   getTripById,
//   getTripsComments,
//   getTripSteps
// })(TripDetails);

import React, { Component } from "react";

class TripDetails extends Component {
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default TripDetails;