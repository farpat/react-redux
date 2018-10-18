//-- Gestion des opérations
export const ADD_LINE = 'ADD_LINE';
export const EDIT_LINE = 'EDIT_LINE';
export const REMOVE_LINE = 'REMOVE_LINE';

export const addLine = (line, accountId, lastLineId) => {
    return {type: ADD_LINE, line, accountId, lastLineId};
};

export const editLine = (id, line, accountId) => {
    return {type: EDIT_LINE, id, line, accountId};
};

export const removeLine = (id, accountId) => {
    return {type: REMOVE_LINE, id, accountId};
};

//-- Gestion des catégorie
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

export const addCategory = (label) => {
    return {type: ADD_CATEGORY, label};
};

export const editCategory = (id, label) => {
    return {type: EDIT_CATEGORY, id, label};
};

export const removeCategory = (id) => {
    return {type: REMOVE_CATEGORY, id};
};

//-- Gestion de la navigation
export const CHANGE_TAB = 'CHANGE_TAB';
export const CHANGE_CUSTOMER = 'CHANGE_CUSTOMER';
export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';

export const changeTab = (tab) => {
    return {type: CHANGE_TAB, tab};
};

export const changeCustomer = (id) => {
    return {type: CHANGE_CUSTOMER, id};
};

export const changeAccount = (id) => {
    return {type: CHANGE_ACCOUNT, id};
};
