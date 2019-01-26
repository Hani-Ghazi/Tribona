import React from "react";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { closeLoginModal } from "../../actions/Modals";


const ShouldLoginModal = ({ isOpen, closeLoginModal }) => (
  <Modal classNames={{ modal: "rounded-modal" }} open={isOpen} onClose={() => closeLoginModal()} center>
    <h2>Note</h2>
    <p>Please Login first</p>
  </Modal>
);


const initMapStateToProps = state => {
  return { isOpen: !!state.modals.isLoginModalOpen };
};

export default connect(initMapStateToProps, { closeLoginModal })(ShouldLoginModal);