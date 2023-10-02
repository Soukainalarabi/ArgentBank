import axios from "axios";
export const SET_PROFILE = "SET_PROFILE";
export const PROFILE_ERROR = 'PROFILE_ERROR'
export const profile = (token) => {
    return (dispatch) => {
        return axios.post("http://localhost:3001/api/v1/user/profile", {}, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
            .then((res) => {
                dispatch({ type: SET_PROFILE, payload: res.data.body })
                return Promise.resolve(res)
            }
            )
            .catch((error) => {
                dispatch({ type: PROFILE_ERROR })
                return Promise.reject(error)
            })


    }
}
