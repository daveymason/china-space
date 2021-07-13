import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


function RenderTelescope({ telescope }) {
  return (
    <div className="col-md-5 m-1">
    <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card>
            <CardImg top src={baseUrl + telescope.image} alt={telescope.name} />
            <CardBody>
                <CardText>{telescope.description}</CardText>
            </CardBody>
        </Card>
    </FadeTransform>
</div>
  );
}

function RenderComments({comments}) {

  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Quick Facts</h4>
        < hr/>
                <Stagger in>
                    {
                        comments.map(comment => {
                            return (
                                <Fade in key={comment.id}>
                                    <div>
                                      
                                        <p>
                                        <li>{comment.text}</li>
                                        </p>
                                        
                                    </div>
                                </Fade>
                            );
                        })
                    }
                </Stagger>
        
      </div>
    );
  } else {
    return <div></div>;
  }
}

function TelescopeInfo(props) {
  if (props.isLoading) {
      return (
          <div className="container">
              <div className="row">
                  <Loading />
              </div>
          </div>
      );
  }
  if (props.errMess) {
      return (
          <div className="container">
              <div className="row">
                  <div className="col">
                      <h4>{props.errMess}</h4>
                  </div>
              </div>
          </div>
      );
  }
  if (props.telescope) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/telescope">Telescope</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.telescope.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.telescope.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderTelescope telescope={props.telescope} />
          <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        telescopeId={props.telescope.id}
                    /> 
        </div>
      </div>
    );
  }
  return <div />;
}

export default TelescopeInfo;
