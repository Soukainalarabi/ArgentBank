import { combineReducers } from "redux";
import loginReducer from "./login.reducer"
import signupReducer from "./signup.reducer";
import profileReducer from "./profile.reducer"
export default combineReducers({
    signupReducer,
    loginReducer,
    profileReducer,
})