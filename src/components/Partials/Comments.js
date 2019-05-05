import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { FaRegTrashAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { parseDate } from "../../utils";

const { REACT_APP_PUBLIC_FILES } = process.env;
const defaultAvatar = require("../../assets/images/avatar.jpeg");

class Comments extends React.Component {
  state = {
    data: {
      comment: ""
    }
  };

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value },
    errors: { ...this.state.errors, [e.target.name]: null }
  });

  renderComment = (comment, key) => {
    const { isAuthenticated, onRemove, userId } = this.props;
    return (
      <li key={key}>
        <div className="comment-main-level mb-4">

          <div className="comment-avatar d-none d-md-block"><img
            src={comment.ownerImage ? REACT_APP_PUBLIC_FILES + comment.ownerImage : defaultAvatar} alt="user owner"/>
          </div>
          <div className="comment-box">
            <div className="comment-head">
              <h6 className="comment-name "><a href="#">comment.ownerName</a></h6>
              <div className="text-left">
                <br className="hidebr"/>
                <span className="time-review">{parseDate(comment.createdAt)}</span>
                {
                  isAuthenticated && comment.ownerId === userId &&
                  <span className={"pull-right"}>
                    <FaRegTrashAlt
                      size={"1.5em"} className="pointer"
                      color="#e40a22"
                      onClick={() => onRemove(comment.id)}/>
                  </span>
                }
              </div>
            </div>
            <div className="comment-content">{comment.text}</div>
          </div>
        </div>
      </li>
    );
  };

  render() {
    const { comments, onAdd } = this.props;
    const { comment } = this.state.data;
    const commentsCount = comments ? comments.length : 0;
    return (
      <div className="comments-container">
        {
          !commentsCount &&
          <h6 className="bold mt-5 black">There are no comments yet!. please be the first</h6>
        }
        <ul id="comments-list" className="comments-list">
          {
            !!commentsCount && comments.map((comment, key) => this.renderComment(comment, key))
          }
        </ul>
        <div className="mt-5 form-comment">
          <div className="row mt-3">
            <div className="col-12 ">
              <div className="form-group text-center">
                <textarea className="form-control" placeholder="Write a detailed review" name="comment"
                          rows="5" value={comment} onChange={this.onChange}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="w-100">
              <button type="submit" className="btn my-2 btn-primary mb-lg-0 mb-4 float-r" onClick={() => {
                onAdd(comment);
                this.setState({ data: { comment: "" } });
              }}>Comment!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userId: PropTypes.string
};


const initMapStateToProps = state => {
  return { isAuthenticated: !!state.user.id, userId: state.user.id };
};

export default connect(initMapStateToProps)(Comments);