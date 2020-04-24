export default (state = {}, action) => {
    switch (action.type) {
        case "ADD_LINE":
            const lastLineId = state.lastLineId + 1;
            return {
                ...state,
                lastLineId
            };
        default:
            return state;
    }
};