import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={ 
    formInfo:{
        firstName: "",
        lastName: "",
        email: "",
        password:""
    },
    error: null,  
}
const signupSlice=createSlice({
    name:'signup',
    initialState,
    reducers:{
        fetchDataSuccess: (state, action) => {
            state.formInfo.firstName = action.payload.firstName;
            state.formInfo.lastName = action.payload.lastName;
            state.formInfo.email = action.payload.email;
            state.formInfo.password = action.payload.password;
        },
        fetchDataError: (state, action) => {
            state.error = action.payload;
        }
    }
})
export const { fetchDataSuccess, fetchDataError } = signupSlice.actions;

export const postSignup=(formInfo)=>{
    return (dispatch) =>{
         axios
        .post("http://localhost:3001/api/v1/user/signup",formInfo)
        .then((res) => {
               dispatch(fetchDataSuccess(res.data))
        })
         .catch((error)=>{
            dispatch(fetchDataError(error))
         })
    }
}
export default signupSlice.reducer