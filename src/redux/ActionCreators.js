import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (telescopeId, rating, author, text) => dispatch => {
    
    const newComment = {
        telescopeId: telescopeId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
};

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});






export const addTelescopes = telescopes => ({
    type: ActionTypes.ADD_TELESCOPES,
    payload: telescopes
});

export const fetchTelescopes = () => dispatch => {
    dispatch(telescopesLoading());

    return fetch(baseUrl + 'telescopes')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(telescopes => dispatch(addTelescopes(telescopes)))
        .catch(error => dispatch(telescopesFailed(error.message)));
};

export const telescopesLoading = () => ({
    type: ActionTypes.TELESCOPES_LOADING
});

export const telescopesFailed = errMess => ({
    type: ActionTypes.TELESCOPES_FAILED,
    payload: errMess
});





export const addSpaceports = spaceports => ({
    type: ActionTypes.ADD_SPACEPORTS,
    payload: spaceports
});

export const fetchSpaceports = () => dispatch => {
    dispatch(spaceportsLoading());

    return fetch(baseUrl + 'spaceports')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(spaceports => dispatch(addSpaceports(spaceports)))
        .catch(error => dispatch(spaceportsFailed(error.message)));
};

export const spaceportsLoading = () => ({
    type: ActionTypes.SPACEPORTS_LOADING
});

export const spaceportsFailed = errMess => ({
    type: ActionTypes.SPACEPORTS_FAILED,
    payload: errMess
});





export const addRovers = rovers => ({
    type: ActionTypes.ADD_ROVERS,
    payload: rovers
});

export const fetchRovers = () => dispatch => {
    dispatch(roversLoading());

    return fetch(baseUrl + 'rovers')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(rovers => dispatch(addRovers(rovers)))
        .catch(error => dispatch(roversFailed(error.message)));
};

export const roversLoading = () => ({
    type: ActionTypes.ROVERS_LOADING
});

export const roversFailed = errMess => ({
    type: ActionTypes.ROVERS_FAILED,
    payload: errMess
});






export const postFeedback = (feedback) => () => {
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
          "Content-Type": "application/json"
        },
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => { 
            console.log('Feedback: ', response); 
            alert('Thank you for your feedback!\n' + JSON.stringify(response));
        })
        .catch(error =>  { 
            console.log('Feedback: ', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        });
};
