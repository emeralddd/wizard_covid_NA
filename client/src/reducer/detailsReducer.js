import { DETAILS_LOADED_FAIL, DETAILS_LOADED_SUCCESS } from "../utils/VariableName"

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
        
        default: 
            return state
    }
}