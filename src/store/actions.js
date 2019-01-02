import * as actionTypes from './actionTypes';

//action creator is a function that returns an action object
export const deleteLink = () => {
    return {
        type: actionTypes.DELETE_LINK,
    };
};
