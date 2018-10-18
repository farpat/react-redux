import {connect} from 'react-redux';
import LinesTable from "../../components/Account/LinesTable";
import React from 'react';
import {editLine, removeLine} from "../../actions";

const mapStateToProps = (state) => {
    const accountId = state.navigation.accountTab.accountId;

    return {
        lines: state.lines,
        account: state.defaultDatas.accounts[accountId],
        categories: state.categories,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeLine: (id, accountId) => {
            dispatch(removeLine(id, accountId));
        },
        editLine: (id, line, accountId) => {
            dispatch(editLine(id, line, accountId));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LinesTable);