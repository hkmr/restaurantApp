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
  ListGroupItemText,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { Link } from "react-router-dom";

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
  console.log("Dish Detail");
  const dish = props.dish;

  if (dish === null) {
    return <div />;
  }

  return (
    <div className="container">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/home">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={"/menu"}>Menu</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
      </Breadcrumb>
      <hr />
      <div className="row m-1">
        <div className="col-md-5">
          <h2>{props.dish.name}</h2>
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
          <ListGroup flush>{renderComments(props.comments)}</ListGroup>
        </div>
      </div>
    </div>
  );
}
