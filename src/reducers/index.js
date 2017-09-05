import { combineReducers } from 'redux';
import postsReducer from './posts_reducer';
import filesReducer from './files_reducer';
import alertesReducer from './alertes_reducer';

const rootReducer = combineReducers({
    post: postsReducer,
    file:filesReducer,
    alert:alertesReducer
});

export default rootReducer;