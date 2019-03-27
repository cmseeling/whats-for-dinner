import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../store/state';
import { Action } from 'redux';
import { HomePage } from './component';

const mapStateToProps = (state: AppState) => {
    return {}
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);