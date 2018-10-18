import {connect} from 'react-redux';
import {addLine} from "../../actions";
import AddLine from "../../components/Account/AddLine";

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