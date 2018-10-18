import React from 'react';
import PropTypes from 'prop-types';

class CategoriesTable extends React.Component {
    constructor(props) {
        super(props);

        this.editingTr = null;

        this.state = {
            editingId: 0,
            errorOnEditing: false
        };
    }

    handleEdit(id) {
        this.setState({
            editingId: id
        });
    }

    handleConfirm(id) {
        if (!this.state.errorOnEditing) {
            this.setState({
                editingId: 0
            });

            this.props.editCategory(id, this.editingTr.querySelector('input').value);
        }
    }


    onChange(e, type) {
        let target = e.target;
        let value = target.value;
        let hasError;

        switch (type) {
            case 'label':
                if (value.length > 0) {
                    target.classList.remove('is-invalid');
                    target.nextElementSibling.innerHTML = '';

                    hasError = target.parentElement.parentElement.querySelectorAll('.is-invalid').length;
                    this.setState({
                        errorOnEditing: !!hasError
                    });
                }
                else {
                    target.classList.add('is-invalid');
                    target.nextElementSibling.innerHTML = 'Problème de libellé !';
                    this.setState({
                        errorOnEditing: true,
                    });
                }
        }
    }

    onKeyDown(e, id) {
        switch (e.key) {
            case 'Enter':
                return this.handleConfirm(id);
            case 'Escape':
                return this.handleCancel(id);
        }


    }

    renderCategory(category) {
        if (this.state.editingId !== category.id) {
            return (
                <tr key={category.id}>
                    <td>{category.label}</td>
                    <td>
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary"
                                    onClick={() => {
                                        this.handleEdit(category.id);
                                    }}>
                                Editer
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => {
                                this.props.removeCategory(category.id)
                            }}>×
                            </button>
                        </div>
                    </td>
                </tr>
            );
        }
        else {
            return (
                <tr key={category.id} ref={tr => {
                    this.editingTr = tr;
                }}>
                    <td>
                        <input className="form-control" name="label" required onKeyDown={(e) => {
                            this.onKeyDown(e, category.id);
                        }} onChange={(e) => {
                            this.onChange(e, 'label');
                        }} defaultValue={category.label}/>
                        <div className="invalid-feedback"/>
                    </td>
                    <th>
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary"
                                    onClick={() => {
                                        this.handleConfirm(category.id);
                                    }}>
                                Confirmer
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => {
                                // this.props.removeCategory(category.id)
                            }}>×
                            </button>
                        </div>
                    </th>
                </tr>
            );
        }

    }

    render() {
        const idCategories = Object.keys(this.props.categories);

        return (
            <section className="mt-5">
                <h2>Liste des catégories</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Libellé</th>
                        <th>_</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        idCategories.map((idCategory) => {
                            return this.renderCategory(this.props.categories[idCategory]);
                        })
                    }
                    </tbody>
                </table>
            </section>
        );
    }
}

CategoriesTable.propTypes = {
    categories: PropTypes.object.isRequired,

    removeCategory: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
};


export default CategoriesTable;