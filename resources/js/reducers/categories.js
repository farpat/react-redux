import {ADD_CATEGORY, EDIT_CATEGORY, REMOVE_CATEGORY} from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            const id = state.length + 1;
            return {
                ...state,
                [id]: {id, label: action.label}
            };
        case EDIT_CATEGORY:
            return {
                ...state,
                [action.id]: {id: action.id, label: action.label}
            };
        case REMOVE_CATEGORY:
            return state.filter(category => category.id !== action.id);
        default:
            return state;
    }
}