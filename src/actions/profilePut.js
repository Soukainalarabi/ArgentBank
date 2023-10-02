import axios from "axios";
export const SET_PROFILE="SET_PROFILE";
export const putProfile=(name,token)=>{
    return (dispatch) =>{
        return  axios.put("http://localhost:3001/api/v1/user/profile",name,
        {headers: { 'Authorization': `Bearer ${token}`}})
            .then((res) => {
                console.log(res)
               dispatch({type:SET_PROFILE,payload:name})
               return Promise.resolve(res);

            }).catch((error)=>Promise.reject(error))
         
    }
}