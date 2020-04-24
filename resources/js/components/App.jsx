import React from 'react';
import Nav from './Nav';
import Account from './Account/Main';
import Category from './Category/Main';
import {connect} from "react-redux";
import {hot} from "react-hot-loader/root";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    renderMain() {
        switch (this.props.navigation.currentTab) {
            case 'account':
                return <Account/>;
            case 'category':
                return <Category/>;
            default:
                return null;
        }
    }

    render() {
        return (
            <>
                <Nav/>
                <main className="container">
                    {
                        this.renderMain()
                    }
                </main>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(App));
