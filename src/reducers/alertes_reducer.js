import _ from 'lodash';
import {

    CREATE_ALERT,
    DELETE_ALERT,
    UPDATE_ALERT,
} from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case CREATE_ALERT:
            return action.payload;
        case DELETE_ALERT:
            return action.payload;
        case UPDATE_ALERT:
            return action.payload;

    }

    return state;
}