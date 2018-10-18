import {connect} from 'react-redux';
import Nav from "../components/Nav";
import {changeTab} from "../actions";

const mapStateToProps = (state) => {
    return {
        currentTab: state.navigation.currentTab
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeTab: (tab) => {
            dispatch(changeTab(tab))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);