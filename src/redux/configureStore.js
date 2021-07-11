import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Telescopes } from './telescopes';
import { Comments } from './comments';
import { Partners } from './partners';
import { Spaceports } from './spaceports';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';



export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            telescopes: Telescopes,
            comments: Comments,
            partners: Partners,
            spaceports: Spaceports,
            ...createForms({
                feedbackForm: InitialFeedback
            })
        }),       
        applyMiddleware(thunk, logger)
    );
   

    return store;
};