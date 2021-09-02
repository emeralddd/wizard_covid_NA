import { POST_LOADED_FAIL, POST_LOADED_SUCCESS } from "../utils/VariableName"

export const PostReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case POST_LOADED_SUCCESS:
            return {
                ...state,
                posts: payload,
                postsLoading: false
            }
        
        case POST_LOADED_FAIL:
            return {
                ...state,
                posts: [],
                postsLoading: false
            }
        
        default: 
            return state
    }
}