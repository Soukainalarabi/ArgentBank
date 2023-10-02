import { LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/login";
import {LOGOUT_SUCCESS} from "../actions/logout"
const initialState = {
    token:  localStorage.getItem("token"),
}
export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                token: null
            };        
        case LOGIN_FAIL:
            return state;
        default:
            return state;
    }
}