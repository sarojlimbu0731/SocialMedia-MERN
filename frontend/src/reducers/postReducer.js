const postReducer =(
    state= {posts:[],loading:false, error: false,uploading: false},
    action
)=>{
    switch (action.type) {
      case "UPLOAD_START":
        return { ...state, uploading: true, error: false };
      case "UPLOAD_SUCCESS":
        return {
          ...state,
          uploading: false,
          posts: [action.data, ...state.posts],
          error: false,
        };
      case "UPLOAD_FAIL":
        return { ...state, error: true, uploading: false };
      case "RETREIVE_START":
        return { ...state, loading: true, error: false };
      case "RETREIVE_SUCCESS":
        return {
          ...state,
          loading: false,
          error: false,
          posts: action.data
        };
      case "RETREIVE_FAIL":
        return { ...state, loading: false, error: true };
      default:
        return state;
    }
}

export default postReducer;

