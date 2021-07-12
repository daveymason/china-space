import React, { Component } from 'react';
import Telescope from './TelescopeComponent';
import Rover from './RoverComponent';
import Spaceport from './SpaceportComponent';
import TelescopeInfo from './TelescopeInfoComponent';
import RoverInfo from './RoverInfoComponent';
import SpaceportInfo from './SpaceportInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchTelescopes, fetchComments, fetchSpaceports, fetchRovers, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        telescopes: state.telescopes,
        comments: state.comments,
        rovers: state.rovers,
        spaceports: state.spaceports
    };
};

const mapDispatchToProps = {
    postComment: (telescopeId, rating, author, text) => (postComment(telescopeId, rating, author, text)),
    fetchTelescopes: () => (fetchTelescopes()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchSpaceports: () => (fetchSpaceports()),
    fetchRovers: () => (fetchRovers()),
    postFeedback: (feedback) => (postFeedback(feedback)),
};

class Main extends Component {

    componentDidMount() {
        this.props.fetchTelescopes();
        this.props.fetchComments();
        this.props.fetchSpaceports();
        this.props.fetchRovers();
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                telescope={this.props.telescopes.telescopes.filter(telescope => telescope.featured)[0]}
                telescopesLoading={this.props.telescopes.isLoading}
                telescopesErrMess={this.props.telescopes.errMess}
                spaceport={this.props.spaceports.spaceports.filter(spaceport => spaceport.featured)[0]}
                spaceportLoading={this.props.spaceports.isLoading}
                spaceportErrMess={this.props.spaceports.errMess}
                rover={this.props.rovers.rovers.filter(rover => rover.featured)[0]}
                roversLoading={this.props.rovers.isLoading}
                roversErrMess={this.props.rovers.errMess}
            />
            );
        }

        const TelescopeWithId = ({match}) => {
            return (
                <TelescopeInfo 
                telescope={this.props.telescopes.telescopes.filter(telescope => telescope.id === +match.params.telescopeId)[0]}
                isLoading={this.props.telescopes.isLoading}
                errMess={this.props.telescopes.errMess}
                comments={this.props.comments.comments.filter(comment => comment.telescopeId === +match.params.telescopeId)}
                commentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment}
            />
            );
        };

        const RoverWithId = ({match}) => {
            return (
                <RoverInfo 
                rover={this.props.rovers.rovers.filter(rover => rover.id === +match.params.roverId)[0]}
                isLoading={this.props.rovers.isLoading}
                errMess={this.props.rovers.errMess}
            />
            );
        };

        const SpaceportWithId = ({match}) => {
            return (
                <SpaceportInfo 
                spaceport={this.props.spaceports.spaceports.filter(spaceport => spaceport.id === +match.params.spaceportId)[0]}
                isLoading={this.props.spaceports.isLoading}
                errMess={this.props.spaceports.errMess}
            />
            );
        };

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/telescopes' render={() => <Telescope telescopes={this.props.telescopes} />} />
                            <Route path='/telescope/:telescopeId' component={TelescopeWithId} />
                            <Route exact path='/spaceports' render={() => <Spaceport spaceports={this.props.spaceports} /> } />
                            <Route path='/spaceport/:spaceportId' component={SpaceportWithId} />
                            <Route exact path='/rovers' render={() => <Rover rovers={this.props.rovers} />} />
                            <Route path='/rover/:roverId' component={RoverWithId} />
                            <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} /> } />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));