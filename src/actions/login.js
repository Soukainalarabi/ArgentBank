import axios from "axios";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const postLogin=(connetedUser)=>{
    return (dispatch) =>{
        return  axios
        .post("http://localhost:3001/api/v1/user/login", connetedUser)
            .then((res) => {
                const token = res.data.body.token;
                if (token) {
                  localStorage.setItem("token", token);
                  dispatch({type:LOGIN_SUCCESS,payload:token})
                  return Promise.resolve(res);
                }               
              })
                .catch((error) => {
                    console.log(error?.message);
                    dispatch({type:LOGIN_FAIL});
                    return Promise.reject(error);
                  })
         
    }
}
