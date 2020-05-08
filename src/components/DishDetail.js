import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderComments(comments) {
    return comments.map(comment => {
      return (
        <ListGroupItem>
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
  }

  render() {
    const dish = this.props.dish;

    if (dish === null) {
      return null;
    }

    return (
      <div className="container">
        <hr />
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
              {this.renderComments(this.props.dish.comments)}
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
