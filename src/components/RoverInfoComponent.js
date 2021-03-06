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


function RenderRover({ rover }) {
  return (
    <div className="col-md-5 m-1">
    <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card>
            <CardImg top src={baseUrl + rover.image} alt={rover.name} />
            <CardBody>
                <CardText>{rover.description}</CardText>
            </CardBody>
        </Card>
    </FadeTransform>
</div>
  );
}

function RenderComments({comments, postComment, roverId}) {

  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
                <Stagger in>
                    {
                        comments.map(comment => {
                            return (
                                <Fade in key={comment.id}>
                                    <div>
                                        <p>
                                            {comment.text}<br />
                                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                        </p>
                                    </div>
                                </Fade>
                            );
                        })
                    }
                </Stagger>
        <CommentForm roverId={roverId} postComment={postComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RoverInfo(props) {
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
  if (props.rover) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/rover">Rover</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.rover.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.rover.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderRover rover={props.rover} />
          <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        roverId={props.rover.id}
                    /> 
        </div>
      </div>
    );
  }
  return <div />;
}

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      rating: '',
      author: "",
      text: ""
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.roverId, values.rating, values.author, values.text);
}

  render() {
    return (
      <React.Fragment>
        <Button outline color="secondary" onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg" /> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Col md={12}>
                  <Label for="rating">Rating</Label>
                  <Control.select
                    model=".rating"
                    name="rating"
                    id="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={12}>
                  <Label for="author">Your Name</Label>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    className="form-control"
                    validators={{
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    component="div"
                    messages={{
                      minLength: "Must be at least 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={12}>
                  <Label for="text">Comment</Label>
                  <Control.textarea
                    model=".text"
                    id="text"
                    name="text"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={12}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default RoverInfo;
