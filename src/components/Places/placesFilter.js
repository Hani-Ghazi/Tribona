import React from "react";
import { FaGlobeAsia } from "react-icons/fa";
import { getPlaces } from "../../actions/Places";
import { Select, AutoCompleteInput } from "../Partials";
import api from "../../api/places";
import { connect } from "react-redux";


class placesFilter extends React.Component {


  state = {
    data: {
      countryId: undefined,
      categoryId: undefined
    },
    categories: []
  };

  getPlaces = () => {
    const { data } = this.state;
    this.props.getPlaces({ filters: data });
  };

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value },
    errors: { ...this.state.errors, [e.target.name]: null }
  }, this.getPlaces);

  componentDidMount() {
    api.getPlacesCategories()
      .then(categories => {
        this.setState({ categories });
      });
  }

  renderCategoriesFilter = () => {
    const { categories, data: { categoryId } } = this.state;
    return (
      <div className="more-info tags my-4">
        <h6 className="black semibold text-center mx-4 mt-3 mb-3 info-title">Popular Places Categories</h6>
        <div className="text-center px-3 px-lg-2 pb-3 ">
          {
            (categories || [])
              .map((category, k) =>
                <div
                  className={`btn btn-outline-primary px-3  mr-1 mb-1 btn-sm ${category.id === categoryId && "active-category"}`}
                  onClick={(e) => this.onChange({
                    target: {
                      name: "categoryId",
                      value: category.id
                    }
                  })} key={k}
                  role="button">{category.nameEn}</div>
              )
          }
        </div>
      </div>
    );
  };

  render() {
    return (<div className="form-container py-3">
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
            <div className="col-sm-12 autoComplete-container">
              <AutoCompleteInput
                list={this.props.countries} placeholder={"Select Country"} labelKey={"countryName"}
                onChange={e => this.onChange({ target: { name: "countryId", value: e.geonameId } })}/>
            </div>
          </div>
          {this.renderCategoriesFilter()}
        </form>
      </div>
    );
  }
};

const initMapStateToProps = state => {
  return {
    countries: state.countries
  };
};

export default connect(initMapStateToProps, { getPlaces })(placesFilter);