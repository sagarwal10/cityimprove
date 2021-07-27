import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'; 

import {
  GET_ERRORS, 
  SET_CURRENT_USER,
  USER_LOADING 
} from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios.post("/users/add", userData)
       .then(res => history.push("/login"))
       .catch(err => dispatch({ type: GET_ERRORS,
				payload: err.response.data}))
}

// Login
export const loginUser = userData => dispatch => {
  axios.post("/users/login", userData, {timeout: 1000})
       .then(res => {
         // Save token to localStorage
	 const { token } = res.data;
	 localStorage.setItem("jwtToken", token);

	 // set token to auth header
	 setAuthToken(token);

         // Decode token to get user data and set current user
	 const decoded = jwt_decode(token);
	 dispatch(setCurrentUser(decoded));
       })
       .catch(err => dispatch({ type: GET_ERRORS,
			        payload: err.response.data }))
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
} 

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");

  // Remove auth header 
  setAuthToken(false);

  // Set current user to empty object 
  dispatch(setCurrentUser({}));
}

