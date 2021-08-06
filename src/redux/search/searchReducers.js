import {COMPANY_EMAIL_SEARCH, COMPANY_NAME_SEARCH, COMPANY_CIN_SEARCH} from "./searchTypes"

export const initialSearchState = {CIN: "", name: "", email: ""}
export const searchReducer = (state = initialSearchState, action) => {
    switch (action.type) {
        case COMPANY_EMAIL_SEARCH:
            return {...state, email: action.payload}
        case COMPANY_CIN_SEARCH:
            return {...state, CIN: action.payload}
        case COMPANY_NAME_SEARCH:
            return {...state, name: action.payload}
        default:
            return state
    }
}
