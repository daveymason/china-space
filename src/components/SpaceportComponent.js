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

function RenderSpaceportItem({ spaceport }) {
  return (
    <Card>
      <Link to={`/spaceport/${spaceport.id}`}>
        <CardImg
          width="100%"
          src={baseUrl + spaceport.image}
          alt={spaceport.name}
        />
        <CardImgOverlay>
          <CardTitle>{spaceport.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

function Spaceport(props) {
  const spaceport = props.spaceports.spaceports.map((spaceport) => {
    return (
      <div key={spaceport.id} className="col-md-5 m-1">
        <RenderSpaceportItem spaceport={spaceport} />
      </div>
    );
  });

  if (props.spaceports.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.spaceports.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.spaceports.errMess}</h4>
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
              <BreadcrumbItem active>Spaceports</BreadcrumbItem>
            </Breadcrumb>
            <h2>Spaceports</h2>
            <hr />
          </div>
        </div>
      </FadeTransform>
      <div className="row">{spaceport}</div>
    </div>
  );
}

export default Spaceport;
