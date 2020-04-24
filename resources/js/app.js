import {createStore} from 'redux';
import reducers from './reducers';
import {render} from 'react-dom';
import App from './components/App';
import React from 'react';
import {Provider} from 'react-redux';

let initialState = {
    defaultDatas: {
        customers: [{id: 1, name: 'Client 1'}, {id: 2, name: 'Client 2'}, {id: 3, name: 'Client 3'}],
        accounts: {
            1: {id: 1, label: 'Compte de Client 1'},
            2: {id: 2, label: 'Compte de Client 2'},
            3: {id: 3, label: 'Compte de Client 3'},
            4: {id: 4, label: 'Compte de Client 4'},
            5: {id: 5, label: 'Compte de Client 5'},
            6: {id: 6, label: 'Compte de Client 6'},
        },
        customerAccounts: {
            1: [1, 2],
            2: [3, 4],
            3: [5, 6],
        },
        lastLineId: 2,
    },
    categories: {1: {id: 1, label: 'Prélèvement automatique'}, 2: {id: 2, label: 'Achat professionnel'}},
    lines: {
        1: [{
            id: 1,
            label: 'Prélèvement du loyer',
            type: 0,
            categoryId: 1,
            date: '23/03/2018',
            comment: null,
            amount: 1200.00
        }],
        2: [{
            id: 2,
            label: 'Achat d\'un ordinateur',
            type: 0,
            categoryId: 2,
            date: '23/03/2018',
            comment: 'Achat d\'un MSI GE72 6QD Apache Pro',
            amount: 1200.00
        }]
    },
    navigation: {
        currentTab: 'account',

        accountTab: {
            customerId: 1,
            accountId: 2,
        },

        categoryTab: {}
    },
};

let store = createStore(reducers, initialState);
render(<Provider store={store}><App/></Provider>, document.getElementById('root'));