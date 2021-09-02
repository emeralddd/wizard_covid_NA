import { createContext,useReducer } from "react"
import { PostReducer } from '../reducer/postReducer'
import { apiURL,POST_LOADED_FAIL,POST_LOADED_SUCCESS } from "../utils/VariableName"
import axios from "axios"

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
    const [postState,dispatch] = useReducer(PostReducer, {
        posts: [],
        postsLoading: true
    })

    const getPosts = async() => {
        try {
            const response = await axios.get(`${apiURL}/public/displayBlogPost`)
            if(response.data.success) {
                dispatch({
                    type: POST_LOADED_SUCCESS, 
                    payload: response.data.listPost
                })
            }
        } catch (error) {
            dispatch({type: POST_LOADED_FAIL})
        }
    }

    const PostContextData = {postState, getPosts}

    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider
