import React from 'react';
import CategoriesTable from './CategoriesTable';
import AddCategory from './AddCategory';


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
