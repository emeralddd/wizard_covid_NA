import { createContext,useReducer,useState } from "react"
import { PostReducer } from '../reducer/postReducer'
import { 
    apiURL,
    POST_LOADED_FAIL,
    POST_LOADED_SUCCESS,
    ADD_POST,
    DEL_POST,
    FIND_POST,
    UPDATE_POST
} from "../utils/VariableName"
import axios from "axios"

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
    const [postState,dispatch] = useReducer(PostReducer, {
        post: null,
        posts: [],
        postsLoading: true
    })

    const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)

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

    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiURL}/admin/createBlogPost`,newPost)
            if(response.data.success) {
                dispatch({
                    type: ADD_POST, payload:response.data.post
                })
                return response.data
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false, 
                message: error.message
            }
        }
    }

    const findPost = async postID => {
        const post = postState.posts.find(post => post._id === postID)
        dispatch({type: FIND_POST, payload: post})
    }

    const updatePost = async updatedPost => {
		try {
			const response = await axios.put(`${apiURL}/admin/updateBlogPost/${updatedPost._id}`,updatedPost)
			if (response.data.success) {
				dispatch({ type: UPDATE_POST, payload: response.data.post })
				return response.data
			}
		} catch (error) {
			if(error.response.data) {
                return error.response.data
            } else return {
                success: false, 
                message: error.message
            }
		}
	}

    const deletePost = async postID => {
        try {
			const response = await axios.delete(`${apiURL}/admin/deleteBlogPost/${postID}`)
			if (response.data.success)
				dispatch({ type: DEL_POST, payload: postID })
		} catch (error) {
			console.log(error)
		}
    }

    const PostContextData = {
        postState, 
        getPosts, 
        addPost, 
        deletePost,
        findPost,
        updatePost,
        showUpdatePostModal,
        setShowUpdatePostModal,
        setShowToast,
        showToast
    }

    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider
