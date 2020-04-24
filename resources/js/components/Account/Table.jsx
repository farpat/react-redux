import React from 'react';
import PropTypes from 'prop-types';
import {editLine, removeLine} from "../../actions";
import {connect} from "react-redux";

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.editingTr = null;

        this.state = {
            editingId:      0,
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

    renderLine(line) {
        if (this.state.editingId !== line.id) {
            return (
                <tr key={line.id}>
                    <td>{line.date}</td>
                    <td>
                        {
                            parseFloat(line.amount).toLocaleString('fr-FR', {
                                style:    "currency",
                                currency: "EUR"
                            })
                        }
                    </td>
                    <td>{line.label}</td>
                    <td>{line.type ? 'Crédit' : 'Débit'}</td>
                    <td>{this.props.categories[line.categoryId].label}</td>
                    <td>{line.comment ? line.comment : '---'}</td>
                    <td>
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary"
                                    onClick={() => {
                                        this.handleEdit(line.id);
                                    }}>
                                Editer
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => {
                                this.props.removeLine(line.id, this.props.account.id)
                            }}>×
                            </button>
                        </div>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr key={line.id} ref={tr => this.editingTr = tr}>
                    <td>
                        <input className="form-control" name="date" required
                               onKeyDown={(e) => this.onKeyDown(e, line.id)} onChange={(e) => {
                            this.onChange(e, 'date');
                        }} defaultValue={line.date}/>
                        <div className="invalid-feedback"/>
                    </td>
                    <td>
                        <input className="form-control" name="amount" required
                               onKeyDown={(e) => this.onKeyDown(e, line.id)} onChange={(e) => {
                            this.onChange(e, 'number')
                        }} defaultValue={line.amount}
                               placeholder="Montant en euros"/>
                        <div className="invalid-feedback"/>
                    </td>
                    <td>
                        <input className="form-control" name="label" required
                               onKeyDown={(e) => this.onKeyDown(e, line.id)} onChange={(e) => {
                            this.onChange(e, 'label')
                        }} defaultValue={line.label}/>
                        <div className="invalid-feedback"/>
                    </td>
                    <td>
                        <select name="type" className="custom-select" onKeyDown={(e) => this.onKeyDown(e, line.id)}
                                defaultValue={line.type}>
                            <option value="0">Débit</option>
                            <option value="1">Crédit</option>
                        </select>
                    </td>
                    <td>
                        <select name="categoryId" className="custom-select" onKeyDown={(e) => this.onKeyDown(e, line.id)} defaultValue={line.categoryId}>
                            {
                                this.renderCategories()
                            }
                        </select>
                    </td>
                    <td><textarea name="comment" className="form-control" rows="1" onKeyDown={(e) => {
                        this.onKeyDown(e, line.id)
                    }} defaultValue={line.comment}/></td>
                    <td>
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary"
                                    onClick={() => {
                                        this.handleConfirm(line.id);
                                    }}>
                                Confirmer
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => {
                                this.props.removeLine(line.id, this.props.account.id)
                            }}>×
                            </button>
                        </div>
                    </td>
                </tr>
            );
        }
    }

    renderTable() {
        const lines = this.props.lines;
        const accountId = this.props.account.id;

        if (lines[accountId] && lines[accountId].length > 0) {
            return (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Montant</th>
                        <th>Libellé de l'opération</th>
                        <th>Type</th>
                        <th>Catégorie</th>
                        <th>Commentaire</th>
                        <th>_</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        lines[accountId].map((line) => {
                            return this.renderLine(line);
                        })
                    }
                    </tbody>
                </table>
            );
        }

        return (
            <div>Pas d'opération :)</div>
        );
    }

    render() {
        return (
            <section className="mt-5">
                <h2>Liste des opérations effectuées sur le <strong>{this.props.account.label}</strong></h2>
                {
                    this.renderTable()
                }
            </section>
        );
    }

    handleEdit(id) {
        this.setState({
            editingId: id
        });
    }

    handleConfirm(id) {
        if (!this.state.errorOnEditing) {
            let line = {id};

            this.editingTr.querySelectorAll('input, textarea, select').forEach((element) => {
                line[element.name] = element.tagName === 'SELECT' ? parseInt(element.value) : element.value;
            });

            this.setState({
                editingId: 0
            });

            this.props.editLine(id, line, this.props.account.id);
        }
    }

    handleCancel() {
        this.setState({
            editingId: 0
        });
    }

    onChange(e, type) {
        let target = e.target;
        let value = target.value;
        let hasError;

        switch (type) {
            case 'date':
                if (value.length === 10 && value.match(/\d{2}\/\d{2}\/\d{4}/i)) {
                    target.classList.remove('is-invalid');
                    target.nextElementSibling.innerHTML = '';

                    hasError = target.parentElement.parentElement.querySelectorAll('.is-invalid').length;
                    this.setState({
                        errorOnEditing: !!hasError
                    });
                } else {
                    target.classList.add('is-invalid');
                    target.nextElementSibling.innerHTML = 'Problème de date !';
                    this.setState({
                        errorOnEditing: true,
                    });
                }
                break;

            case 'number':
                if (value.length > 0 && !isNaN(value)) {
                    target.classList.remove('is-invalid');
                    target.nextElementSibling.innerHTML = '';

                    hasError = target.parentElement.parentElement.querySelectorAll('.is-invalid').length;
                    this.setState({
                        errorOnEditing: !!hasError
                    });
                } else {
                    target.classList.add('is-invalid');
                    target.nextElementSibling.innerHTML = 'Problème de montant !';
                    this.setState({
                        errorOnEditing: true,
                    });
                }
                break;

            case 'label':
                if (value.length > 0) {
                    target.classList.remove('is-invalid');
                    target.nextElementSibling.innerHTML = '';

                    hasError = target.parentElement.parentElement.querySelectorAll('.is-invalid').length;
                    this.setState({
                        errorOnEditing: !!hasError
                    });
                } else {
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

}

Table.propTypes = {
    lines:      PropTypes.object.isRequired,
    account:    PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,

    removeLine: PropTypes.func.isRequired,
    editLine:   PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const accountId = state.navigation.accountTab.accountId;

    return {
        lines:      state.lines,
        account:    state.defaultDatas.accounts[accountId],
        categories: state.categories,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeLine: (id, accountId) => {
            dispatch(removeLine(id, accountId));
        },
        editLine:   (id, line, accountId) => {
            dispatch(editLine(id, line, accountId));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Table);
