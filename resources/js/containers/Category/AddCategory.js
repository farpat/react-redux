import {connect} from 'react-redux';
import {addCategory} from "../../actions";
import AddCategory from "../../components/Category/AddCategory";

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCategory: (label) => {
            dispatch(addCategory(label));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);