import {connect} from 'react-redux';
import App from "../components/App";

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);