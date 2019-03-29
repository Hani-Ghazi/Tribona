import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { DetailedRate, Like, ImagesGallery, Comments } from "../Partials";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { openLoginModal } from "../../actions/Modals";
import {
  stepToggleLike,
  getStepsComments,
  rateStep,
  stepComment,
  deleteStepComment
} from "../../actions/Trips";
import {PageLoader}from "../Loaders";

class TripStep extends React.Component {
  state = {
    step: null,
    isLoading: true
  };

  constructor(props) {
    super(props);
    this.state.step = props.step;
    props.getStepsComments(props.step.id)
      .then(comments => this.setState({ comments, isLoading: false }));
  }

  changeStepLikeStatus = () => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
    let { id, isLiked } = this.state.step;
    this.props.stepToggleLike({ id, isLiked }).then(() => {
      this.setState({
        step: {
          ...this.state.step,
          isLiked: !isLiked,
          likesCount: isLiked ? this.state.step.likesCount - 1 : this.state.step.likesCount + 1
        }
      });
      toast.success(`You successfully ${isLiked ? "unlike" : "like"} this step`, {
        hideProgressBar: true
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.step) {
      this.setState({ step: nextProps.step });
      this.props.getStepsComments(nextProps.step.id)
        .then(comments => this.setState({ comments, isLoading: false }));
    }
  }

  onComment = (text) => {
    const { isAuthenticated, getStepsComments } = this.props;
    if (!isAuthenticated) {
      return this.props.openLoginModal();
    }
    const { step } = this.state;
    this.setState({ isLoading: true });
    this.props.stepComment(step.id, { text }).then(() => {
      toast.success(`Comment successfully added`, {
        hideProgressBar: true
      });
      getStepsComments(step.id).then(comments => this.setState({
        comments,
        isLoading: false
      }));
    });
  };

  onRemoveComment = (commentId) => {
    const { deleteStepComment, getStepsComments } = this.props;
    const { step: { id } } = this.state;
    this.setState({ isLoading: true });
    deleteStepComment(id, commentId)
      .then(() => {
        toast.success(`Comment successfully deleted`, {
          hideProgressBar: true
        });
        getStepsComments(id)
          .then(comments => {
              this.setState({ comments, isUpdating: false });
            }
          );
      });
  };

  render() {
    const { step, step: { images }, comments, isLoading } = this.state;
    if (isLoading) {
      return <PageLoader/>;
    }
    return (
      <Fragment>
        <div className="row steps-details">
          <div className="col has-right-line">
            <h6 className="black bold mt-4 mb-3 underline-title">Step's Place
              <span className={"pull-right"}>
                  {step.likesCount} <Like isLike={!!step.isLiked} onChange={this.changeStepLikeStatus} size={"1em"}/>
              </span>
            </h6>
            <p>{step.place.name}</p>

            {
              !!images.length &&
              <Fragment>
                <h6 className="underline-title">Images</h6>
                <ImagesGallery images={images}/>
              </Fragment>
            }

            <h6 className="black bold mt-4 mb-3 underline-title">Step's Description</h6>
            <p>{step.description}</p>
            <h6 className="underline-title">Step's Review Details</h6>
            <DetailedRate ratings={step.ratings} ratingsAvg={step.ratingsAvg}/>
          </div>
          <div className={"col"}>
            <h6 className={"black bold mt-4 mb-3 underline-title"}>Comments</h6>
            <Comments comments={comments || []} onAdd={this.onComment}
                      onRemove={this.onRemoveComment}/>
          </div>
        </div>
      </Fragment>
    );
  }
}

TripStep.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  stepToggleLike: PropTypes.func.isRequired,
  getStepsComments: PropTypes.func.isRequired,
  rateStep: PropTypes.func.isRequired,
  stepComment: PropTypes.func.isRequired,
  deleteStepComment: PropTypes.func.isRequired
};


const initMapStateToProps = state => {
  return {
    isAuthenticated: !!state.user.id
  };
};

export default connect(initMapStateToProps, {
  openLoginModal,
  stepToggleLike,
  getStepsComments,
  rateStep,
  stepComment,
  deleteStepComment
})(TripStep);
