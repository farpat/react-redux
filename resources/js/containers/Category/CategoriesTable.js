import {connect} from 'react-redux';
import CategoriesTable from "../../components/Category/CategoriesTable";
import {editCategory, removeCategory} from "../../actions";


const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeCategory: (id) => {
            dispatch(removeCategory(id));
        },
        editCategory: (id, label) => {
            dispatch(editCategory(id, label));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTable);