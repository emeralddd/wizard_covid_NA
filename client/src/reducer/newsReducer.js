import { NEWS_LOADED_FAIL, NEWS_LOADED_SUCCESS } from "../utils/VariableName"

export const NEWSReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case NEWS_LOADED_SUCCESS:
            return {
                ...state,
                news: payload,
                newsLoading: false
            }
        
        case NEWS_LOADED_FAIL:
            return {
                ...state,
                news: [],
                newsLoading: false
            }
        
        default: 
            return state
    }
}