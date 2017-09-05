import _ from 'lodash';
import {
    FETCH_POSTS,
    CREATE_DOC,
    DELETE_DOC,
    UPDATE_DOC,
   
} from '../actions/types';

export default function (state =null, action) {
    switch (action.type) {
       case CREATE_DOC:
            return action.payload;
        case DELETE_DOC:
            return action.payload;
        case UPDATE_DOC:
            return action.payload;
    
    }

    return state;
}