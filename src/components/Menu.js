import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import { baseUrl } from "../shared/baseUrl";

class Menu extends Component {
  render() {
    const menu = this.props.dishes.dishes.map(dish => {
      console.log(dish.name);
      return (
        <div className="col-12 col-md-5 m-1">
          <Card key={dish.id}>
            <Link to={`/menu/${dish.id}`}>
              <CardImg
                width="100%"
                src={baseUrl + dish.image}
                alt={dish.name}
              />
              <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
              </CardImgOverlay>
            </Link>
          </Card>
        </div>
      );
    });

    if (this.props.dishes.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.dishes.err) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.dishes.msg}</h4>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/home">Home </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Menu</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>Menu</h3>
              <hr />
            </div>
          </div>
          <div className="row">{menu}</div>
        </div>
      );
    }
  }
}

export default Menu;
