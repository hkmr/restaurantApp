import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  Col,
  Label
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
  handleSubmit = values => {
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.username,
      values.comment
    );
    // console.log(JSON.stringify(values));
  };

  render() {
    // console.log("ADD FORM: " + this.props.addComment);
    return (
      <div className="container">
        <ModalHeader>Add Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={values => this.handleSubmit(values)}>
            <Row className="form-group">
              <Col>
                <Label className="font-weight-bold" htmlFor="rating">
                  Rating
                </Label>
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  placeholder="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label className="font-weight-bold" htmlFor="username">
                  Full Name
                </Label>
                <Control.text
                  model=".username"
                  id="username"
                  name="username"
                  placeholder="User Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".username"
                  show="touched"
                  messages={{
                    required: "Please Enter your name",
                    minLength: "Must be greater than 3 characters",
                    maxLength: "Must be less than 15 characters"
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label className="font-weight-bold" htmlFor="comment">
                  Your Comment
                </Label>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  placeholder="Your Comments"
                  className="form-control"
                  rows="6"
                  validators={{ required }}
                />
                <Errors
                  className="text-danger"
                  model=".comment"
                  show="touched"
                  messages={{
                    required: "Please provide your comment"
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </div>
    );
  }
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }
  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  renderComment = comments => {
    return comments.map(comment => {
      return (
        <ListGroupItem key={comment.id}>
          <ListGroupItemHeading>{comment.comment}</ListGroupItemHeading>
          <ListGroupItemText>
            -- {comment.author} ,
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit"
            }).format(new Date(Date.parse(comment.date)))}
          </ListGroupItemText>
        </ListGroupItem>
      );
    });
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMsg) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.errMsg}</h4>
          </div>
        </div>
      );
    } else if (this.props.dish != null) {
      const dish = this.props.dish;
      return (
        <div className="container">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to={"/menu"}>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <hr />
          <div className="row m-1">
            <div className="col-md-5">
              <h2>{this.props.dish.name}</h2>
            </div>
          </div>
          <div className="row m-1">
            <div className="col-md-5">
              <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col-md-5">
              <h1 className="display-3">Comments</h1>
              <ListGroup flush>
                {this.renderComment(this.props.comments)}
              </ListGroup>
              <Button
                className="mt-3 mb-3"
                color="success"
                onClick={this.toggleModal}
                outline
              >
                Add Comment
              </Button>
            </div>
          </div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <CommentForm
              dishId={this.props.dish.id}
              addComment={this.props.addComment}
            />
          </Modal>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default DishDetail;
