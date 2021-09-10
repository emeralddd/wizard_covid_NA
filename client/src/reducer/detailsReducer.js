import { 
    DETAILS_LOADED_FAIL, 
    DETAILS_LOADED_SUCCESS,
    ADD_DETAIL,
    DEL_DETAIL,
    FIND_DETAIL,
    UPDATE_DETAIL 
} from "../utils/VariableName"

export const DetailsReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case DETAILS_LOADED_SUCCESS:
            return {
                ...state,
                details: payload,
                detailsLoading: false
            }
        
        case DETAILS_LOADED_FAIL:
            return {
                ...state,
                details: [],
                detailsLoading: false
            }

        case ADD_DETAIL:
            return {
                ...state,
                details: [...state.details,payload]
            }

        case DEL_DETAIL:
            return {
                ...state,
                details: state.details.filter(detail => detail._id !== payload)
            }
            
        case FIND_DETAIL: 
            return {
                ...state,
                detail:payload
            }
            
        case UPDATE_DETAIL:
            const newDetails = state.details.map(detail =>
                detail._id === payload._id ? payload : detail
            )
    
            return {
                ...state,
                details: newDetails
            }
        
        default: 
            return state
    }
}