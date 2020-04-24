import React from 'react';
import PropTypes from 'prop-types';
import {addLine} from "../../actions";
import {connect} from "react-redux";

class AddLine extends React.Component {
    constructor(props) {
        super(props);

        this.addLineForm = null;

        this.state = {
            errorOnEditing: false
        };
    }


    renderCategories() {
        let options = [];
        for (let id in this.props.categories) {
            options.push(
                <option key={id} value={id}>
                    {this.props.categories[id].label}
                </option>
            );
        }

        return options;
    }

    render() {
        const now = new Date();
        const nowInString = now.getDate() + '/' + ((now.getMonth() + 1) > 10 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)) + '/' + now.getFullYear();
        return (
            <form className="mt-5" ref={(form) => {
                this.addLineForm = form;
            }} onSubmit={(e) => {
                this.onSubmit(e)
            }}>
                <h2>Formulaire d'ajout d'opération</h2>
                <div className="row">
                    <div className="col-md-2 form-group">
                        <label>Date</label>
                        <input name="date" required className="form-control" defaultValue={nowInString}
                               onChange={(e) => {
                                   this.onChange(e, 'date');
                               }}/>
                        <div className="invalid-feedback"/>
                    </div>

                    <div className="col-md-2 form-group">
                        <label>Montant en euros</label>
                        <input name="amount" required className="form-control" onChange={(e) => {
                            this.onChange(e, 'number');
                        }}/>
                        <div className="invalid-feedback"/>
                    </div>

                    <div className="col-md-2 form-group">
                        <label>Libellé de l'opération</label>
                        <input name="label" required className="form-control"/>
                        <div className="invalid-feedback"/>
                    </div>

                    <div className="col-md-2 form-group">
                        <label>Type</label>
                        <select name="type" className="custom-select">
                            <option value="0">Débit</option>
                            <option value="1">Crédit</option>
                        </select>
                    </div>

                    <div className="col-md-2 form-group">
                        <label>Catégorie</label>
                        <select name="categoryId" className="custom-select">
                            {
                                this.renderCategories()
                            }
                        </select>
                    </div>

                    <div className="col-md-2 form-group">
                        <label>Commentaires</label>
                        <textarea name="comment" className="form-control" rows="1"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success btn-block">Ajouter</button>
            </form>
        );
    }

    onChange(e, type) {
        let target = e.target;
        let value = target.value;
        let hasError;

        switch (type) {
            case 'date':
                if (value.length === 0 || (value.length === 10 && value.match(/\d{2}\/\d{2}\/\d{4}/i))) {
                    target.classList.remove('is-invalid');
                    target.nextElementSibling.innerHTML = '';

                    hasError = target.parentElement.parentElement.querySelectorAll('.is-invalid').length;
                    this.setState({
                        errorOnEditing: !!hasError
                    });
                }
                else {
                    target.classList.add('is-invalid');
                    target.nextElementSibling.innerHTML = 'Problème de date !';

                    this.setState({
                        errorOnEditing: true,
                    });
                }
                break;

            case 'number':
                if (value.length === 0 || !isNaN(value)) {
                    target.classList.remove('is-invalid');
                    target.nextElementSibling.innerHTML = '';

                    hasError = target.parentElement.parentElement.querySelectorAll('.is-invalid').length;
                    this.setState({
                        errorOnEditing: !!hasError
                    });
                }
                else {
                    target.classList.add('is-invalid');
                    target.nextElementSibling.innerHTML = 'Problème de montant !';

                    this.setState({
                        errorOnEditing: true,
                    });
                }
                break;
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.errorOnEditing) {
            const elements = this.addLineForm.elements;
            const length = elements.length - 1;
            let line = {};

            for (let i = 0; i < length; i++) {
                const element = elements[i];
                line[element.name] = element.tagName === 'SELECT' ? parseInt(element.value) : element.value;
            }

            this.props.addLine(line, this.props.accountId, this.props.lastLineId);
            this.addLineForm.reset();
        }
    }
}

AddLine.propTypes = {
    lastLineId: PropTypes.number.isRequired,
    accountId: PropTypes.number.isRequired,
    categories: PropTypes.object.isRequired,

    addLine: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        lastLineId: state.defaultDatas.lastLineId,
        accountId: state.navigation.accountTab.accountId,
        categories: state.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addLine: (line, accountId, lastLineId) => {
            dispatch(addLine(line, accountId, lastLineId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLine);
