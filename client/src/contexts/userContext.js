import { createContext,useReducer } from "react"
import { UserReducer } from '../reducer/userReducer'
import { apiURL,USER_LOADED_FAIL,USER_LOADED_SUCCESS } from "../utils/VariableName"
import axios from "axios"

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [userState,dispatch] = useReducer(UserReducer, {
        users: [],
        usersLoading: true
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

    const UserContextData = {userState, getUsers}

    return (
        <UserContext.Provider value={UserContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
