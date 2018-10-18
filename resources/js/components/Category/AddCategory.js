import React from 'react';
import PropTypes from 'prop-types';

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <form className="mt-5" ref={(form) => {
                this.addCategoryForm = form;
            }} onSubmit={(e) => {
                this.onSubmit(e)
            }}>
                <h2>Formulaire d'ajout de catégorie</h2>
                <div className="row align-items-center">
                    <div className="col-md-auto form-group">
                        <label>Libellé</label>
                        <input name="label" className="form-control" required/>
                    </div>

                    <div className="col-md-auto">
                        <button type="submit" className="btn btn-success">Ajouter</button>
                    </div>
                </div>
            </form>
        );
    }

    onSubmit(e) {
        e.preventDefault();

        const element = this.addCategoryForm.elements[0];
        this.props.addCategory(element.value);

        this.addCategoryForm.reset();
    }
}

AddCategory.propTypes = {
    addCategory: PropTypes.func.isRequired,
};

export default AddCategory;