import { POST_SIGNUPS } from "../actions/signup";

const initialState={ 
     firstName: "",
     lastName: "",
     email: "",
     password:""
}
export default function signupReducer(state=initialState,action){
switch (action.type){
    case POST_SIGNUPS:
        return action.payload;
        default:
            return state;
}
}