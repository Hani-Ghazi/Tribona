import React, { Component } from "react";
import Icon from "@mdi/react";
import { mdiAccountMultipleCheck } from "@mdi/js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaUserPlus } from "react-icons/fa";
import { followUser, unFollowUser } from "../../actions/User";

class Follow extends Component {
  state = {};

  componentDidMount() {
    this.setState({
      isFollowOwner: this.props.isFollowOwner,
      userId: this.props.userId
    });
  }

  onFollowChange = () => {
    const { isFollowOwner, userId } = this.state;
    (isFollowOwner ? this.props.followUser(userId) : this.props.unFollowUser(userId))
      .then(() => {
        this.setState({ isFollowOwner: !isFollowOwner });
        if (this.props.cb) {
          this.props.cb(!isFollowOwner);
        }
      });
  };


  render() {
    const { isFollowOwner } = this.state;
    const { size } = this.props;
    return (
      <FaUserPlus
        size={size || "2em"} className="pointer" onClick={this.onFollowChange}
        color={isFollowOwner ? "#1a6bc4" : undefined}/>
    );
  }
}

Follow.propTypes = {
  isFollowOwner: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  unFollowUser: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  cb: PropTypes.func
};

export default connect(null, { followUser, unFollowUser })(Follow);