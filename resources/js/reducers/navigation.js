import {CHANGE_ACCOUNT, CHANGE_CUSTOMER, CHANGE_TAB} from "../actions";

export default (state = {}, action) => {
    switch (action.type) {
        case CHANGE_TAB:
            return {
                ...state,
                currentTab: action.tab
            };
        case CHANGE_CUSTOMER:
            return {
                ...state,
                accountTab: {customerId: action.id, accountId: null}
            };
        case CHANGE_ACCOUNT:
            return {
                ...state,
                accountTab: {accountId: action.id, customerId: state.accountTab.customerId}
            };
        default:
            return state;
    }
}