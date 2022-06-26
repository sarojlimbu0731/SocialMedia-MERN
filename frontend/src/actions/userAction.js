import * as UserApi from "../api/UserRequest"

export const updateUser = (id,formData) =>async(dispatch)=>{
    dispatch({type:"UPDATE_START"})
    try {
        const {data}= await UserApi.updateUser(id,formData)
        dispatch({type:"UPDATE_SUCCESS",data:data})
        
    } catch (error) {
        dispatch({type:"UPDATE_FAIL"})
        console.log(error)
    }
}