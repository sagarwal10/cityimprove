import { combineReducers } from "redux";
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export const rootReducer=combineReducers({
  auth: authReducer,
  errors: errorReducer
}); 

export default rootReducer;

