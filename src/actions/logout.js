export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const logout=()=>{
    return (dispatch) =>{         
                  localStorage.removeItem("token");
                  dispatch({type:LOGOUT_SUCCESS})
                      
    }
}
