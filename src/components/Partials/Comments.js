import React, { Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";


const { REACT_APP_PUBLIC_FILES } = process.env;

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

  renderComments = (comments) =>
    <div className="card comments-container  max-w-100">
      <div className="card-body">
        {
          comments.map(comment => <div className="row comment">
            <div className="col-md-2">
              <img src={REACT_APP_PUBLIC_FILES + (comment.ownerImage || "files-1547673340162.jpeg")}
                   className="img img-rounded img-fluid img-border" alt="user owner"/>
              <p
                className="text-secondary text-center small">{moment().diff(moment(comment.createdAt), "minutes")} minutes
                ago</p>
            </div>
            <div className="col-md-10 align-self-center">
              <p>
                <a className="float-left"
                   href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>{comment.ownerName}</strong></a>
              </p>
              <div className="clearfix"/>
              <p>{comment.text}</p>
            </div>
          </div>)
        }
      </div>
    </div>;

  render() {
    const { comments, onAdd } = this.props;
    const { comment } = this.state.data;
    const commentsCount = comments ? comments.length : 0;
    return (
      <Fragment>
        {
          !!commentsCount && this.renderComments(comments)
        }
        <div className="col-md-12 pt-3 pb-3" id="pagesection">
          {
            !commentsCount &&
            "No comments yet, please be the first"
          }
          <div className="form-group">
            <label htmlFor="form_message">Message *</label>
            <textarea id="form_message" name="comment" className="form-control"
                      placeholder="What tour are you interested in? *" rows="4"
                      required="required" value={comment}
                      onChange={this.onChange}
                      data-error="Please,leave us a message."/>
            <div className="help-block with-errors tiny mt-2"/>
          </div>
          <button className="btn btn-primary px-4 btn-send pull-r"
                  onClick={() => {
                    onAdd(comment);
                    this.setState({ data: { comment: "" } });
                  }}>Comment
          </button>
        </div>
      </Fragment>
    );
  };
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired
};


export default Comments;