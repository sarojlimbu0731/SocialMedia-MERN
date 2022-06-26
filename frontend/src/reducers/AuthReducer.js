const authReducer = (
  state ={ authData: null, loading: false, error: false,uploading:true },
  action
) => {
    switch(action.type){
        case "AUTH_START":
            return {...state, loading: true, error: false}
        case 'AUTH_SUCCESS':
            localStorage.setItem("profile",JSON.stringify({...action.data}))
            return {...state, authData: action.data, loading: false, error: false}
        case 'AUTH_FAIL':
            return {...state, loading: false, error: true} 
        case "LOGOUT":
            localStorage.clear()
            return {...state, authData:null, loading:false, error: false}   
        case "UPDATE_START":
            return {...state,uploading: true, error: false }
        case "UPDATE_SUCCESS":
            localStorage.setItem("profile",JSON.stringify({...action.data}))
            return {...state, authData:action.data, uploading:false, error:false}
        case "UPDATE_FAIL":
            return {...state, error:true, uploading:false}
        default:
            return state
    }
};

export default authReducer;

