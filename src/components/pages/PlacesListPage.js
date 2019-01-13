import React, { Component } from "react";
import CountryFilter from "../filters/CountryFilter";
import { FaGlobeAsia } from "react-icons/fa";

class PlacesListPage extends Component {

  renderCategoriesFilter = (placesCategories) => {
    return (
      <div className="more-info tags my-4">
        <h6 className="black semibold text-center mx-4 mt-3 mb-3 info-title">Popular Places Categories</h6>
        <div className="text-center px-3 px-lg-2 pb-3 ">
          {
            (placesCategories || [])
              .map(
                category =>
                  <a className="btn btn-outline-primary px-3  mr-1 mb-1 btn-sm " href="#"
                     role="button">{category.nameEn}</a>
              )
          }
        </div>
      </div>
    );
  };

  render() {
    const { places, placesCategories } = this.props;
    return (
      <section id="section3" className="tour-list-sidebar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-3 order-lg-first order-last mt-3 mt-lg-0">
              <div className="form-container py-3">
                <h4 className="black bold mt-3 px-4 pb-2 text-center">Search your Places</h4>
                <form id="sidebar-form" className="px-4">
                  <div className="form-group row">
                    <div className="col-sm-12">
                      <div className="input-group">
                        <input type="email" className="form-control" id="inputEmail3" placeholder="Search Places"/>
                        <div className="input-group-append">
                          <div className="input-group-text"><i className="fa fa-search"/></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-12">
                      <div className="input-group">
                        <CountryFilter/>
                        <div className="input-group-append">
                          <div className="input-group-text"><FaGlobeAsia/></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.renderCategoriesFilter(placesCategories)}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PlacesListPage;