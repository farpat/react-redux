import React from 'react';
import PropTypes from 'prop-types';

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(e, tab) {
        e.preventDefault();
        this.props.changeTab(tab);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={"nav-item " + (this.props.currentTab === 'account' ? 'active' : '')}>
                            <a className="nav-link" href="#" onClick={(e) => this.onClick(e, 'account')}>Gestion des
                                comptes</a>
                        </li>
                        <li className={"nav-item " + (this.props.currentTab === 'category' ? 'active' : '')}>
                            <a className="nav-link" href="#" onClick={(e) => this.onClick(e, 'category')}> Gestion des
                                catégories</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Nav.propTypes = {
    currentTab: PropTypes.string.isRequired,

    changeTab: PropTypes.func.isRequired
};


export default Nav;