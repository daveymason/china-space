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

function RenderDirectoryItem({ telescope }) {
  return (
    <Card>
      <Link to={`/directory/${telescope.id}`}>
        <CardImg
          width="100%"
          src={baseUrl + telescope.image}
          alt={telescope.name}
        />
        <CardImgOverlay>
          <CardTitle>{telescope.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

function Directory(props) {
  const directory = props.telescopes.telescopes.map((telescope) => {
    return (
      <div key={telescope.id} className="col-md-5 m-1">
        <RenderDirectoryItem telescope={telescope} />
      </div>
    );
  });

  if (props.telescopes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.telescopes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.telescopes.errMess}</h4>
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
              <BreadcrumbItem active>Directory</BreadcrumbItem>
            </Breadcrumb>
            <h2>Directory</h2>
            <hr />
          </div>
        </div>
      </FadeTransform>
      <div className="row">{directory}</div>
    </div>
  );
}

export default Directory;
