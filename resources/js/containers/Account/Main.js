import {connect} from 'react-redux';
import Main from "../../components/Account/Main";
import {changeAccount, changeCustomer} from "../../actions";

const mapStateToProps = (state) => {
    return {
        customers: state.defaultDatas.customers,
        accounts: state.defaultDatas.accounts,
        customerAccounts: state.defaultDatas.customerAccounts,
        accountTab: state.navigation.accountTab,
        lines: state.lines
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCustomer: (id) => {
            dispatch(changeCustomer(id))
        },
        changeAccount: (id) => {
            dispatch(changeAccount(id))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);