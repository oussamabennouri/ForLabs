import _ from 'lodash';
import {
  
    CREATE_FILE,
    DELETE_FILE,
    UPDATE_FILE,
} from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case CREATE_FILE:
            return action.payload;
        case DELETE_FILE:
            return action.payload;
        case UPDATE_FILE:
            return action.payload;

    }

    return state;
}