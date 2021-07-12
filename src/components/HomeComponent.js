import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';
import { Jumbotron, Button } from 'reactstrap';

const Introtron = (props) => {
    return (
        <div>
          <Jumbotron className="introtron">
            <h2 className="display-3">Welcome</h2>
            <p className="lead">You can find some information about some of China's space technology here.</p>
            <hr className="my-2" />
            <p>This site started as a fun side project to learn React and therefor all information here was pulled from Wikipedia and should not be expected to be updated. </p>
            <p className="lead">
              <Button color="warning" href="#featured">Got it, Let's go!</Button>
            </p>   
          </Jumbotron>
        </div>
      );
};


function Home(props) {
    return (
        <div>
            <Introtron />
            <div id='featured'/>
        
        <div className="container cardLike" >
            <h2> Featured</h2>
            <hr/>
            <div className="row">
                <div className="col-md m-1">
                <RenderCard
                        item={props.telescope}
                        isLoading={props.telescopesLoading}
                        errMess={props.telescopesErrMess}
                    />
                </div>
                <div className="col-md m-1">
                <RenderCard
                        item={props.spaceport}
                        isLoading={props.spaceportLoading}
                        errMess={props.spaceportErrMess}
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard 
                    item={props.rover}
                    isLoading={props.roversLoading}
                    errMess={props.roversErrMess}
                    />
                </div>
            </div>
        </div>
        </div>
    );
}

function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return <h4>{errMess}</h4>;
    }
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.1) translateY(50%)'
            }}>
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

export default Home;  