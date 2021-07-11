import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";

function RenderRoverItem({ rover }) {
  return (
    <Card>
      <Link to={`/rover/${rover.id}`}>
        <CardImg
          width="100%"
          src={baseUrl + rover.image}
          alt={rover.name}
        />
        <CardImgOverlay>
          <CardTitle>{rover.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

function Rover(props) {
  const rover = props.rovers.rovers.map((rover) => {
    return (
      <div key={rover.id} className="col-md-5 m-1">
        <RenderRoverItem rover={rover} />
      </div>
    );
  });

  if (props.rovers.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.rovers.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.rovers.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(2.1) translateX(-50%)",
        }}
      >
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/home">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Rovers</BreadcrumbItem>
            </Breadcrumb>
            <h2>Rovers</h2>
            <hr />
          </div>
        </div>
      </FadeTransform>
      <div className="row">{rover}</div>
    </div>
  );
}

export default Rover;
