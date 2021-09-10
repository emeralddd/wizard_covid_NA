import { USER_LOADED_FAIL,USER_LOADED_SUCCESS,ADD_USER } from "../utils/VariableName"

export const UserReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                users: payload,
                usersLoading: false
            }
        
        case USER_LOADED_FAIL:
            return {
                ...state,
                users: [],
                usersLoading: false
            }

        case ADD_USER:
            return {
                ...state,
                users: [...state.users,payload]
            }
        
        default: 
            return state
    }
}