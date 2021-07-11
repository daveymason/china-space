import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import TelescopeInfo from './TelescopeInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchTelescopes, fetchComments, fetchSpaceports, fetchPartners, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';



const mapStateToProps = state => {
    return {
        telescopes: state.telescopes,
        comments: state.comments,
        partners: state.partners,
        spaceports: state.spaceports
    };
};

const mapDispatchToProps = {
    postComment: (telescopeId, rating, author, text) => (postComment(telescopeId, rating, author, text)),
    fetchTelescopes: () => (fetchTelescopes()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchSpaceports: () => (fetchSpaceports()),
    fetchPartners: () => (fetchPartners()),
    postFeedback: (feedback) => (postFeedback(feedback)),
};

class Main extends Component {

    componentDidMount() {
        this.props.fetchTelescopes();
        this.props.fetchComments();
        this.props.fetchSpaceports();
        this.props.fetchPartners();
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
                partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
                partnersLoading={this.props.partners.isLoading}
                partnersErrMess={this.props.partners.errMess}
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

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/directory' render={() => <Directory telescopes={this.props.telescopes} />} />
                            <Route path='/directory/:telescopeId' component={TelescopeWithId} />
                            <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} /> } />
                            <Route exact path='/aboutus' render={() => <About partners={this.props.partners} /> } />
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