import React from "react";
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

function renderComments(comments) {
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
}

export default function DishDetail(props) {
  const dish = props.dish;

  if (dish === null) {
    return <div />;
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
          <ListGroup flush>{renderComments(props.dish.comments)}</ListGroup>
        </div>
      </div>
    </div>
  );
}
