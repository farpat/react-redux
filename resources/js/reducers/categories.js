import {ADD_CATEGORY, EDIT_CATEGORY, REMOVE_CATEGORY} from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            const id = state.length + 1;
            return Object.assign({}, state, {[id]: {id, label: action.label}});
        case EDIT_CATEGORY:
            return Object.assign({}, state, {[action.id]: {id: action.id, label: action.label}});
        case REMOVE_CATEGORY:
            const categories = Object.assign({}, state);
            delete categories[action.id];
            return categories;
        default:
            return state;
    }
}