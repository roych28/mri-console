import { combineReducers } from 'redux';
import products from './products';
import doctors from './doctors';

export default combineReducers({
    products,
    doctors
});
