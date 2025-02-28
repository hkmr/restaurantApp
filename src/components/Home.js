import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Loading } from "./Loading";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";

function RenderCard({ item, isLoading, errMsg }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMsg) {
    return <h4>{errMsg}</h4>;
  } else {
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)"
        }}
      >
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name} height="450px" />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? (
              <CardSubtitle>{item.designation}</CardSubtitle>
            ) : null}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  }
}

function Home(props) {
  // console.log("Home");
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMsg={props.dishErrMsg}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promosLoading}
            errMsg={props.promosErrMsg}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.leaders}
            isLoading={props.leadersLoading}
            errMsg={props.leadersErrMsg}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
