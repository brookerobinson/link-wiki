import * as actionTypes from './actionTypes';

const initialState = {
    links: [
        {name: "Link 1", url: "URL 1", details: "This is Link 1", dateCreated: "Today", dateModified: "Today"},
        {name: "Link 2", url: "URL 2", details: "This is Link 2", dateCreated: "Today", dateModified: "Today"},
        {name: "Link 3", url: "URL 3", details: "This is Link 3", dateCreated: "Today", dateModified: "Today"},
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DELETE_LINK:
            const updatedLinks = state.links;
            updatedLinks.splice(action.link, 1);
            return {
                ...state,
                links: updatedLinks
            }
        default:
            return state;
    }
}

export default reducer;