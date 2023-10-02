import axios from "axios";
export const POST_SIGNUPS="POST_SIGNUPS";
export const postSignup=(formInfo)=>{
    return (dispatch) =>{
        return  axios.post("http://localhost:3001/api/v1/user/signup",formInfo)
            .then((res) => {
                console.log(res)
               dispatch({type:POST_SIGNUPS,payload:formInfo})
               return Promise.resolve(res)
            }
        
               )
         .catch((error)=>{Promise.reject(error)})
    }
}