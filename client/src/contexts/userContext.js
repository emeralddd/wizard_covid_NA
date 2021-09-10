import { createContext,useReducer,useState } from "react"
import { UserReducer } from '../reducer/userReducer'
import { apiURL,USER_LOADED_FAIL,USER_LOADED_SUCCESS, ADD_USER } from "../utils/VariableName"
import axios from "axios"

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [userState,dispatch] = useReducer(UserReducer, {
        users: [],
        usersLoading: true
    })

    const [showAddUserModal, setShowAddUserModal] = useState(false)
	
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

    const getUsers = async() => {
        try {
            const response = await axios.get(`${apiURL}/admin/displayAccountList`)
            if(response.data.success) {
                dispatch({type: USER_LOADED_SUCCESS, payload: response.data.listAccount })
            }
        } catch (error) {
            dispatch({type: USER_LOADED_FAIL})
        }
    }

    const addUser = async(newUser) => {
        try {
            const response = await axios.post(`${apiURL}/admin/createNewAccount`,newUser)

            if(response.data.success) {
                dispatch({
                    type: ADD_USER,
                    payload: response.data.user
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

    const UserContextData = {
        userState, 
        getUsers,
        addUser,
        showAddUserModal,
        setShowAddUserModal,
        showToast,
        setShowToast
    }

    return (
        <UserContext.Provider value={UserContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
