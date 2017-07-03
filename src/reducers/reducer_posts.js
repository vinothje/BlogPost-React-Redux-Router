import { FETCH_POST, CREATE_POST, SHOW_POST, DELETE_POST } from '../actions/index';
import _ from 'lodash';

export default  function(state={}, action) {
    switch(action.type) {
        case FETCH_POST :
            console.log('response :', action.payload.data);
            return _.mapKeys(action.payload.data, 'id');
        case CREATE_POST :
            return state;
        case SHOW_POST :
            return { ...state, [action.payload.data.id] : action.payload.data };
        case DELETE_POST:
            console.log('delete post');
            return _.omit(state, action.payload);
        default :
            return state;
    }
    return state;
}
