import React from 'react';
import Nav from '../containers/Nav';
import Account from '../containers/Account/Main';
import Category from './Category/Main';

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
        }
    }

    render() {
        return (
            <div>
                <Nav/>
                <div className="row">
                    <main className="mx-auto col-md-10 mt-2">
                        {
                            this.renderMain()
                        }
                    </main>
                </div>
            </div>
        );
    }
}

export default App;