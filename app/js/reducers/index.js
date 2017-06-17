import { combineReducers } from 'redux';
import snippets from './snippets.js';
import users from './users.js';

const rootReducer = combineReducers({
	snippets,
	users
});

export default rootReducer;
