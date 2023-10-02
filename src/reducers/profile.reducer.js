import { PROFILE_ERROR, SET_PROFILE } from "../actions/profile";
const initialState = {
    firstName: "",
    lastName: "",
    email: ""
}
export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PROFILE:
            return {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email && state.email
            };
        case PROFILE_ERROR:
            return state;

        default:
            return state;
    }
}