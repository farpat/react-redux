import {ADD_LINE, EDIT_LINE, REMOVE_LINE} from '../actions';

export default (state = {}, action) => {
    let currentAccountLines, accountLines;
    switch (action.type) {
        case ADD_LINE:
            currentAccountLines = state[action.accountId] || {};
            const id = action.lastLineId + 1;
            accountLines = [...currentAccountLines, Object.assign(action.line, {id})];
            return {
                ...state,
                [action.accountId]: accountLines
            };
        case EDIT_LINE:
            accountLines = state[action.accountId].map(function (line) {
                if (line.id === action.id) {
                    line = Object.assign({}, line, action.line);
                }
                return line;
            });
            return {
                ...state,
                [action.accountId]: accountLines
            };
        case REMOVE_LINE:
            accountLines = state[action.accountId].filter(line => line.id !== action.id);
            return {
                ...state,
                [action.accountId]: accountLines
            };
        default:
            return state;
    }
}