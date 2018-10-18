import React from 'react';
import PropTypes from 'prop-types';
import LinesTable from "../../containers/Account/LinesTable";
import AddLine from "../../containers/Account/AddLine";

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCustomerList() {
        return (
            <div className="col-md-6">
                <h2>Liste des clients</h2>
                <ul className="list-group">
                    {
                        this.props.customers.map((customer) => {
                            const className = 'list-group-item' + (customer.id === this.props.accountTab.customerId ? ' active' : '');

                            return (
                                <li className={className} style={{cursor: 'pointer'}} key={customer.id}
                                    onClick={() => {
                                        this.props.changeCustomer(customer.id)
                                    }}>
                                    {customer.name}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }

    renderAccountList() {
        let customerId = this.props.accountTab.customerId;

        if (customerId) {
            const accountsId = this.props.customerAccounts[customerId];

            return (
                <div className="col-md-6">
                    <h2>Liste des comptes</h2>
                    <ul className="list-group">
                        {
                            accountsId.map((accountId) => {
                                const className = 'list-group-item' + (this.props.accountTab.accountId === accountId ? ' active' : '');
                                const account = this.props.accounts[accountId];

                                return (
                                    <li className={className} style={{cursor: 'pointer'}} key={account.id}
                                        onClick={() => {
                                            this.props.changeAccount(accountId)
                                        }}>
                                        {account.label}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            );
        }

        return null;
    }

    renderManagement() {
        if (this.props.accountTab.accountId) {
            return (
                <section className="mb-5">
                    <LinesTable/>
                    <AddLine/>
                </section>);
        }
    }

    render() {
        return (
            <div>
                <h1>Gestion du compte</h1>
                <section className="row mt-5">
                    {
                        this.renderCustomerList()
                    }
                    {
                        this.renderAccountList()
                    }
                </section>
                {
                    this.renderManagement()
                }
            </div>
        );
    }
}

Main.propTypes = {
    customers: PropTypes.array.isRequired,
    accounts: PropTypes.object.isRequired,
    customerAccounts: PropTypes.object.isRequired,
    lines: PropTypes.object.isRequired,
    accountTab: PropTypes.object.isRequired,


    changeCustomer: PropTypes.func.isRequired,
    changeAccount: PropTypes.func.isRequired,
};

export default Main;