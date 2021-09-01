export const UserReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case 'USER_LOADED_SUCCESS':
            return {
                ...state,
                users: payload,
                usersLoading: false
            }
        
        case 'USER_LOADED_FAIL':
            return {
                ...state,
                users: [],
                usersLoading: false
            }
        
        default: 
            return state
    }
}