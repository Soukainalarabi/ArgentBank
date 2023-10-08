import { createSlice } from "@reduxjs/toolkit";
const initialState={
    token:localStorage.getItem("token"),
    error: null,

}
const logoutSlice= createSlice({
    name:'logout',
    initialState,
    reducers:{
        logoutDone:(state,action)=>{
            state.token = action.payload;
            localStorage.removeItem("token");

        },
        logoutError:(state,action)=>{
            state.error = action.payload;
        }
    }
})
export const {logoutDone,logoutError}=logoutSlice.actions
export default logoutSlice.reducer;
// export const logout = () => {
//     return (dispatch) => {
//       localStorage.removeItem("token");
//         dispatch(logoutDone());
//     };
//   };