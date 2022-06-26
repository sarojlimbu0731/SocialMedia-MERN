import * as PostApi from '../api/PostRequest';

export const getTimelinePost= (id)=> async(dispatch)=>{
    dispatch({type:"RETREIVE_START"})
    try {
        const {data}= await PostApi.getTimelinePost(id)
        dispatch({type:"RETREIVE_SUCCESS",data:data})
    } catch (error) {
        dispatch({type:"RETREIVE_FAIL"})
        console.log(error)
        
    }
}