import React, { Component } from "react";
import Icon from "@mdi/react";
import { mdiAccountMultipleCheck } from "@mdi/js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { followUser, unFollowUser } from "../../actions/User";

class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowOwner: props.isFollowOwner,
      userId: props.userId
    };
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
    return (
      <Icon path={mdiAccountMultipleCheck}
            size={1.5}
            horizontal
            rotate={180}
            className="pointer"
            onClick={this.onFollowChange}
            vertical
            color={isFollowOwner ? "#ff4f81" : ""}
      />
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