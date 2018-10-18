import {CHANGE_ACCOUNT, CHANGE_CUSTOMER, CHANGE_TAB} from "../actions";

export default (state = {}, action) => {
    switch (action.type) {
        case CHANGE_TAB:
            return Object.assign({}, state, {currentTab: action.tab});
        case CHANGE_CUSTOMER:
            return Object.assign({}, state, {accountTab: {customerId: action.id, accountId: null}});
        case CHANGE_ACCOUNT:
            const accountTab = Object.assign({}, state.accountTab, {accountId: action.id});
            return Object.assign({}, state, {accountTab});
        default:
            return state;
    }
}