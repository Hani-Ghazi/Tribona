import React, { Fragment, Component } from "react";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { closeLoginModal } from "../../actions/Modals";
import { login, loginViaFacebook, loginViaGoogle } from "../../actions/Auth";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { FaFacebookF } from "react-icons/fa";
import TwitterLogin from "react-twitter-auth";
import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import { USER_LOGGED_IN } from "../../types";
import { toast } from "react-toastify";

const { REACT_APP_FACEBOOK_APP_ID, REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_GOOGLE_REDIRECT_URI } = process.env;


class ShouldLoginModal extends Component {

  state = {
    data: {
      email: "",
      password: ""
    },
    facebookData: {
      access_token: null
    },
    googleData: {
      access_token: null,
      refresh_token: null
    },
    loading: false,
    errors: {}
  };


  constructor(props) {
    super(props);
  }


  submitLogin = data => this.props.login(data).then((user) => {
    if (user.type === USER_LOGGED_IN) {
      toast.success("Welcome Back, Nice to meet you again!", {
        hideProgressBar: true
      });
      this.props.closeLoginModal("/");
    }
  });

  responseFacebook = (res) => {
    if (!res.error) {
      this.setState({ facebookData: { access_token: res.accessToken } }, () => {
        this.props.loginViaFacebook(this.state.facebookData).then(() => {
          toast.success("Welcome Back, Nice to meet you again!", {
            hideProgressBar: true
          });
          this.props.closeLoginModal("/");
        });
      });
    }
  };

  responseGoogle = (res) => {
    if (!res.error) {
      this.setState({ googleData: { access_token: res.accessToken } }, () => {
        this.props.loginViaGoogle(this.state.googleData).then(() => {
          toast.success("Welcome Back, Nice to meet you again!", {
            hideProgressBar: true
          });
          this.props.closeLoginModal("/");
        });
      });
    }
  };

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value },
    errors: { ...this.state.errors, [e.target.name]: null }
  });


  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    if (isEmpty(errors)) {
      this.submitLogin(this.state.data);
    } else {
      this.setState({ errors });
    }
  };

  validate = (data) => {
    const errors = {};
    if (!data.password) errors.password = `Password can't be blank`;
    if (!data.email) errors.email = `Email can't be blank`;
    else if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
    return errors;
  };

  render() {
    const { isOpen, closeLoginModal } = this.props;
    const { data } = this.state;
    return (
      !
        isOpen
        ?
        <Fragment/>
        :
        <Modal classNames={{ modal: "rounded-modal" }} open={isOpen} onClose={() => closeLoginModal()} center>
          <div className="card card-signin">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <form className="form-signin">
                <div className="form-group text-left">
                  <label htmlFor="inputEmail">Email address</label>
                  <input type="email" id="inputEmail" className="form-control" placeholder="Email address" name="email"
                         required value={data.email} onChange={this.onChange}
                         autoFocus/>
                </div>

                <div className="form-group text-left">
                  <label htmlFor="inputPassword">Password</label>
                  <input type="password" id="inputPassword" value={data.password} name="password"
                         className="form-control" placeholder="Password"
                         required onChange={this.onChange}/>
                </div>

                <a className="btn btn-lg btn-primary btn-block text-uppercase"
                   onClick={(e) => this.onSubmit(e)}>
                  SignIn
                </a>
                <hr className="my-4"/>
                <h4 className="text-center">Or Login with</h4>
                <div className="text-center">
                  <GoogleLogin
                    clientId={REACT_APP_GOOGLE_CLIENT_ID}
                    redirectUri={REACT_APP_GOOGLE_REDIRECT_URI}
                    buttonText=""
                    className="social-icon"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                  />
                  <FacebookLogin
                    appId={REACT_APP_FACEBOOK_APP_ID}
                    cssClass="social-icon facebok-icon"
                    size="small"
                    textButton=""
                    icon={<FaFacebookF/>}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    autoLoad={false}
                  />
                  <TwitterLogin
                    loginUrl="http://localhost:4000/api/v1/auth/twitter"
                    onFailure={this.responseGoogle} onSuccess={this.responseGoogle}
                    requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
                    text=""
                    className="social-icon"
                  />
                </div>
              </form>
            </div>
          </div>
        </Modal>
    );
  }
}


const initMapStateToProps = state => {
  return { isOpen: !!state.modals.isLoginModalOpen };
};

export default connect(initMapStateToProps, {
  closeLoginModal,
  login,
  loginViaFacebook,
  loginViaGoogle
})(ShouldLoginModal);