import React, { Component } from "react";
import { Modal, ModalHeader } from "reactstrap";

class CommentForm extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader>Comment</ModalHeader>
      </Modal>
    );
  }
}

export default CommentForm;
