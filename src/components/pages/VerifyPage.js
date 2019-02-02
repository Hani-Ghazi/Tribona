import React, { Component, Fragment } from "react";
import Header from "../header";
import bgImage from "../../assets/login/images/bg-01.jpg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../actions/Auth";


class VerifyPage extends Component {
  state = {
    data: {
      email: "",
      verificationToken: "",
      code: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.setState({
      data: { ...this.state.data, verificationToken: this.props.verificationToken, email: this.props.email || "" }
    });
  }

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value },
    errors: { ...this.state.errors, [e.target.name]: null }
  });

  onSubmit = (e) => {
    e.preventDefault();

    this.props.verify(this.state.data).then(() => this.props.history.push("/"));
  };

  render() {
    return (
      <Fragment>
        {/*<Header/>*/}
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="wrap-login100">
              <form className="login100-form validate-form" onSubmit={this.onSubmit}>
              <span className="dis-block text-center w-100">
                <img src={require("../../assets/images/logo.png")} alt="logo"
                     className={"img-fluid dis-block m-auto w-50"}/>
              </span>
                <p className={"p-t-50 dis-block p-t-60 white"}>Please enter the code you got on your email</p>
                <div className={`wrap-input100 validate-input`}>
                  <input className="input100" type="text" name="code" placeholder="Code"
                         autoComplete="new-password" onChange={this.onChange}/>
                  <span className="focus-input100" data-placeholder=""/>
                </div>
                <div className="container-login100-form-btn" style={{ justifyContent: "flex-end" }}>
                  <button className="login100-form-btn">
                    Send
                  </button>
                </div>
                <div className="container-login100-form-btn p-t-30">
                  <p>
                    If you didn't receive an email please check your email and try again. <Link to={"/forget-password"}
                                                                                                className={"white"}>
                    Re-Send Email
                  </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

VerifyPage.propTypes = {
  email: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    verificationToken: state.user.verificationToken
  };
};

export default connect(mapStateToProps, { verify })(VerifyPage);