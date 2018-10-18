import React from 'react';
import CategoriesTable from '../../containers/Category/CategoriesTable';
import AddCategory from '../../containers/Category/AddCategory';


class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Gestion des catégories</h1>
                <div>
                    <CategoriesTable/>
                    <AddCategory/>
                </div>
            </div>
        );
    }
}

export default Main;